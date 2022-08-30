import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

// 获取最近题解
// let url = 'https://leetcode.cn/graphql/';
// let graphqlQuery = {
//     query: `query profileSolutionArticles($userSlug: String!, $skip: Int, $first: Int) {
//         solutionArticles(userSlug: $userSlug, skip: $skip, first: $first) {
//             pageInfo {
//             hasNextPage
//             }
//             edges {
//             node {
//                 title
//                 slug
//                 createdAt
//                 question {
//                 titleSlug
//                 translatedTitle
//                 questionFrontendId
//                 }
//                 upvoteCount
//                 topic {
//                 viewCount
//                 }
//             }
//             }
//         }
//     }`,
//     variables: { userSlug: 'woaidouya123' },
// }
// const options = {
//     method: 'POST',
//     url,
//     headers: {},
//     data: graphqlQuery,
// };

// axios.request(options).then(res => {
//     const data = res.data.data.solutionArticles.edges;
//     console.log(data);
// })

// 获取题解内容
// let url = 'https://leetcode.cn/graphql/';
// let graphqlQuery = {
//     operationName: "solutionDetailArticle",
//     query: `query solutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {
//         solutionArticle(slug: $slug, orderBy: $orderBy) {
//           ...solutionArticle
//           content
//           question {
//             questionTitleSlug
//             __typename
//           }
//           position
//           next {
//             slug
//             title
//             __typename
//           }
//           prev {
//             slug
//             title
//             __typename
//           }
//           __typename
//         }
//       }

//       fragment solutionArticle on SolutionArticleNode {
//         ipRegion
//         rewardEnabled
//         canEditReward
//         uuid
//         title
//         slug
//         sunk
//         chargeType
//         status
//         identifier
//         canEdit
//         canSee
//         reactionType
//         reactionsV2 {
//           count
//           reactionType
//           __typename
//         }
//         tags {
//           name
//           nameTranslated
//           slug
//           tagType
//           __typename
//         }
//         createdAt
//         thumbnail
//         author {
//           username
//           profile {
//             userAvatar
//             userSlug
//             realName
//             __typename
//           }
//           __typename
//         }
//         summary
//         topic {
//           id
//           commentCount
//           viewCount
//           __typename
//         }
//         byLeetcode
//         isMyFavorite
//         isMostPopular
//         isEditorsPick
//         hitCount
//         videosInfo {
//           videoId
//           coverUrl
//           duration
//           __typename
//         }
//         __typename
//       }
//       `,
//     variables: { orderBy: "DEFAULT", slug: 'by-woaidouya123-799z' },
// }
// const options = {
//     method: 'POST',
//     url,
//     headers: {},
//     data: graphqlQuery,
// };

// axios.request(options).then(res => {
//     const data = res.data.data.solutionArticle;
//     console.log(data);
// }).catch(err => {
//     console.log(err.code);
// })

// 获取题目
let url = 'https://leetcode.cn/graphql/';
let graphqlQuery = {
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
    variables: { titleSlug: "solve-the-equation" },
}
const options = {
    method: 'POST',
    url,
    headers: {},
    data: graphqlQuery,
};

axios.request(options).then(res => {
    const data = res.data.data.question;
    console.log(data);
}).catch(err => {
    console.log(err.code);
})
