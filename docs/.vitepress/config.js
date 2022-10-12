import { customElements } from "../utils/data"
module.exports = {
  title: 'Do Not Go Gentle Into That Good Night',
  description: 'Rage, rage against the dying of the light.',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css', crossorigin: '' }]
  ],
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
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-katex'))
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  }
}
