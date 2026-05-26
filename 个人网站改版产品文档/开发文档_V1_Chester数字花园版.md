# xyras.one 个人网站改版开发文档 V1

版本: V1.0
日期: 2026-05-26
目标: 基于 Chester 风格做个人数字花园首页
参考源码: https://github.com/chesterhow/portfolio

## 1. 开发结论

推荐用现代前端重写，不直接使用 `chesterhow/portfolio` 的旧技术栈。

推荐技术栈:

```text
Next.js App Router + TypeScript + Tailwind CSS
```

原因:

- 你已有 Next.js / Tailwind 项目经验。
- SEO、metadata、静态部署更稳。
- 后续可以自然扩展项目详情页、Writing、Notes。
- 首版仍然可以保持纯前端静态，不引入后端。

如果现有 xyras.one 仓库不是 Next.js，也可以把本文的组件、数据和 CSS tokens 迁移到 Vite / Astro / 静态 HTML。

## 2. 技术范围

### 2.1 首版实现

- 单页首页。
- 静态数据。
- 静态图片。
- 简历 PDF 下载。
- 邮箱 mailto。
- 基础 SEO。
- 响应式布局。

### 2.2 不实现

- CMS。
- 数据库。
- 登录。
- 表单提交后端。
- 评论。
- 复杂博客系统。
- 动态 API。

## 3. 推荐目录结构

以 Next.js App Router 为例:

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    garden/
      GardenHeader.tsx
      IntroSection.tsx
      GardenGrid.tsx
      GardenCard.tsx
      AboutSection.tsx
      ContactSection.tsx
      GardenFooter.tsx
  data/
    profile.ts
  lib/
    cn.ts
public/
  resume.pdf
  og.png
  images/
    awta-home.jpg
    awta-product.jpg
    obsidian-workbench.jpg
```

如果现有项目没有 `src/`，也可以:

```text
app/
components/
data/
public/
```

按现有项目习惯走。

## 4. 数据模型

所有首页内容先放在 `src/data/profile.ts`。

```ts
export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
  { label: 'Systems', href: '#systems' },
  { label: 'Reading', href: '#reading' },
  { label: 'About', href: '#about' },
]

export const externalLinks = [
  { label: 'GitHub', href: 'https://github.com/LuvKab' },
  { label: 'Email', href: 'mailto:xyras_sun@163.com' },
  { label: 'CV', href: '/resume.pdf' },
]

export type GardenCard = {
  id: string
  type: 'Projects' | 'Systems' | 'Writing' | 'Reading' | 'Tools' | 'Work'
  category: string
  title: string
  desc: string
  meta: string[]
  href?: string
  image?: string
  size: 'large' | 'medium' | 'small'
  featured?: boolean
}

export const cards: GardenCard[] = [
  {
    id: 'awta-b2b-site',
    type: 'Projects',
    category: 'Export Website',
    title: 'AWTA B2B Multilingual Website',
    desc: 'A 10-language B2B website for an LED lighting manufacturer, with CMS, inquiry flow, SEO foundations, and multilingual content.',
    meta: ['4 days', '10 languages', '170+ URLs', 'CMS / SEO / Inquiry'],
    href: 'https://awtaled.com',
    image: '/images/awta-home.jpg',
    size: 'large',
    featured: true,
  },
  {
    id: 'export-sales-os',
    type: 'Systems',
    category: 'CRM / SOP',
    title: 'Export Sales OS',
    desc: 'A personal operating system for export sales: lead pool, customer records, market strategy, scripts, CRM handoff, and review rhythm.',
    meta: ['6 market zones', '12 templates', 'follow-up rhythm'],
    size: 'medium',
  },
  {
    id: 'ai-content-pipeline',
    type: 'Systems',
    category: 'AI Workflow',
    title: 'AI Content Pipeline',
    desc: 'An AI-assisted workflow for turning English SEO content into multilingual drafts with protected links, image paths, and human review.',
    meta: ['9-language drafts', '3 SEO articles'],
    size: 'medium',
  },
  {
    id: 'hundsun-ta-testing',
    type: 'Work',
    category: 'Enterprise Systems',
    title: 'Hundsun TA Testing',
    desc: 'Testing and delivery work for securities and fund core systems, covering requirements, defects, regression, data validation, and delivery coordination.',
    meta: ['2021-2024', 'test lead'],
    size: 'small',
  },
]
```

## 5. 样式 token

建议先在 `globals.css` 定义 CSS variables。即使用 Tailwind，也保留变量，方便统一风格。

```css
:root {
  --bg: #f7f3ea;
  --paper: #fffdf7;
  --text: #1f1f1d;
  --muted: #6f6a60;
  --border: #e2d8c7;
  --tag: #f2ebdd;
  --accent: #4f7c64;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

Tailwind 任意值写法:

```tsx
className="bg-[#F7F3EA] text-[#1F1F1D]"
```

如果项目支持 Tailwind theme，可把颜色挂到 theme。

## 6. 页面实现

### 6.1 app/page.tsx

```tsx
import { AboutSection } from '@/components/garden/AboutSection'
import { ContactSection } from '@/components/garden/ContactSection'
import { GardenFooter } from '@/components/garden/GardenFooter'
import { GardenGrid } from '@/components/garden/GardenGrid'
import { GardenHeader } from '@/components/garden/GardenHeader'
import { IntroSection } from '@/components/garden/IntroSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#1F1F1D]">
      <GardenHeader />
      <IntroSection />
      <GardenGrid />
      <AboutSection />
      <ContactSection />
      <GardenFooter />
    </main>
  )
}
```

### 6.2 GardenHeader.tsx

```tsx
import { externalLinks, navLinks } from '@/data/profile'

export function GardenHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8">
      <a href="/" className="font-serif text-2xl font-semibold tracking-normal">
        Xyras
      </a>

      <nav className="hidden items-center gap-6 text-sm text-[#6F6A60] md:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-[#1F1F1D]">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3 text-sm">
        {externalLinks.slice(1, 3).map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full border border-[#D8CFBF] bg-[#FFFDF7] px-3 py-1.5 text-[#4E473D] hover:border-[#1F1F1D]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}
```

### 6.3 IntroSection.tsx

```tsx
import { externalLinks } from '@/data/profile'

export function IntroSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-6 md:pb-16 md:pt-12">
      <div className="max-w-3xl">
        <h1 className="font-serif text-5xl font-semibold leading-tight tracking-normal md:text-7xl">
          Hey, I&apos;m Xyras.
        </h1>

        <div className="mt-8 space-y-5 text-xl leading-9 text-[#3F3B34] md:text-2xl md:leading-10">
          <p>
            Welcome to my digital garden. I build useful systems around software,
            B2B export, AI workflows, and personal knowledge management.
          </p>
          <p>
            Recently, I&apos;ve been exploring how small manufacturing teams can use
            multilingual websites, product data, CRM workflows, and automation to
            build better overseas growth engines.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#D8CFBF] bg-[#FFFDF7] px-4 py-2 text-[#4E473D] hover:border-[#1F1F1D]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 6.4 GardenGrid.tsx

CSS columns 是最简单的 masonry 方案。优点是轻，缺点是卡片顺序按列流动，不适合复杂排序。首版够用。

```tsx
import { cards } from '@/data/profile'
import { GardenCard } from './GardenCard'

export function GardenGrid() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {cards.map((card) => (
          <GardenCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}
```

### 6.5 GardenCard.tsx

```tsx
import type { GardenCard as GardenCardType } from '@/data/profile'

export function GardenCard({ card }: { card: GardenCardType }) {
  const sizeClass =
    card.size === 'large'
      ? 'min-h-[360px]'
      : card.size === 'medium'
        ? 'min-h-[280px]'
        : 'min-h-[220px]'

  const content = (
    <>
      {card.image ? (
        <div className="-mx-5 -mt-5 mb-5 overflow-hidden rounded-t-md border-b border-[#E2D8C7]">
          <img src={card.image} alt="" className="h-48 w-full object-cover" />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4 border-b border-[#E7DFD1] pb-3 text-xs uppercase tracking-normal text-[#7A7164]">
        <span>{card.type}</span>
        <span>{card.category}</span>
      </div>

      <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-normal text-[#1F1F1D]">
        {card.title}
      </h2>

      <p className="mt-4 text-base leading-7 text-[#4E473D]">{card.desc}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {card.meta.map((item) => (
          <span key={item} className="rounded-full bg-[#F2EBDD] px-3 py-1 text-xs text-[#5E5548]">
            {item}
          </span>
        ))}
      </div>
    </>
  )

  return (
    <article className={`mb-5 break-inside-avoid rounded-md border border-[#E2D8C7] bg-[#FFFDF7] p-5 transition hover:-translate-y-0.5 hover:border-[#BDAE98] ${sizeClass}`}>
      {card.href ? (
        <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block h-full">
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  )
}
```

### 6.6 AboutSection.tsx

```tsx
export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl border-t border-[#E2D8C7] px-5 py-16">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <h2 className="font-serif text-3xl font-semibold">About</h2>
        <div className="space-y-5 text-lg leading-8 text-[#3F3B34]">
          <p>
            I started in enterprise financial technology systems, where I learned how to work with requirements,
            data accuracy, defects, delivery risks, and cross-role collaboration.
          </p>
          <p>
            Later, I moved into B2B export and manufacturing scenarios in Zhongshan,
            building practical systems around websites, product data, inquiry workflows,
            CRM, sales SOP, and AI-assisted operations.
          </p>
          <p>
            This mix makes me useful where pure sales, pure operations, and pure engineering are not enough.
          </p>
        </div>
      </div>
    </section>
  )
}
```

### 6.7 ContactSection.tsx

```tsx
export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="rounded-md border border-[#E2D8C7] bg-[#FFFDF7] p-6 md:p-8">
        <p className="text-sm uppercase text-[#7A7164]">Contact</p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight">
          Open to export growth roles, independent-site operations,
          AI workflow projects, and B2B digitalization work.
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="mailto:xyras_sun@163.com" className="rounded-full border border-[#D8CFBF] px-4 py-2 text-sm hover:border-[#1F1F1D]">
            Email
          </a>
          <a href="/resume.pdf" className="rounded-full border border-[#D8CFBF] px-4 py-2 text-sm hover:border-[#1F1F1D]">
            CV
          </a>
          <a href="https://github.com/LuvKab" className="rounded-full border border-[#D8CFBF] px-4 py-2 text-sm hover:border-[#1F1F1D]">
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
```

### 6.8 GardenFooter.tsx

```tsx
export function GardenFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl items-center justify-between border-t border-[#E2D8C7] px-5 py-8 text-sm text-[#7A7164]">
      <p>Planted by Xyras</p>
      <p>Zhongshan, China</p>
    </footer>
  )
}
```

## 7. Metadata

### 7.1 app/layout.tsx

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xyras Sun - Builder around software, B2B export, and AI workflows',
  description:
    'Personal digital garden of Xyras Sun, a Zhongshan-based builder working around software, B2B export, AI workflows, multilingual websites, CRM systems, and product data.',
  openGraph: {
    title: 'Xyras Sun',
    description:
      'Personal digital garden around software, B2B export, AI workflows, and useful systems.',
    url: 'https://xyras.one',
    siteName: 'Xyras Sun',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xyras Sun',
    description:
      'Personal digital garden around software, B2B export, AI workflows, and useful systems.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## 8. 资源准备

### 8.1 必须文件

```text
public/resume.pdf
public/og.png
```

### 8.2 推荐截图

```text
public/images/awta-home.jpg
public/images/awta-product.jpg
public/images/awta-inquiry.jpg
public/images/obsidian-workbench.jpg
```

没有截图时，先不填 `image` 字段，不要用假图。

## 9. 实施步骤

### Step 1 - 找到项目

```bash
find /Users/xyras -maxdepth 4 -iname 'package.json' 2>/dev/null | rg 'xyras|portfolio|site|web|personal'
```

如果找不到，就新建:

```bash
npx create-next-app@latest xyras-one --ts --tailwind --eslint --app
```

### Step 2 - 建分支或备份

如果是 git 项目:

```bash
git status -sb
git checkout -b redesign/garden-home
```

如果不是 git 项目，先复制当前首页文件。

### Step 3 - 加数据文件

新增:

```text
src/data/profile.ts
```

填入本文第 4 节数据模型。

### Step 4 - 加组件

新增:

```text
src/components/garden/*.tsx
```

按第 6 节拆分。

### Step 5 - 替换首页

更新:

```text
src/app/page.tsx
```

只渲染 Garden 首页。

### Step 6 - 加简历和 OG

复制:

```text
/Users/xyras/Desktop/中山区域简历样稿/孙翔宇-中山区域-外贸数字化海外增长简历样稿.pdf
```

到:

```text
public/resume.pdf
```

OG 图可以先用简洁文字图，后续再做。

### Step 7 - 本地验证

```bash
npm run lint
npm run build
npm run dev
```

打开:

```text
http://localhost:3000
```

### Step 8 - 浏览器检查

必须检查:

- 1440px 桌面。
- 1024px 平板。
- 390px 手机。
- 简历链接。
- 邮箱链接。
- 外链打开。
- 无控制台错误。

## 10. 响应式规则

### 桌面

- 页面最大宽度 1120px。
- Header 横向导航。
- masonry 3 列。
- Intro 最大宽度 768px。

### 平板

- masonry 2 列。
- Header 可以保留简化导航。

### 手机

- masonry 1 列。
- Header 隐藏中间 nav。
- Intro 标题不超过 4 行。
- 外链按钮换行。
- 卡片内长词必须换行。

## 11. 质量检查

### 11.1 代码

- TypeScript 无错误。
- ESLint 无阻塞错误。
- 无未使用变量。
- 数据与组件分离。
- 不把长文案散落在组件里，除 Intro/About 可例外。

### 11.2 UI

- 无文字溢出。
- 无卡片重叠。
- hover 不造成布局跳动。
- 图片缺失不破坏布局。
- 所有卡片在手机端可读。

### 11.3 内容

- 不出现假团队、假客户、假成交额。
- AWTA 卡片权重最大。
- Writing / Reading / Tools 不超过总卡片 40%。
- 联系方式可用。

## 12. 部署建议

### Vercel

适合 Next.js:

```bash
vercel
vercel --prod
```

### 静态导出

如果只做静态站:

```js
// next.config.ts
const nextConfig = {
  output: 'export',
}

export default nextConfig
```

再部署 `out/`。

### 现有 VPS / Caddy

如果部署到 VPS，可用静态构建产物，由 Caddy 托管。

## 13. 从 Chester 源码借鉴的点

`chesterhow/portfolio` 的结构是:

```text
index.html
index.js
stylesheets/
assets/
static/
```

它的首页逻辑是:

```text
intro
projects
experiences
contact
```

本项目借鉴:

- intro 的个人化语气。
- projects 的作品优先。
- contact 的轻量收尾。
- 浅色个人站气质。

本项目替换:

- 用 Next.js 组件化。
- 用静态数据驱动卡片。
- 用 masonry grid 展示更多类型内容。
- 加入 B2B export / AI workflow / CRM / product data 方向。

## 14. 风险与处理

### 风险 1 - 太像生活博客

处理:

- AWTA 放最大卡。
- Projects 和 Systems 至少占 60%。
- Reading 和 Tools 只做辅助。

### 风险 2 - 太像服务商官网

处理:

- 全站主语使用 I。
- 不写服务套餐。
- 不写 our clients。
- 不写 testimonials。

### 风险 3 - 页面太空

处理:

- 首版至少 8 张卡。
- 其中 4 张职业相关，2 张写作，1 张工具，1 张阅读。

### 风险 4 - 没有图片不好看

处理:

- 先用纯文字卡片和版式撑住。
- 后续补真实截图。
- 不用 AI 假图顶替项目截图。

## 15. 交付物

首版完成后应交付:

- 首页代码。
- 静态数据文件。
- 简历 PDF。
- OG 图。
- 部署 URL。
- 本地和线上截图。

## 16. 验收命令

按项目实际包管理器选择:

```bash
npm run lint
npm run build
```

或:

```bash
pnpm lint
pnpm build
```

视觉检查:

```bash
# 启动项目后，用浏览器检查桌面/手机
npm run dev
```

## 17. 最小上线标准

满足以下条件即可上线:

- 首页完整。
- 桌面和手机可读。
- 简历可打开。
- GitHub 和邮箱可点击。
- AWTA 项目展示清楚。
- 无构建错误。
- 无明显控制台错误。

不要等博客、截图、动画全部完成再上线。第一版先让网站从“没用”变成“能作为个人入口”。
