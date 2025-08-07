# 个人名片生成器 - 部署文档

## 📋 目录

- [系统要求](#系统要求)
- [本地开发环境](#本地开发环境)
- [Docker部署](#docker部署)
- [生产环境部署](#生产环境部署)
- [环境变量配置](#环境变量配置)
- [监控和日志](#监控和日志)
- [故障排除](#故障排除)

## 🔧 系统要求

### 最低要求
- **CPU**: 1核心
- **内存**: 512MB RAM
- **存储**: 1GB 可用空间
- **网络**: 稳定的互联网连接

### 推荐配置
- **CPU**: 2核心或更多
- **内存**: 2GB RAM或更多
- **存储**: 5GB 可用空间
- **网络**: 高速互联网连接

### 软件依赖
- **Node.js**: 18.x 或更高版本
- **npm**: 9.x 或更高版本
- **Docker**: 20.x 或更高版本（可选）
- **Docker Compose**: 2.x 或更高版本（可选）

## 🚀 本地开发环境

### 1. 克隆项目
```bash
git clone <repository-url>
cd personal-business-card-generator
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 4. 构建项目
```bash
npm run build
```

### 5. 预览构建结果
```bash
npm run preview
```

## 🐳 Docker部署

### 快速开始

#### 1. 使用Docker Compose（推荐）
```bash
# 生产环境
docker-compose up -d

# 开发环境
docker-compose -f docker-compose.dev.yml up -d
```

#### 2. 使用Docker直接构建
```bash
# 构建镜像
docker build -t business-card-generator .

# 运行容器
docker run -d \
  --name business-card-generator \
  -p 3000:80 \
  business-card-generator
```

### 详细配置

#### 生产环境部署
```bash
# 1. 构建并启动所有服务
docker-compose up -d

# 2. 查看服务状态
docker-compose ps

# 3. 查看日志
docker-compose logs -f frontend

# 4. 停止服务
docker-compose down
```

#### 开发环境部署
```bash
# 1. 启动开发环境
docker-compose -f docker-compose.dev.yml up -d

# 2. 进入容器进行调试
docker-compose -f docker-compose.dev.yml exec frontend-dev sh

# 3. 重新构建服务
docker-compose -f docker-compose.dev.yml up --build
```

### 服务访问地址

| 服务 | 生产环境 | 开发环境 |
|------|----------|----------|
| 前端应用 | http://localhost:3000 | http://localhost:5173 |
| Redis | localhost:6379 | localhost:6380 |
| 健康检查 | http://localhost:3000/health | http://localhost:5173/health |

## 🌐 生产环境部署

### 1. 云服务器部署

#### 准备工作
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 添加用户到docker组
sudo usermod -aG docker $USER
```

#### 部署步骤
```bash
# 1. 克隆项目
git clone <repository-url>
cd personal-business-card-generator

# 2. 配置环境变量
cp .env.example .env
nano .env

# 3. 启动服务
docker-compose up -d

# 4. 配置反向代理（可选）
docker-compose --profile production up -d
```

### 2. 使用Nginx反向代理

创建 `nginx-proxy.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:80;
    }

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### 3. SSL证书配置

#### 使用Let's Encrypt
```bash
# 安装certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

## ⚙️ 环境变量配置

创建 `.env` 文件：
```bash
# 应用配置
NODE_ENV=production
PORT=3000

# Redis配置
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=

# 安全配置
SESSION_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-here

# 外部服务配置
# OPENAI_API_KEY=your-openai-api-key
# CLAUDE_API_KEY=your-claude-api-key

# 日志配置
LOG_LEVEL=info
LOG_FILE=/var/log/app.log

# 监控配置
HEALTH_CHECK_INTERVAL=30
```

## 📊 监控和日志

### 健康检查
```bash
# 检查应用健康状态
curl http://localhost:3000/health

# 检查Docker容器状态
docker-compose ps
docker-compose logs frontend
```

### 日志管理
```bash
# 查看实时日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs frontend

# 日志轮转配置
# 在docker-compose.yml中添加:
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### 性能监控
```bash
# 查看资源使用情况
docker stats

# 查看容器详细信息
docker inspect business-card-generator
```

## 🔧 故障排除

### 常见问题

#### 1. 端口冲突
```bash
# 查看端口占用
sudo netstat -tulpn | grep :3000

# 修改端口配置
# 在docker-compose.yml中修改ports映射
```

#### 2. 内存不足
```bash
# 查看内存使用
free -h
docker stats

# 增加swap空间
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### 3. 磁盘空间不足
```bash
# 清理Docker资源
docker system prune -a

# 清理未使用的卷
docker volume prune
```

#### 4. 网络连接问题
```bash
# 检查Docker网络
docker network ls
docker network inspect business-card-generator_app-network

# 重启网络
docker-compose down
docker-compose up -d
```

### 调试命令

```bash
# 进入容器调试
docker-compose exec frontend sh

# 查看容器日志
docker-compose logs --tail=100 frontend

# 重启特定服务
docker-compose restart frontend

# 重新构建并启动
docker-compose up --build -d
```

### 备份和恢复

#### 数据备份
```bash
# 备份Redis数据
docker-compose exec redis redis-cli BGSAVE
docker cp business-card-redis:/data/dump.rdb ./backup/

# 备份应用配置
tar -czf backup/config-$(date +%Y%m%d).tar.gz .env docker-compose.yml
```

#### 数据恢复
```bash
# 恢复Redis数据
docker-compose down
docker cp ./backup/dump.rdb business-card-redis:/data/
docker-compose up -d
```

## 📞 技术支持

如果遇到部署问题，请：

1. 检查系统要求是否满足
2. 查看错误日志获取详细信息
3. 参考故障排除部分
4. 提交Issue到项目仓库

---

**注意**: 在生产环境中，请确保：
- 使用强密码和安全的密钥
- 定期更新系统和依赖
- 配置适当的防火墙规则
- 设置监控和告警
- 定期备份重要数据
