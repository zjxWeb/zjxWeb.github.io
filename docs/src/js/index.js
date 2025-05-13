window.$docsify = {
  el: '#app',
  routerMode: 'hash',
  auto2top: true,//切换页面后是否自动跳转到页面顶部。
  mergeNavbar: true,//小屏设备下合并导航栏到侧边栏。
  // repo: 'https://github.com/zjxWeb/zjxWeb.github.io',
  loadSidebar: 'sidebar.md',
  loadNavbar: true,
  // coverpage: 'cover.md',
  coverpage: false,
  onlyCover: true,
  autoHeader: true,
  notFoundPage: true,//在找不到指定页面时加载_404.md
  subMaxLevel: 3,
  search: 'auto', // seach默认值
  //字数统计
  count: {
    countable: true,
    fontsize: '0.9em',
    color: 'rgb(90,90,90)',
    language: 'chinese'
  },
  // tab
  tabs: {
    persist: false,      // default // 默认打开一个
    sync: false,      // default确定选项卡选择是否将在具有匹配标签的选项卡之间同步。
    theme: 'classic', // default
    tabComments: true,      // default
    tabHeadings: true       // default
  },
  //脚注
  plugins: [
    function (hook) {
      debugger
      var footer = [
        '<hr/>',
        `<footer style="position:relative; padding:2.5rem 1.5rem; background: linear-gradient(152deg, #f8f9fa 0%, #f1f3f5 100%); border-top: 1px solid rgba(0,0,0,0.05);">
          <!-- 感谢模块 -->
          <div class="gratitude-module" style="max-width:880px; margin:0 auto 2rem;">
              <h3 style="font-size:1.25rem; color:#2b2d42; margin-bottom:1.25rem; position:relative; padding-left:1.5rem;">
                  <span style="position:absolute; left:0; top:50%; transform:translateY(-50%); width:4px; height:70%; background:#4dabf7; border-radius:2px;"></span>
                  感谢您的探索与支持
              </h3>
              
              <div class="action-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px,1fr)); gap:1.5rem;">
                  <!-- 卡片1：正向反馈 -->
                  <div class="action-card" style="padding:1.5rem; background:white; border-radius:12px; box-shadow:0 6px 15px -3px rgba(0,0,0,0.05); transition:transform 0.25s ease;">
                      <div style="display:flex; align-items:center; gap:0.8rem; margin-bottom:1rem;">
                          <div style="width:40px; height:40px; background:#ffe3e3; border-radius:8px; display:grid; place-items:center;">
                              ⭐
                          </div>
                          <h4 style="margin:0; color:#2b2d42; font-weight:600;">正向激励</h4>
                      </div>
                      <p style="margin:0; color:#495057; line-height:1.6; font-size:0.95rem;">
                          您的每次互动都是我们持续优化的动力源
                      </p>
                  </div>
                  
                  <!-- 卡片2：即时反馈 -->
                  <div class="action-card" style="padding:1.5rem; background:white; border-radius:12px; box-shadow:0 6px 15px -3px rgba(0,0,0,0.05); transition:transform 0.25s ease;">
                      <div style="display:flex; align-items:center; gap:0.8rem; margin-bottom:1rem;">
                          <div style="width:40px; height:40px; background:#d0f4ff; border-radius:8px; display:grid; place-items:center;">
                              💬
                          </div>
                          <h4 style="margin:0; color:#2b2d42; font-weight:600;">即时沟通</h4>
                      </div>
                      <p style="margin:0; color:#495057; line-height:1.6; font-size:0.95rem;">
                          问题反馈24小时内响应<br>
                          <a href="mailto:agonytriumph@163.com" style="color:#4dabf7; text-decoration:none; border-bottom:1px dashed currentColor;">直达作者邮箱</a>
                      </p>
                  </div>
              </div>
          </div>

          <!-- 互动面板 -->
          <div class="interaction-panel" style="max-width:880px; margin:0 auto; position:relative; z-index:1;">
              <div style="display:flex; flex-wrap:wrap; gap:1.5rem; justify-content:space-between; align-items:center; padding:1.5rem; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); border-radius:16px; box-shadow:0 8px 20px -6px rgba(0,0,0,0.03);">
                  <!-- GitHub模块 -->
                  <a href="https://github.com/zjxWeb/zjxWeb.github.io" 
                    class="social-button"
                    style="--hue: 210; 
                            display:inline-flex; 
                            align-items:center; 
                            gap:0.8rem; 
                            padding:0.8rem 1.5rem; 
                            background:hsl(var(--hue), 89%, 45%); 
                            color:white; 
                            border-radius:10px; 
                            text-decoration:none;
                            transition:all 0.2s ease;
                            position:relative;
                            overflow:hidden;">
                      <span style="position:relative; z-index:1;">👨💻 GitHub仓库</span>
                      <div style="position:absolute; inset:0; background:linear-gradient(45deg, transparent, rgba(255,255,255,0.15));"></div>
                  </a>
                  
                  <!-- 赞赏按钮（菲茨定律优化） -->
                  <a href="https://zjxweb.github.io/#/pay" 
                    class="cta-button"
                    style="--hue: 0;
                            display:inline-flex; 
                            align-items:center; 
                            gap:0.8rem; 
                            padding:0.8rem 2rem; 
                            background:linear-gradient(45deg, hsl(0, 100%, 60%), hsl(20, 100%, 60%)); 
                            color:white; 
                            border-radius:10px; 
                            text-decoration:none;
                            transition:transform 0.2s ease;
                            box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                      ❤️ 支持创作 <span style="font-size:0.9em; opacity:0.9;">+1,234</span>
                  </a>
              </div>
          </div>

          <!-- 微交互效果 -->
          <style>
              .action-card:hover {
                  transform: translateY(-3px);
                  box-shadow:0 10px 20px -5px rgba(0,0,0,0.08);
              }
              
              .social-button:hover {
                  background:hsl(var(--hue), 89%, 40%);
                  transform: scale(1.02);
              }
              
              .cta-button:hover {
                  transform: scale(1.05) rotate(-2deg);
                  box-shadow:0 6px 12px -1px rgba(0,0,0,0.15);
              }
              
              @media (max-width: 640px) {
                  .action-grid {
                      grid-template-columns: 1fr;
                  }
              }
          </style>
      </footer>`
      ].join('');

      hook.afterEach(function (html) {
        return html + footer;
      });
    },
    function (hook) {
      hook.ready(function () {
        // 日期处理
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('zh-CN', options);

        // 文档数量统计
        fetch('../../sidebar.md')
          .then(response => response.text())
          .then(content => {
            const count = (content.match(/\*/g) || []).length;
            const cover = document.querySelector('.cover');
            if (cover) {
              cover.innerHTML = cover.innerHTML
                .replace('{{date}}', currentDate)
                .replace('{{docsify-updated-count}}', count);
            }
          });
      });
    }
  ],
  search: [
    '/',            // => /README.md
    '/guide',       // => /guide.md
    '/get-started', // => /get-started.md
    '/zh-cn/',      // => /zh-cn/README.md
  ],
  // 完整配置参数
  search: {
    maxAge: 86400000, // 过期时间，单位毫秒，默认一天
    paths: 'auto', // or 'auto'
    placeholder: '搜索',

    // 支持本地化
    placeholder: {
      '/zh-cn/': '搜索',
      '/': 'search'
    },

    noData: 'No Results!',

    // 支持本地化
    noData: {
      '/zh-cn/': '找不到结果',
      '/': 'No Results'
    },

    // 搜索标题的最大层级, 1 - 6
    depth: 6,

    hideOtherSidebarContent: false, // 是否隐藏其他侧边栏内容

    // 避免搜索索引冲突
    // 同一域下的多个网站之间
    namespace: 'website-1',

    // 使用不同的索引作为路径前缀（namespaces）
    // 注意：仅适用于 paths: 'auto' 模式
    //
    // 初始化索引时，我们从侧边栏查找第一个路径
    // 如果它与列表中的前缀匹配，我们将切换到相应的索引
    pathNamespaces: ['/zh-cn', '/ru-ru', '/ru-ru/v1'],

    // 您可以提供一个正则表达式来匹配前缀。在这种情况下，
    // 匹配到的字符串将被用来识别索引
    pathNamespaces: /^(\/(zh-cn|ru-ru))?(\/(v1|v2))?/
  }
}