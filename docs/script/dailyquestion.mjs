import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const url = 'https://leetcode.cn/graphql/';
const userName = 'woaidouya123';

// 获取最近题解
const recentSolutionParams = (userSlug) => ({
    query: `query profileSolutionArticles($userSlug: String!, $skip: Int, $first: Int) {
        solutionArticles(userSlug: $userSlug, skip: $skip, first: $first) {
            pageInfo {
            hasNextPage
            }
            edges {
            node {
                title
                slug
                createdAt
                question {
                titleSlug
                translatedTitle
                questionFrontendId
                }
                upvoteCount
                topic {
                viewCount
                }
            }
            }
        }
    }`,
    variables: { userSlug },
});

// 获取题目
const questionParams = (titleSlug) => ({
    operationName: "questionData",
    query: `query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          categoryTitle
          boundTopicId
          title
          titleSlug
          content
          translatedTitle
          translatedContent
          isPaidOnly
          difficulty
          likes
          dislikes
          isLiked
          similarQuestions
          contributors {
            username
            profileUrl
            avatarUrl
            __typename
          }
          langToValidPlayground
          topicTags {
            name
            slug
            translatedName
            __typename
          }
          companyTagStats
          codeSnippets {
            lang
            langSlug
            code
            __typename
          }
          stats
          hints
          solution {
            id
            canSeeDetail
            __typename
          }
          status
          sampleTestCase
          metaData
          judgerAvailable
          judgeType
          mysqlSchemas
          enableRunCode
          envInfo
          book {
            id
            bookName
            pressName
            source
            shortDescription
            fullDescription
            bookImgUrl
            pressImgUrl
            productUrl
            __typename
          }
          isSubscribed
          isDailyQuestion
          dailyRecordStatus
          editorType
          ugcQuestionId
          style
          exampleTestcases
          jsonExampleTestcases
          __typename
        }
      }
      `,
    variables: { titleSlug },
});

// 获取题解
const articleParams = (slug) => ({
    operationName: "solutionDetailArticle",
    query: `query solutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {
        solutionArticle(slug: $slug, orderBy: $orderBy) {
          ...solutionArticle
          content
          question {
            questionTitleSlug
            __typename
          }
          position
          next {
            slug
            title
            __typename
          }
          prev {
            slug
            title
            __typename
          }
          __typename
        }
      }

      fragment solutionArticle on SolutionArticleNode {
        ipRegion
        rewardEnabled
        canEditReward
        uuid
        title
        slug
        sunk
        chargeType
        status
        identifier
        canEdit
        canSee
        reactionType
        reactionsV2 {
          count
          reactionType
          __typename
        }
        tags {
          name
          nameTranslated
          slug
          tagType
          __typename
        }
        createdAt
        thumbnail
        author {
          username
          profile {
            userAvatar
            userSlug
            realName
            __typename
          }
          __typename
        }
        summary
        topic {
          id
          commentCount
          viewCount
          __typename
        }
        byLeetcode
        isMyFavorite
        isMostPopular
        isEditorsPick
        hitCount
        videosInfo {
          videoId
          coverUrl
          duration
          __typename
        }
        __typename
      }
      `,
    variables: { orderBy: "DEFAULT", slug },
});

const options = {
    method: 'POST',
    url,
    headers: {},
};

// 获取最近的题解
const getRecentSolution = () => {
    return axios.request({
        ...options,
        data: recentSolutionParams(userName)
    }).then(res => {
        return res.data.data.solutionArticles.edges;
    })
}

// 获取题解
const getSolution = (slug) => {
    return axios.request({
        ...options,
        data: articleParams(slug)
    }).then(res => {
        return res.data.data.solutionArticle;
    })
}

// 获取题目
const getQuestion = (title) => {
    return axios.request({
        ...options,
        data: questionParams(title)
    }).then(res => {
        return res.data.data.question;
    })
}

// 写入文件
const generateMDFile = (data) => {
    const content = parseTemplate(data);
    const __dirname = path.resolve()
    const filePath = path.resolve(
        __dirname,
        `docs/articles/leetcode/notes/${data.title}.md`
    );
    fs.writeFileSync(
        filePath,
        content,
        {
            encoding: 'utf8',
        }
    );
}

const recentSolutins = await getRecentSolution();

const processQuestionText = (text) => {
    text = text.replace(/<([ =]+)/g, '&lt;$1');
    return text;
}

const parseTemplate = ({title, link, question, solution}) =>
`# [${title}](${link})

## 题目
${processQuestionText(question)}

## 题解
${solution}
`

for(let i=0; i<recentSolutins.length; i++){
    const question = await getQuestion(recentSolutins[i].node.question.titleSlug);
    const solution = await getSolution(recentSolutins[i].node.slug);
    generateMDFile({
        title: `${question.questionFrontendId}.${question.translatedTitle}`.replace(/\s/g, ''),
        link: `https://leetcode.cn/problems/${question.titleSlug}`,
        question: question.translatedContent,
        solution: solution.content
    })
}

const indexFileTemplate = (articles) => `# 算法笔记
${articles.map(v => '[' + v.title + '](' + v.link + ')').join('\n\r')}
`
// 写入索引文件
const generateIndexFile = () => {
    const __dirname = path.resolve();
    const dirPath = path.resolve(__dirname, `docs/articles/leetcode/notes/`);
    const articles = fs.readdirSync(dirPath).map(v => ({
        title: v.slice(0, -3),
        link: `./notes/${v}`
    }));;
    const filePath = path.resolve(
        __dirname,
        `docs/articles/leetcode/index.md`
    );
    fs.writeFileSync(
        filePath,
        indexFileTemplate(articles),
        {
            encoding: 'utf8',
        }
    );
}

generateIndexFile();

