module.exports = {
  title: 'Do Not Go Gentle Into That Good Night',
  description: 'Rage, rage against the dying of the light.',
  base: '/blog/',
  themeConfig: {
    siteTitle: false,
    logo: '/favicon.ico',
    nav: [
      { text: 'LeetCode', link: '/articles/leetcode/index' },
      { text: '前端笔记', link: '/articles/frontend/index' },
      { text: '杂七杂八', link: '/articles/others/index' },
      {
        text: '我的站点',
        items: [
          { text: 'FreshRSS', link: 'https://487lq34228.oicp.vip/' },
          { text: 'Jupyter', link: 'https://487lq34228.oicp.vip/jupyter' },
          { text: 'Jenkins', link: 'https://487lq34228.oicp.vip/jenkins/' },
          { text: 'Pi-Dashboard', link: 'https://487lq34228.oicp.vip/pi-dashboard/' },
        ],
      },
    ],
  },
}
