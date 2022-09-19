import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import { load } from 'cheerio'
import moment from 'moment'

const csdnUrls = [
  {
    name: '前端笔记',
    base: 'frontend',
    url: 'https://blog.csdn.net/woaidouya123/category_7913688.html',
    output: 'docs/data/csdnFront.json',
  },
  {
    name: '杂七杂八',
    base: 'others',
    url: 'https://blog.csdn.net/woaidouya123/category_7550314.html',
    output: 'docs/data/csdnOthers.json',
  },
]

const charTrans = {
  '&nbsp;': ' ',
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&quot;': '"',
  '&apos;': "'",
  '&times;': '×',
  '&divide;': '÷',
}

const processText = (text) => {
  // 格式处理
  text = text.replace(/\n+[\s\t]*\n+/g, '\n')
  // 代码处理
  text = text.replace(/<code class="language-plain">/g, '<code>')
  text = text.replace(/<pre.*?><code class="language-(.+)">((.|\n)*?)<\/code><\/pre>/g, '\n```$1\n$2\n```')
  text = text.replace(/<pre.*?><code.*?>((.|\n)*?)<\/code><\/pre>/g, '\n```\n$1\n```')
  // html转义处理
  const codeBlocks = text.match(/```(.|\n)*?```/g)
  codeBlocks &&
    codeBlocks.forEach((code) => {
      let s = code
      Object.entries(charTrans).forEach(([key, value]) => {
        s = s.replace(new RegExp(key, 'g'), value)
      })
      text = text.replace(code, s)
    })
  return text
}

const articleTemplate = ({ title, content, link, time, tags }) =>
  `# [${title}](${link})
${time} ${tags.map((v) => `\`${v}\``).join(' ')}

---
${content}
`

// 写入目录数据存储文件
const generateDirJson = (file, content) => {
  const __dirname = path.resolve()
  const filePath = path.resolve(__dirname, file)
  fs.writeFileSync(filePath, content, {
    encoding: 'utf8',
  })
}

const getCSDNArticles = async ({ name, base, url, output }) => {
  const articleUrls = await axios
    .get(url)
    .then((res) => {
      const $ = load(res.data)
      const articles = $('.column_article_list > li')
      const articleList = []
      articles.map(function () {
        const article = $(this)
        const url = article.find('a')[0].attribs.href
        const desc = article.find('.column_article_desc')[0].children[0].data
        articleList.push({ url, desc })
        return url
      })
      return articleList
    })
    .catch((err) => {
      console.error(err)
    })

  const dirData = await Promise.all(
    articleUrls.map(({ url, desc }) => {
      return axios.get(url).then((res) => {
        const $ = load(res.data)
        const title = $('#articleContentId').html().replace(/\s/g, '').replace(/[+]/g, '')
        const content = processText($('#content_views').html().trim())
        const tags = $('.artic-tag-box a[data-report-click]')
          .map(function () {
            return $(this).html()
          })
          .toArray()
        const time = $('.time')
          .html()
          .trim()
          .match(/[0-9\s-:]+/)[0]
        const __dirname = path.resolve()
        const filePath = path.resolve(__dirname, `docs/articles/${base}/notes/${title}.md`)
        fs.writeFileSync(filePath, articleTemplate({ title, content, link: url, time, tags }), {
          encoding: 'utf8',
        })
        return {
          title,
          link: `./notes/${title}`,
          time,
          tags,
          desc,
        }
      })
    })
  ).catch((err) => {
    console.error(err)
  })
  dirData.sort((a, b) => moment(b.time).valueOf() - moment(a.time).valueOf())
  generateDirJson(output, JSON.stringify(dirData))
}

for (let i = 0; i < csdnUrls.length; i++) {
  await getCSDNArticles(csdnUrls[i])
}
