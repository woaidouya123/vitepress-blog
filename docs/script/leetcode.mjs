import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import moment from 'moment'
import { lcDifficultyMap } from '../utils/data.js'

const url = 'https://leetcode.cn/graphql/'
const submitQueryUrl = 'https://leetcode.cn/graphql/noj-go/'
const userName = 'woaidouya123'

const params = process.argv

// 图片代理(需要代理服务器进行相应配置)
const proxy = (params.find((v) => v.startsWith('--proxy=')) || '--proxy=').slice(8)

// 获取近一年提交
const queryYearSubmit = (userSlug) => ({
  query: `query userProfileCalendar($userSlug: String!, $year: Int) {
        userCalendar(userSlug: $userSlug, year: $year) {
            streak
            totalActiveDays
            submissionCalendar
        }
    }`,
  variables: { userSlug },
})

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
})

// 获取题目
const questionParams = (titleSlug) => ({
  operationName: 'questionData',
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
})

// 获取题解
const articleParams = (slug) => ({
  operationName: 'solutionDetailArticle',
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
  variables: { orderBy: 'DEFAULT', slug },
})

const options = {
  method: 'POST',
  url,
  headers: {},
}

const submitOptions = {
  method: 'POST',
  url: submitQueryUrl,
  headers: {},
}

// 获取近一年提交数据
const generageYearSubmitFile = () => {
  return axios
    .request({
      ...submitOptions,
      data: queryYearSubmit(userName),
    })
    .then((res) => {
      const data = res.data.data
      const __dirname = path.resolve()
      const filePath = path.resolve(__dirname, 'docs/data/lcData.json')
      fs.writeFileSync(filePath, JSON.stringify(data), {
        encoding: 'utf8',
      })
    })
}

// 获取最近的题解
const getRecentSolution = () => {
  return axios
    .request({
      ...options,
      data: recentSolutionParams(userName),
    })
    .then((res) => {
      return res.data.data.solutionArticles.edges
    })
}

// 获取题解
const getSolution = (slug) => {
  return axios
    .request({
      ...options,
      data: articleParams(slug),
    })
    .then((res) => {
      return res.data.data.solutionArticle
    })
}

// 获取题目
const getQuestion = (title) => {
  return axios
    .request({
      ...options,
      data: questionParams(title),
    })
    .then((res) => {
      return res.data.data.question
    })
}

// 写入文件
const generateMDFile = (data) => {
  const content = parseTemplate(data)
  const __dirname = path.resolve()
  const filePath = path.resolve(__dirname, `docs/articles/leetcode/notes/${data.title}.md`)
  fs.writeFileSync(filePath, content, {
    encoding: 'utf8',
  })
}

const recentSolutins = await getRecentSolution()

const processQuestionText = (text) => {
  // 格式处理
  text = text
    .replace(/<([ =]+)/g, '&lt;$1')
    .replace(/\t/g, '  ')
    .replace(/<(\/)?font.*?>/g, '')
  // 图片代理
  proxy && (text = text.replace(/(src=")(http(s)?:\/\/.*?\.(png|gif|jpeg))/g, `$1${proxy}?url=$2`))
  return text
}

const parseTemplate = ({ title, link, question, solution, time, tags, difficulty, diffName }) =>
  `# [${title}](${link})
<span class="diff diff-${difficulty.toLowerCase()}">${diffName}</span>
${time} ${tags.map((v) => `\`${v}\``).join(' ')}
## 题目
${processQuestionText(question)}

## 题解
${solution}
`

const articleDir = []

for (let i = 0; i < recentSolutins.length; i++) {
  const question = await getQuestion(recentSolutins[i].node.question.titleSlug)
  const solution = await getSolution(recentSolutins[i].node.slug)
  const title = `${question.questionFrontendId}.${question.translatedTitle}`.replace(/\s/g, '')
  const time = moment(solution.createdAt).format('YYYY-MM-DD HH:mm:ss')
  const tags = solution.tags.map((v) => v.nameTranslated || v.name || v.slug)
  const difficulty = question.difficulty
  const diffName = lcDifficultyMap[question.difficulty].translateName
  generateMDFile({
    title,
    link: `https://leetcode.cn/problems/${question.titleSlug}`,
    question: question.translatedContent,
    solution: solution.content,
    time,
    tags,
    difficulty,
    diffName,
  })
  articleDir.push({
    title,
    link: `./notes/${title}`,
    time,
    tags,
    difficulty,
    diffName,
  })
}

articleDir.sort((a, b) => moment(b.time).valueOf() - moment(a.time).valueOf())

// 写入目录数据存储文件
const generateLcArticleJson = (content) => {
  const __dirname = path.resolve()
  const filePath = path.resolve(__dirname, 'docs/data/lcArticles.json')
  fs.writeFileSync(filePath, content, {
    encoding: 'utf8',
  })
}

generateLcArticleJson(JSON.stringify(articleDir))
generageYearSubmitFile()
