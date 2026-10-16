\# 技术设计文档（TECH\_DESIGN.md）



\## 一、技术栈选择



| 层级 | 选型 | 理由 |

|------|------|------|

| 前端框架 | React 18 + TypeScript | 组件化开发、类型安全、生态成熟 |

| 构建工具 | Vite | 极快的冷启动和热更新，专为现代前端优化 |

| 样式方案 | TailwindCSS | 原子化 CSS，快速开发，风格统一 |

| 状态管理 | （无，localStorage + useState） | 项目规模小，跨组件共享数据少，无需引入状态库 |

| 路由 | React Router v6 | 标准路由方案，支持嵌套路由和路由守卫 |

| Markdown 渲染 | react-markdown + remark-gfm | 支持 GFM 语法（表格、任务列表等） |

| 代码高亮 | react-syntax-highlighter | 博客代码块高亮 |

| 表单校验 | react-hook-form + zod | 轻量、性能好、类型安全 |

| 图标库 | lucide-react | 轻量、风格统一、按需引入 |

| 日期处理 | dayjs | 轻量（2KB），API 友好 |

| 部署平台 | Vercel / Cloudflare Pages | 免费静态托管，自带 CDN 加速 |



> \*\*约束：\*\* 禁止引入重型 UI 库（如 Ant Design、MUI），保持项目轻量。



\---



\## 二、项目结构



```text

my-portfolio/

├── public/                     # 静态资源（favicon 等）

├── src/

│   ├── api/                    # 统一 API 层（当前用 localStorage 模拟）

│   │   ├── index.ts            # 统一导出

│   │   ├── profile.ts          # 个人信息 API

│   │   ├── skills.ts           # 技能 API

│   │   ├── projects.ts         # 项目 API

│   │   ├── posts.ts            # 博客 API

│   │   └── auth.ts             # 登录鉴权 API

│   ├── components/             # 通用组件

│   │   ├── Starfield.tsx       # 星空背景（Canvas）

│   │   ├── Navbar.tsx          # 前台导航栏

│   │   ├── Footer.tsx          # 页脚

│   │   ├── ProjectCard.tsx     # 项目卡片

│   │   ├── SkillBar.tsx        # 技能进度条

│   │   ├── MarkdownViewer.tsx  # Markdown 渲染组件

│   │   └── ProtectedRoute.tsx  # 路由守卫

│   ├── layouts/                # 布局

│   │   ├── MainLayout.tsx      # 前台布局（Navbar + Footer）

│   │   └── AdminLayout.tsx     # 后台布局（侧边栏 + 顶栏）

│   ├── pages/                  # 页面

│   │   ├── Home/               # 首页

│   │   │   └── index.tsx

│   │   ├── Blog/               # 博客

│   │   │   ├── index.tsx       # 列表页

│   │   │   └── Detail.tsx      # 详情页

│   │   ├── Projects/           # 项目

│   │   │   ├── index.tsx       # 列表页

│   │   │   └── Detail.tsx      # 详情页

│   │   ├── NotFound.tsx        # 404 页面

│   │   └── admin/              # 后台管理

│   │       ├── Login.tsx       # 登录页

│   │       ├── Dashboard.tsx   # 仪表盘

│   │       ├── Profile.tsx     # 个人信息管理

│   │       ├── Skills.tsx      # 技能管理

│   │       ├── Projects.tsx    # 项目管理

│   │       ├── Posts.tsx       # 博客管理

│   │       └── Settings.tsx    # 站点设置

│   ├── hooks/                  # 自定义 hooks

│   │   ├── useAuth.ts          # 登录态管理

│   │   └── useLocalStorage.ts  # localStorage 封装

│   ├── store/                  # Zustand 状态

│   │   └── index.ts

│   ├── types/                  # TypeScript 类型定义

│   │   └── index.ts

│   ├── utils/                  # 工具函数

│   │   ├── formatDate.ts

│   │   └── markdownLoader.ts   # 动态加载 md 文件

│   ├── data/                   # 静态数据

│   │   ├── posts/              # 博客 Markdown 文件

│   │   │   ├── hello-world.md

│   │   │   ├── react-tips.md

│   │   │   └── css-grid.md

│   │   └── seed.ts             # 初始种子数据

│   ├── App.tsx                 # 根组件（路由配置）

│   ├── main.tsx                # 入口

│   └── index.css               # TailwindCSS 引入

├── .gitignore

├── index.html

├── package.json

├── postcss.config.js

├── tailwind.config.js

├── tsconfig.json

├── vite.config.ts

├── PRD.md

├── TECH\_DESIGN.md

└── AGENTS.md

