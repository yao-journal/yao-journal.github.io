# Yao 的日记

个人网站：心情日记 + 旅行游记。免费托管在 GitHub Pages，用 Pages CMS 在手机或电脑上写。

## 第一次上线（只做一次）

1. 注册 GitHub 账号：https://github.com
2. 新建仓库（New repository），名字填 `你的用户名.github.io`。网址就是 `https://你的用户名.github.io`
3. 在仓库页面点 “uploading an existing file”，把这个文件夹里的**所有**文件拖进去，点 Commit changes。
   - Mac 上先在文件夹里按 `Cmd + Shift + .` 显示隐藏文件，`.github` 和 `.pages.yml` 一定要一起拖进去。
4. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
5. 仓库 Actions → “发布网站” → Run workflow。一两分钟后网站上线。

## 平时写日记 / 传照片

1. 打开 https://app.pagescms.org ，用 GitHub 登录，选这个仓库。
2. “心情日记”：写标题、选日期和心情，写正文，点保存。
3. “旅行”：上传封面、写地点和感想，正文里可以插照片，点保存。
4. 保存后一两分钟网站自动更新。照片会自动压缩，不用自己处理。

## 隐私

- 关掉“显示在网站上”的日记不会出现在网站上。
- 但如果仓库是公开的（Public），别人仍可能在 GitHub 上看到原文。想完全保密，把仓库设为 Private。用私有仓库发布网站需要 GitHub Pro，学生可以通过 GitHub Student Developer Pack 免费获得。

## 文件说明

- `src/diary/`：日记，一篇一个文件
- `src/travel/`：游记
- `src/media/`：上传的照片
- `src/_data/site.json`：网站名字和首页的一句话
- `src/_data/moods.json`：心情选项和对应的邮戳颜色
- `src/assets/style.css`：样式
