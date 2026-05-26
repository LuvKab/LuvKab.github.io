import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const postsRoot = path.join(root, 'content/posts')
const assetsRoot = path.join(root, 'public/blog-assets')

async function exists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function copyFileTree(sourceDir, targetDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })
  await fs.mkdir(targetDir, { recursive: true })

  for (const entry of entries) {
    const source = path.join(sourceDir, entry.name)
    const target = path.join(targetDir, entry.name)

    if (entry.isDirectory()) {
      await copyFileTree(source, target)
      continue
    }

    if (entry.name.endsWith('.md')) {
      continue
    }

    await fs.copyFile(source, target)
  }
}

async function main() {
  await fs.rm(assetsRoot, { recursive: true, force: true })
  await fs.mkdir(assetsRoot, { recursive: true })

  if (!(await exists(postsRoot))) {
    return
  }

  const entries = await fs.readdir(postsRoot, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const sourceDir = path.join(postsRoot, entry.name)
    const indexPath = path.join(sourceDir, 'index.md')
    if (await exists(indexPath)) {
      await copyFileTree(sourceDir, path.join(assetsRoot, entry.name))
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
