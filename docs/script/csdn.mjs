import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { load } from 'cheerio';

const url = 'https://blog.csdn.net/woaidouya123/category_7913688.html';

const articleUrls = await axios.get(url).then(res => {
    const $ = load(res.data);
    const articles = $(".column_article_list > li");
    let urls = [];
    articles.map(function(){
        const article = $(this);
        const url = article.find('a')[0].attribs.href;
        urls.push(url);
    })
    return urls;
})

const processText = (text) => {
    // 格式处理
    text = text.replace(/\n+[\s\t]*\n+/g, '\n');
    // 代码处理
    text = text.replace(/<pre.*?><code class="language-(.+)">((.|\n)*?)<\/code><\/pre>/g, '\n```$1\n$2\n```');
    text = text.replace(/<pre.*?><code.*?>((.|\n)*?)<\/code><\/pre>/g, '\n```\n$1\n```');
    // html转义处理
    const codeBlocks = text.match(/```(.|\n)*?```/g);
    codeBlocks && codeBlocks.forEach(code => {
        text = text.replace(code, code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' '))
    })
    return text;
}

const articleTemplate = ({title, content, link}) =>
`# [${title}](${link})
${content}
`

await Promise.all(articleUrls.map(artUrl => {
    return axios.get(artUrl).then(res => {
        const $ = load(res.data);
        const title = $("#articleContentId").html().replace(/\s/g, '').replace(/[+]/g, '')
        const content = processText($("#content_views").html().trim())
        const __dirname = path.resolve()
        const filePath = path.resolve(
            __dirname,
            `docs/articles/frontend/notes/${title}.md`
        );
        fs.writeFileSync(
            filePath,
            articleTemplate({title, content, link: artUrl}),
            {
                encoding: 'utf8',
            }
        );
    })
}))

const indexFileTemplate = (articles) => `# 前端笔记
${articles.map(v => '[' + v.title + '](' + v.link + ')').join('\n\r')}
`
// 写入索引文件
const generateIndexFile = () => {
    const __dirname = path.resolve();
    const dirPath = path.resolve(__dirname, `docs/articles/frontend/notes/`);
    const articles = fs.readdirSync(dirPath).map(v => ({
        title: v.slice(0, -3),
        link: `./notes/${v}`
    }));;
    const filePath = path.resolve(
        __dirname,
        `docs/articles/frontend/index.md`
    );
    fs.writeFileSync(
        filePath,
        indexFileTemplate(articles),
        {
            encoding: 'utf8',
        }
    );
}

generateIndexFile()
