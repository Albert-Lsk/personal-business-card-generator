# 🎯 个人名片生成器

一个基于React和Claude Sonnet 4的智能个人名片生成工具，支持用户认证、文件上传、AI信息提取和专业名片生成。

![项目状态](https://img.shields.io/badge/状态-生产就绪-brightgreen)
![版本](https://img.shields.io/badge/版本-v2.0.0-blue)
![技术栈](https://img.shields.io/badge/技术栈-React%2018-61dafb)
![Docker](https://img.shields.io/badge/Docker-支持-2496ed)

## 🚀 功能特点

- **多格式支持**：支持文本消息、txt、md、pdf、word、jpg文件输入
- **智能解析**：自动提取关键信息并生成结构化名片
- **现代设计**：采用现代简约风格，响应式设计
- **可视化编辑**：提供表单界面进行信息微调
- **一键下载**：支持名片打印和PDF导出

## 🛠️ 技术栈

- **前端框架**：React 18 + Vite
- **样式方案**：Tailwind CSS
- **图标库**：Lucide React
- **字体**：Noto Sans SC（支持中文优化）

## 📦 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 预览构建
```bash
npm run preview
```

## 📝 使用说明

### 步骤1：上传信息
- 支持拖拽上传文件
- 支持的格式：txt, md, pdf, docx, jpg
- 或直接输入文本信息

### 步骤2：编辑信息
- 确认AI提取的信息
- 手动调整各项内容
- 添加头像和二维码

### 步骤3：生成名片
- 预览最终效果
- 下载或打印名片

## 🎨 设计特色

- **现代简约**：白色背景，蓝色强调，圆角设计
- **响应式**：适配手机、平板、桌面设备
- **个性化**：四种配色方案区分不同擅长领域
- **专业感**：清晰的视觉层次，优雅的字体排版

## 📁 项目结构

```
business-card-generator/
├── src/
│   ├── components/     # React组件
│   │   ├── PersonalCard.jsx    # 名片展示组件
│   │   ├── FileUpload.jsx      # 文件上传组件
│   │   └── InfoForm.jsx        # 信息编辑表单
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 应用入口
│   └── index.css       # 全局样式
├── public/            # 静态资源
├── index.html         # HTML模板
├── package.json       # 项目配置
├── tailwind.config.js # Tailwind配置
└── vite.config.js     # Vite配置
```

## 🎯 未来规划

- [ ] 集成AI API实现真正的智能解析
- [ ] 添加更多名片模板
- [ ] 支持自定义主题颜色
- [ ] 添加社交媒体分享功能
- [ ] 支持批量生成名片

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License