window.$docsify = { 
    el: '#app',
    routerMode: 'hash',
    auto2top: true,//切换页面后是否自动跳转到页面顶部。
    mergeNavbar: true,//小屏设备下合并导航栏到侧边栏。
    // repo: 'https://github.com/zjxWeb/zjxWeb.github.io',
    loadSidebar: 'sidebar.md',
    loadNavbar: true,
    coverpage: 'cover.md',
    onlyCover: true,
    autoHeader: true,
    notFoundPage: true,//在找不到指定页面时加载_404.md
    subMaxLevel: 4,
    search: 'auto', // seach默认值
    //字数统计
    count:{
      countable:true,
      fontsize:'0.9em',
      color:'rgb(90,90,90)',
      language:'chinese'
    },
    // tab
    tabs: {
      persist    : false,      // default // 默认打开一个
      sync       : false,      // default确定选项卡选择是否将在具有匹配标签的选项卡之间同步。
      theme      : 'classic', // default
      tabComments: true,      // default
      tabHeadings: true       // default
    },
    //脚注
    plugins: [
      function (hook) {
        debugger
        var footer = [
          '<hr/>',
          '<footer>',
            '<div class="thanks">',
              '<p style="font-size:18px;font-weight:600; margin:12px 0; line-height:1.6; text-align:left;">感谢您的阅读与支持！若本文对您有所帮助，欢迎：</p>',
              '<ul style="padding-left:20px; margin:0;">',
                '<li style="margin:4px 0;">⭐ <strong>点赞收藏</strong> - 您的认可是我持续分享的动力</li>',
                '<li style="margin:4px 0;">🐛 <strong>问题反馈</strong> - 欢迎在评论区留言指正或提出优化建议</li>',
                '<li style="margin:4px 0;">☕ <strong>支持作者</strong> - 可通过 <a href="https://zjxweb.github.io/#/pay" target="_blank">点击🖱 赞赏支持创作</a></li>',
                '<li style="margin:4px 0;">💼 <strong>定制开发</strong> - 如需个性化功能开发，欢迎通过邮箱联系 <a href="mailto:agonytriumph@163.com">agonytriumph@163.com</a></li>',
              '</ul>',
            '</div>',
           '<span>',
              '<a href="https://github.com/zjxWeb/zjxWeb.github.io" target="_blank">',
                'GitHub 仓库【别忘了 ⭐⭐⭐】',
              '</a>',
              ' &copy; 拼搏的小浣熊 || ',
            '</span>',
            '<span>',
              '赞赏：<a href="https://zjxweb.github.io/#/pay" target="_blank">😊👉点这👈😊</a>.',
            '</span>',
          '</footer>'
        ].join('');

        hook.afterEach(function (html) {
          return html + footer;
        });
      },
      function(hook) {
        hook.ready(function() {
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
    search : [
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