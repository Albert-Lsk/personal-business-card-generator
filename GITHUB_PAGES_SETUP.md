# GitHub Pages 部署设置指南

## 🚀 自动部署已配置完成

项目已经配置了GitHub Actions自动部署到GitHub Pages。每次推送到main分支时，都会自动构建和部署。

## 📋 GitHub Pages 设置步骤

### 1. 启用GitHub Pages
1. 访问GitHub仓库: https://github.com/Albert-Lsk/personal-business-card-generator
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 2. 配置权限
确保GitHub Actions有部署权限：
1. 在 **Settings** > **Actions** > **General**
2. 在 **Workflow permissions** 部分选择 **Read and write permissions**
3. 勾选 **Allow GitHub Actions to create and approve pull requests**

### 3. 查看部署状态
1. 在仓库主页点击 **Actions** 标签
2. 查看 "Deploy to GitHub Pages" 工作流状态
3. 等待部署完成（通常需要2-5分钟）

## 🌐 访问地址

部署完成后，可以通过以下地址访问：

**主要地址**: https://albert-lsk.github.io/personal-business-card-generator/

## 🔧 技术配置

### Vite配置
```javascript
// vite.config.js
export default defineConfig({
  base: '/personal-business-card-generator/',
  // ... 其他配置
})
```

### GitHub Actions工作流
- 文件位置: `.github/workflows/deploy.yml`
- 触发条件: 推送到main分支
- 构建工具: Vite
- 部署目标: GitHub Pages

## 📱 功能特性

### 无需注册访问
- 移除了用户认证要求
- 默认显示功能演示页面
- 支持直接体验名片生成功能

### 响应式设计
- ✅ 桌面浏览器支持
- ✅ 移动设备适配
- ✅ 平板设备优化

### 核心功能
- 🎨 功能演示和产品介绍
- 📄 文件上传和名片生成
- 🎯 实时预览和编辑
- 📱 响应式界面设计

## 🔍 故障排除

### 部署失败
1. 检查GitHub Actions日志
2. 确认权限设置正确
3. 验证vite.config.js配置

### 页面无法访问
1. 确认GitHub Pages已启用
2. 检查部署状态
3. 等待DNS传播（可能需要几分钟）

### 资源加载失败
1. 检查base路径配置
2. 确认构建输出正确
3. 验证相对路径引用

## 📞 技术支持

如遇问题，请：
1. 查看GitHub Actions日志
2. 检查浏览器控制台错误
3. 提交Issue到项目仓库

---

🎉 **部署完成后，您的项目将可以通过以下地址访问：**
**https://albert-lsk.github.io/personal-business-card-generator/**
