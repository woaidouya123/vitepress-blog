import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { load } from 'cheerio';

const csdnUrls = [
    {
        name: '前端笔记',
        base: 'frontend',
        url: 'https://blog.csdn.net/woaidouya123/category_7913688.html',

    },
    {
        name: '杂七杂八',
        base: 'others',
        url: 'https://blog.csdn.net/woaidouya123/category_7550314.html'
    }
]

const charTrans = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&times;': '×',
    '&divide;': '÷'
}

const processText = (text) => {
    // 格式处理
    text = text.replace(/\n+[\s\t]*\n+/g, '\n');
    // 代码处理
    text = text.replace(/<code class="language-plain">/g, '<code>');
    text = text.replace(/<pre.*?><code class="language-(.+)">((.|\n)*?)<\/code><\/pre>/g, '\n```$1\n$2\n```');
    text = text.replace(/<pre.*?><code.*?>((.|\n)*?)<\/code><\/pre>/g, '\n```\n$1\n```');
    // html转义处理
    const codeBlocks = text.match(/```(.|\n)*?```/g);
    codeBlocks && codeBlocks.forEach(code => {
        let s = code;
        Object.entries(charTrans).forEach(([key, value]) => {
            s = s.replace(new RegExp(key, 'g'), value);
        })
        text = text.replace(code, s);
    })
    return text;
}

const articleTemplate = ({ title, content, link }) =>
    `# [${title}](${link})
${content}
`

const indexFileTemplate = (title, articles) => `# ${title}
${articles.map(v => '[' + v.title + '](' + v.link + ')').join('\n\r')}
`
// 写入索引文件
const generateIndexFile = (name, base) => {
    const __dirname = path.resolve();
    const dirPath = path.resolve(__dirname, `docs/articles/${base}/notes/`);
    const articles = fs.readdirSync(dirPath).map(v => ({
        title: v.slice(0, -3),
        link: `./notes/${v}`
    }));;
    const filePath = path.resolve(
        __dirname,
        `docs/articles/${base}/index.md`
    );
    fs.writeFileSync(
        filePath,
        indexFileTemplate(name, articles),
        {
            encoding: 'utf8',
        }
    );
}

const getCSDNArticles = async ({ name, base, url }) => {
    const articleUrls = await axios.get(url).then(res => {
        const $ = load(res.data);
        const articles = $(".column_article_list > li");
        let urls = [];
        articles.map(function () {
            const article = $(this);
            const url = article.find('a')[0].attribs.href;
            urls.push(url);
        })
        return urls;
    }).catch(err => {
        console.error(err);
    })

    await Promise.all(articleUrls.map(artUrl => {
        return axios.get(artUrl).then(res => {
            const $ = load(res.data);
            const title = $("#articleContentId").html().replace(/\s/g, '').replace(/[+]/g, '')
            const content = processText($("#content_views").html().trim())
            const __dirname = path.resolve()
            const filePath = path.resolve(
                __dirname,
                `docs/articles/${base}/notes/${title}.md`
            );
            fs.writeFileSync(
                filePath,
                articleTemplate({ title, content, link: artUrl }),
                {
                    encoding: 'utf8',
                }
            );
        })
    })).catch(err => {
        console.error(err);
    })
    generateIndexFile(name, base);
}

for (let i = 0; i < csdnUrls.length; i++) {
    await getCSDNArticles(csdnUrls[i]);
}
