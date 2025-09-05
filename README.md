# Netlify-Redirects

## 部署到 Netlify 的步骤

### 方法1：通过 Git 部署（推荐）

1. **创建 GitHub 仓库**包含上述文件
    
2. **注册 Netlify**（[netlify.com](https://netlify.com/)）
    
3. **连接 GitHub 仓库**
    
4. **自动部署**
    

### 方法2：拖拽部署（最简单）

1. 将包含 `_redirects` 文件的文件夹压缩成 ZIP
    
2. 拖拽到 Netlify 的部署区域
    
3. 立即生效
    

## 绑定自定义域名

### 步骤1：在 Netlify 中添加域名

1. 进入站点设置 → Domain management
    
2. 点击 "Add custom domain"
    
3. 输入您的域名 `www.example.com`
    

### 步骤2：配置 DNS

#### 选项A：使用 Netlify 的 DNS（推荐）

1. 在 Netlify 中管理 DNS
    
2. 修改域名注册商的 NS 记录指向 Netlify
    

#### 选项B：使用 CNAME 记录

text

www CNAME your-site.netlify.app.
api CNAME your-site.netlify.app.
admin CNAME your-site.netlify.app.

#### 选项C：使用 A 记录

text

www A 104.198.14.52
api A 104.198.14.52
admin A 104.198.14.52

## Netlify 的优势

1. **完全免费**：基础功能完全免费
    
2. **自动 HTTPS**：自动申请和续期 SSL 证书
    
3. **全球 CDN**：内容分发网络，速度快
    
4. **简单易用**：图形化界面，操作简单
    
5. **实时生效**：修改后立即部署
    

## 注意事项

1. **免费限制**：每月100GB带宽，对于大多数网站足够
    
2. **重定向次数**：免费版有重定向次数限制，但反向代理不算重定向
    
3. **WebSocket**：Netlify 重定向不支持 WebSocket
    
4. **性能**：会有轻微延迟（10-50ms）
    

## 验证配置

部署后，访问：

- `https://www.example.com` → 应该代理到 `http://106.15.4.153:8085`
    
- `https://api.example.com` → 应该代理到 `http://106.15.4.153:8086`
    
- `https://admin.example.com` → 应该代理到 `http://106.15.4.153:8087`
    

**总结：Netlify 确实可以绑定自定义域名，而且是最简单的解决方案之一！**
