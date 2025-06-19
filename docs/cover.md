<!-- _coverpage.md -->
<div class="hero-container">
  <!-- 黄色方块背景 -->
  <div class="yellow-square">
    <div class="raccoon-container">
      <div class="raccoon">
        <!-- 小浣熊身体 -->
        <div class="body"></div>
        <!-- 小浣熊耳朵 -->
        <div class="ear left"></div>
        <div class="ear right"></div>
        <!-- 小浣熊眼睛 -->
        <div class="eye left"></div>
        <div class="eye right"></div>
        <!-- 小浣熊疲惫表情 -->
        <div class="eyelid left"></div>
        <div class="eyelid right"></div>
      </div>
    </div>
  </div>

  <div class="content-container">
    <!-- 标题区域 -->
    <h1 class="main-title">
      拼搏的小浣熊
      <span class="version">v1.2</span>
    </h1>
    
    <!-- 副标题 -->
    <div class="subtitle">
      <div class="line"></div>
      <div class="text">知行合一·技术博客与知识库的完美融合</div>
      <div class="line"></div>
    </div>
    
    <!-- 统计信息 -->
    <div class="stats-container">
      <div class="stat-item">
        <i class="icon fas fa-book"></i>
        <div class="stat-text">
          已累计整理 <span class="highlight">{{docsify-updated-count}}</span> 篇技术笔记
        </div>
      </div>
      
      <div class="stat-item">
        <i class="icon far fa-clock"></i>
        <div class="stat-text">
          最近更新: <span class="highlight">{{date}}</span>
        </div>
      </div>
    </div>
    
    <!-- 进入按钮 -->
    <a href="#/guide" class="cta-button">
      <i class="fas fa-door-open"></i> 【博客&&笔记】入口
    </a>
  </div>
  
  <!-- 背景装饰元素 -->
  <div class="bubble bubble-1"></div>
  <div class="bubble bubble-2"></div>
  <div class="bubble bubble-3"></div>

  <!-- 新增底部区域 -->
  <footer class="site-footer">
    <!-- 波浪分隔线 -->
    <div class="footer-wave">
      <svg class="editorial" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="50" y="0" fill="rgba(255,255,255,0.3)"/>
          <use xlink:href="#gentle-wave" x="50" y="3" fill="rgba(255,255,255,0.2)"/>
          <use xlink:href="#gentle-wave" x="50" y="6" fill="rgba(255,255,255,0.1)"/>
        </g>
      </svg>
    </div>
    
    <!-- 底部内容容器 -->
    <div class="footer-container">
      <div class="copyright">
        <p>© <span id="currentYear"></span> 拼搏的小浣熊. 保留所有权利</p>
        <p>知行合一·技术博客与知识库的完美融合</p>
      </div>
      
      <div class="footer-links">
        <a href="/#/about">关于我们</a>
        <a href="/#/privacy">隐私政策</a>
        <a href="/#/onself">联系我们</a>
        <a href="/#/guide">网站地图</a>
      </div>
    </div>
  </footer>
</div>

<style>

:root {
  --primary-blue: #1a73e8;
  --blue-gradient-start: #4a69bb;
  --blue-gradient-end: #2c3e9d;
  --yellow-accent: #FFD54F;
  --yellow-dark: #F9A825;
  --brown: #795548;
  --light-brown: #A1887F;
  --dark-brown: #5D4037;
}

/* 基础布局 */
.hero-container {
    width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, var(--blue-gradient-start), var(--blue-gradient-end));
  overflow: hidden;
  padding: 20px;
}

/* 黄色方块区域 */
.yellow-square {
  width: 220px;
  height: 220px;
  background: var(--yellow-accent);
  border-radius: 25px;
  box-shadow: 
    0 10px 30px rgba(249, 168, 37, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  transition: all 0.5s ease;
  z-index: 2;
}

.yellow-square::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
  transform: rotate(30deg);
  opacity: 0.3;
  animation: shine 6s linear infinite;
}

/* 小浣熊样式 */
.raccoon {
  position: relative;
  width: 140px;
  height: 140px;
}

.raccoon .body {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--brown);
  border-radius: 50% 50% 40% 40%;
  transform: rotate(5deg);
  box-shadow: 
    inset -10px -5px 0 rgba(0,0,0,0.1),
    inset 2px 5px 0 rgba(255,255,255,0.1);
}

/* 耳朵 */
.raccoon .ear {
  position: absolute;
  width: 50px;
  height: 50px;
  background: var(--brown);
  border-radius: 50%;
  top: -20px;
}

.raccoon .ear.left {
  left: 10px;
  transform: rotate(-15deg);
}

.raccoon .ear.right {
  right: 10px;
  transform: rotate(15deg);
}

.ear::before {
  content: "";
  position: absolute;
  width: 65%;
  height: 65%;
  background: var(--dark-brown);
  border-radius: 50%;
  top: 17%;
  left: 17%;
}

/* 眼睛 */
.raccoon .eye {
  position: absolute;
  width: 18px;
  height: 25px;
  background: #000;
  border-radius: 50%;
  top: 40%;
  animation: blink 6s infinite;
}

.raccoon .eye.left { left: 35%; }
.raccoon .eye.right { right: 35%; }

.eye::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  top: 30%;
  left: 20%;
}

/* 疲惫的眼皮 */
.raccoon .eyelid {
  position: absolute;
  width: 22px;
  height: 8px;
  background: var(--brown);
  border-radius: 8px;
  top: 41%;
  opacity: 0.95;
  animation: droopyEyes 8s infinite;
}

.raccoon .eyelid.left { 
  left: 34%;
  transform: rotate(5deg);
}

.raccoon .eyelid.right { 
  right: 34%;
  transform: rotate(-5deg);
}

/* 内容容器 */
.content-container {
  text-align: center;
  z-index: 2;
  margin-top: 20px;
}

/* 主标题 */
.main-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;
  padding: 0 40px;
  margin-bottom: 25px;
}

.main-title::before,
.main-title::after {
  content: "";
  position: absolute;
  top: 50%;
  height: 2px;
  width: 30px;
  background: linear-gradient(to right, transparent, var(--yellow-accent), transparent);
}

.main-title::before { left: 0; }
.main-title::after { right: 0; }

.version {
  position: absolute;
  top: -12px;
  right: -10px;
  background: var(--yellow-accent);
  color: var(--dark-brown);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 15px;
  transform: rotate(10deg);
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

/* 副标题 */
.subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
}

.subtitle .line {
  width: 30px;
  height: 1px;
  background: rgba(255,255,255,0.5);
  margin: 0 15px;
}

.subtitle .text {
  color: rgba(255,255,255,0.9);
  font-size: 1.2rem;
  letter-spacing: 1px;
}

/* 统计区域 */
.stats-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(5px);
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1);
}

.icon {
  color: var(--yellow-accent);
  font-size: 1.5rem;
}

.stat-text {
  color: white;
  font-size: 1.1rem;
}

.highlight {
  color: #FFD54F;
  font-weight: bold;
  background: rgba(0,0,0,0.2);
  padding: 0 8px;
  border-radius: 5px;
  display: inline-block;
}

/* 进入按钮 */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  background: linear-gradient(to right, var(--primary-blue), #1565C0);
  border-radius: 50px;
  box-shadow: 
    0 5px 20px rgba(33, 150, 243, 0.4),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.cta-button::before {
  content: "";
  position: absolute;
  top: -100%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(rgba(255,255,255,0.2), transparent);
  transform: rotate(20deg);
  z-index: -1;
  transition: all 0.4s ease;
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 8px 25px rgba(33, 150, 243, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.4);
}

.cta-button:hover::before {
  top: 20%;
}

/* 背景气泡效果 */
.bubble {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  opacity: 0.1;
}

.bubble-1 {
  width: 200px;
  height: 200px;
  background: var(--yellow-accent);
  top: -50px;
  right: -50px;
  animation: float 12s infinite ease-in-out;
}

.bubble-2 {
  width: 150px;
  height: 150px;
  background: #2196F3;
  bottom: 40px;
  left: -30px;
  animation: float 15s infinite ease-in-out;
}

.bubble-3 {
  width: 120px;
  height: 120px;
  background: #4CAF50;
  bottom: 200px;
  right: 80px;
  animation: float 10s infinite ease-in-out;
}

/* 动画定义 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(15px);
  }
  50% {
    transform: translateY(10px) translateX(30px);
  }
  75% {
    transform: translateY(-15px) translateX(-15px);
  }
}

@keyframes shine {
  0% { transform: rotate(30deg) translateX(-100%); }
  100% { transform: rotate(30deg) translateX(100%); }
}

@keyframes blink {
  0%, 45%, 55%, 100% { height: 25px; }
  50% { height: 5px; }
}

@keyframes droopyEyes {
  0%, 70%, 100% { height: 8px; top: 41%; }
  75% { height: 14px; top: 43%; }
  85% { height: 8px; top: 41%; }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .yellow-square {
    width: 180px;
    height: 180px;
  }
  
  .main-title {
    font-size: 2.2rem;
  }
  
  .stats-container {
    gap: 20px;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-item {
    width: 90%;
  }
}
/* 底部整体样式 */
.site-footer {
  width: 100vw;
  position: relative;
  margin-top: 11vh;
  z-index: 3;
}

/* 波浪效果 */
.footer-wave {
  width: 100%;
  height: 40px;
  position: absolute;
  top: -39px;
  left: 0;
  overflow: hidden;
}

.editorial {
  display: block;
  width: 100%;
  height: 40px;
  margin: 0;
}

.parallax > use {
  animation: move-forever 12s linear infinite;
}

.parallax > use:nth-child(1) { animation-delay: -2s; }
.parallax > use:nth-child(2) { 
  animation-delay: -2s;
  animation-duration: 5s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 3s;
}

@keyframes move-forever {
  0% { transform: translate(-90px, 0%); }
  100% { transform: translate(85px, 0%); }
}

/* 底部内容容器 */
.footer-container {
  background: rgba(26, 35, 70, 0.85);
  backdrop-filter: blur(5px);
  padding: 30px 20px 25px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 版权信息 */
.copyright {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 15px;
}

.copyright p:first-child {
  font-weight: 500;
  letter-spacing: 0.03em;
}

/* 链接样式 */
.footer-links {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.85em;
  position: relative;
  padding: 4px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--yellow-accent);
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: var(--yellow-accent);
}

.footer-links a:hover::after {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-container {
    padding: 25px 15px;
  }
  
  .footer-links {
    gap: 15px;
  }
  
  .copyright {
    font-size: 0.8em;
  }
}

/* 确保内容不足时页脚仍在底部 */
body, html {
  height: 100%;
}

.hero-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<script>
// 随机粒子效果
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.hero-container');
  
  // 创建额外气泡
  for (let i = 0; i < 3; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // 随机位置
    const size = 50 + Math.random() * 100;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const opacity = 0.02 + Math.random() * 0.08;
    const delay = Math.random() * 10;
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;
    bubble.style.opacity = opacity;
    bubble.style.animationDelay = `${delay}s`;
    
    container.appendChild(bubble);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // 原有粒子效果代码...
  
  // 更新年份
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // 底部定位调整
  function adjustFooterLayout() {
    const footer = document.querySelector('.site-footer');
    const main = document.querySelector('.hero-container');
    
    if (main.scrollHeight <= window.innerHeight) {
      footer.style.marginTop = 'auto';
    } else {
      footer.style.marginTop = '60px';
    }
  }
  
  adjustFooterLayout();
  window.addEventListener('resize', adjustFooterLayout);
});
</script>