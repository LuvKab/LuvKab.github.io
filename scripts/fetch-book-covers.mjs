import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const manifestPath = path.join(__dirname, 'book-covers.json')
const outputDir = path.join(root, 'public', 'images', 'books')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

await mkdir(outputDir, { recursive: true })

for (const book of manifest) {
  const filePath = path.join(outputDir, `${book.slug}.jpg`)

  if (existsSync(filePath)) {
    console.log(`skip ${book.slug}`)
    continue
  }

  const keyType = book.openLibraryIsbn ? 'isbn' : 'id'
  const key = book.openLibraryIsbn ?? book.openLibraryCoverId
  const url = `https://covers.openlibrary.org/b/${keyType}/${key}-L.jpg?default=false`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${book.title}: ${response.status} ${response.statusText}`)
  }

  const bytes = Buffer.from(await response.arrayBuffer())

  if (bytes.length < 2048) {
    throw new Error(`Cover for ${book.title} looks too small`)
  }

  await writeFile(filePath, bytes)
  console.log(`saved ${book.slug}`)
}
