# xyras.one 个人网站改版产品文档 V1

版本: V1.0
日期: 2026-05-26
项目类型: 个人数字花园 / 作品集首页 / 纯前端静态站
参考风格: chester.how
参考源码: https://github.com/chesterhow/portfolio

## 1. 项目结论

xyras.one 不做传统简历站，也不做假 agency 官网。最终形态是：

> 一个浅色、克制、有个人气质的数字花园首页，用卡片索引展示孙翔宇的项目、系统、写作、工具和经历。

它的表层是个人主页，底层服务求职、合作和个人品牌。访问者应该觉得：

> 这个人有真实项目、有系统化能力、有审美，也不像在硬装公司。

## 2. 参考站判断

### 2.1 chester.how 的可借鉴点

chester.how 的公开仓库是 `chesterhow/portfolio`，仓库描述为个人作品集，MIT 许可，技术上是较老的 `index.html + SCSS + Parcel`。

可借鉴的是风格和信息结构，不建议直接复刻技术栈。

可借鉴:

- 大段自然个人介绍。
- 首页直接展示 projects。
- 作品、经历、联系入口都在一页完成。
- 语气像真实个人，不像商业 landing page。
- 视觉轻、排版干净、留白多。

不照搬:

- 不使用旧 Parcel 架构。
- 不照抄文案和布局细节。
- 不把生活兴趣放到压过职业项目。
- 不复刻全部视觉元素，避免变成低配复制。

## 3. 产品定位

### 3.1 中文定位

孙翔宇的个人数字花园，展示他围绕软件、B2B 出海、AI 工作流、个人知识管理所构建的项目和思考。

### 3.2 英文定位

```text
Xyras is a builder working around software, B2B export, AI workflows,
and personal knowledge management.
```

### 3.3 首页第一句话

推荐版本:

```text
Hey, I’m Xyras.

I build useful systems around software, B2B export,
AI workflows, and personal knowledge management.
```

更求职导向版本:

```text
Hey, I’m Xyras.

I build export growth systems, AI workflows, and small software products.
Currently based in Zhongshan, China.
```

## 4. 用户对象

### 4.1 主要用户

- 中山及珠三角制造业老板、外贸负责人。
- 独立站运营、海外增长、外贸数字化岗位招聘方。
- HR、猎头、面试官。
- 潜在合作方。
- 技术或产品朋友。

### 4.2 访问者核心问题

- 你是谁？
- 你到底做技术、做运营还是做外贸？
- 你做过什么真实项目？
- 你是不是只会包装，还是能交付？
- 你有没有长期积累和个人系统？
- 怎么联系你或看简历？

## 5. 业务目标

### 5.1 求职目标

支持投递以下岗位:

- 外贸数字化运营
- B2B 独立站运营
- 海外增长运营
- 跨境电商独立站运营
- AI 工具落地/业务自动化
- CRM/SOP/销售流程运营
- 懂业务的产品/前端/运营复合岗

### 5.2 个人品牌目标

建立一个长期可更新的个人入口，承接:

- 简历
- 项目
- 写作
- 阅读
- 工具栈
- 个人方法论

### 5.3 合作目标

让潜在合作方知道可以找你聊:

- 制造业英文/多语言官网
- 产品资料结构化
- 询盘路径和 CRM 流程
- AI 内容与翻译流水线
- 外贸业务 SOP

## 6. 产品原则

### 6.1 必须做到

- 像真实个人。
- 项目权重大于生活兴趣。
- 视觉高级但不花哨。
- 文案自然，不像广告。
- 所有内容经得起追问。
- 首版纯前端静态实现。

### 6.2 禁止做到

- 不写 “We help”。
- 不写假团队。
- 不写假客户评价。
- 不写虚构成交额。
- 不做夸张 SaaS hero。
- 不用深色赛博风作为主风格。
- 不把页面做成普通简历复刻。

## 7. 信息架构

首版只做一个首页。

```text
/
  Header
  Intro
  Featured Grid
  Projects
  Systems
  Writing
  Reading / Tools
  About
  Contact
  Footer
```

锚点:

```text
#projects
#systems
#writing
#reading
#about
#contact
```

后续可扩展:

```text
/projects/awta-b2b-website
/projects/export-sales-os
/projects/ai-content-pipeline
/writing
/notes
/resume
```

## 8. 首页模块

### 8.1 Header

目标: 明确这是个人网站，并提供快速导航。

内容:

- 左侧: `Xyras`
- 右侧:
  - Projects
  - Writing
  - Systems
  - Reading
  - About
  - CV

交互:

- 桌面端横向导航。
- 移动端可简化为 `Xyras + CV + Email`，不强制做菜单。

### 8.2 Intro

目标: 用自然语气介绍自己，而不是广告话术。

文案:

```text
Hey, I’m Xyras.

Welcome to my digital garden. I build useful systems around software,
B2B export, AI workflows, and personal knowledge management.

Recently, I’ve been exploring how small manufacturing teams can use multilingual websites,
product data, CRM workflows, and automation to build better overseas growth engines.
```

辅助按钮:

- GitHub
- Email
- CV

### 8.3 Featured Grid

目标: 用瀑布流卡片展示个人世界观和项目资产。

卡片类型:

- Projects
- Systems
- Writing
- Reading
- Tools
- Work

布局:

- 桌面端 3 列 masonry。
- 平板端 2 列。
- 手机端 1 列。

### 8.4 Projects

首版必须出现 4 个项目。

#### AWTA B2B Multilingual Website

定位: 最大卡片。

文案:

```text
A 10-language B2B website for an LED lighting manufacturer, with CMS,
inquiry flow, SEO foundations, and multilingual content.
```

标签:

- Projects
- Export Website

数字:

- 4 days
- 10 languages
- 170+ URLs
- CMS / SEO / Inquiry

链接:

- Visit Site: https://awtaled.com
- Case Study: 后续可做

#### Export Sales OS

文案:

```text
A personal operating system for export sales: lead pool, customer records,
market strategy, scripts, CRM handoff, and review rhythm.
```

标签:

- Systems
- CRM / SOP

数字:

- 6 market zones
- 12 templates
- Day 0/3/7-10/21/30

#### AI Content Pipeline

文案:

```text
An AI-assisted workflow for turning English SEO content into multilingual drafts
with protected links, image paths, and human review.
```

标签:

- Systems
- AI Workflow

数字:

- 9-language drafts
- 3 SEO articles
- translation workflow

#### Hundsun TA Testing

文案:

```text
Testing and delivery work for securities and fund core systems, covering requirements,
defects, regression, data validation, and delivery coordination.
```

标签:

- Work
- Enterprise Systems

数字:

- 2021-2024
- test lead
- financial core systems

### 8.5 Writing

首版可先放草稿卡片，不一定有详情页。

建议标题:

- What I learned building a B2B export website in 4 days
- Why small factories need product data before AI
- CRM is useless if nobody defines the follow-up rhythm
- From software testing to export growth systems

### 8.6 Reading / Tools

目标: 增加个人气质和长期学习感，但不能喧宾夺主。

阅读卡片:

- The Design of Everyday Things
- Inspired
- Obviously Awesome
- The Mom Test

工具卡片:

- Obsidian
- Codex / Claude / ChatGPT
- Next.js
- Payload CMS
- Cloudflare / Vercel
- CRM systems

### 8.7 About

文案:

```text
I started in enterprise financial technology systems, where I learned how to work with
requirements, data accuracy, defects, delivery risks, and cross-role collaboration.

Later, I moved into B2B export and manufacturing scenarios in Zhongshan,
building practical systems around websites, product data, inquiry workflows,
CRM, sales SOP, and AI-assisted operations.

This mix makes me useful where pure sales, pure operations, and pure engineering
are not enough.
```

### 8.8 Contact

内容:

- Email: xyras_sun@163.com
- GitHub: https://github.com/LuvKab
- Resume: `/resume.pdf`
- Location: Zhongshan, China

CTA:

```text
Open to export growth roles, independent-site operations,
AI workflow projects, and B2B digitalization work.
```

## 9. 视觉规范

### 9.1 关键词

- Calm
- Personal
- Editorial
- Curated
- Useful
- Builder-like

### 9.2 色彩

```text
Page background: #F7F3EA
Card background: #FFFDF7
Text primary: #1F1F1D
Text secondary: #6F6A60
Border: #E2D8C7
Tag background: #F2EBDD
Accent: #4F7C64
```

### 9.3 字体

标题:

- Fraunces
- Georgia
- Cormorant Garamond
- Playfair Display

正文:

- Inter
- Geist
- system-ui

推荐:

```text
标题: Georgia 或 Fraunces
正文: Inter 或 system-ui
```

### 9.4 卡片规则

- 小圆角，建议 6px。
- 细边框。
- 浅色纸感背景。
- hover 轻微边框加深或向上 2px。
- 大卡片用于 AWTA。
- 中卡片用于系统和写作。
- 小卡片用于工具、阅读、联系方式。

## 10. MVP 范围

### 10.1 必做

- 首页完整。
- Header / Intro / Cards / About / Contact。
- 4 个核心项目卡片。
- GitHub / Email / CV 外链。
- 响应式布局。
- 基础 SEO / OG。
- 简历 PDF 放入 public。

### 10.2 可选

- AWTA 项目详情页。
- 项目截图。
- 中英文切换。
- Writing 详情页。
- 细微动效。

### 10.3 不做

- 后台。
- CMS。
- 登录。
- 在线留言表单。
- 复杂动画。
- 假 testimonials。
- 复杂博客系统。

## 11. SEO

Title:

```text
Xyras Sun - Builder around software, B2B export, and AI workflows
```

Description:

```text
Personal digital garden of Xyras Sun, a Zhongshan-based builder working around software,
B2B export, AI workflows, multilingual websites, CRM systems, and product data.
```

OG:

- `og:type`: website
- `og:title`: Xyras Sun
- `og:description`: Personal digital garden around software, B2B export, AI workflows, and useful systems.
- `og:url`: https://xyras.one
- `og:image`: `/og.png`

## 12. 验收标准

### 12.1 内容

- 第一屏能看出你是谁。
- 30 秒内能看出你做什么方向。
- AWTA 项目是最强视觉权重。
- 至少 4 个真实项目/经历卡片。
- 不出现假团队、假客户、假成交额。
- 能打开简历、GitHub、邮箱。

### 12.2 视觉

- 浅色 editorial / digital garden 气质明确。
- 不像 SaaS 官网。
- 不像传统简历模板。
- 卡片间距舒适。
- 移动端不溢出、不重叠。

### 12.3 技术

- 首页无后端依赖。
- 构建通过。
- 无控制台错误。
- Lighthouse 四项尽量 90+。
- 桌面、平板、手机布局正常。

## 13. 迭代计划

### V1.0

完成单页个人数字花园首页。

### V1.1

增加 AWTA 项目详情页和真实截图。

### V1.2

增加 Writing / Notes 列表。

### V1.3

增加中英文切换和更完整的案例页模板。

## 14. 最终判断

这版网站应当表现为:

> 一个真实个人的高级索引页，而不是包装过度的商业广告页。

它要帮你完成三件事:

- 看起来像一个有审美、有系统、有项目的人。
- 支撑你投“外贸数字化 / 独立站 / 海外增长 / AI 工作流”岗位。
- 给未来自有出海服务留下长期入口。
