import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

let url = 'https://leetcode.cn/graphql/noj-go/';
let graphqlQuery = {
    query: `query userProfileCalendar($userSlug: String!, $year: Int) {
        userCalendar(userSlug: $userSlug, year: $year) {
            streak
            totalActiveDays
            submissionCalendar
        }
    }`,
    variables: { userSlug: 'woaidouya123' },
}
const options = {
    method: 'POST',
    url,
    headers: {},
    data: graphqlQuery,
};

axios.request(options).then(res => {
    const data = res.data.data;
    const __dirname = path.resolve()
    const filePath = path.resolve(
        __dirname,
        `docs/data/lcData.json`
    );
    fs.writeFileSync(
        filePath,
        JSON.stringify(data),
        {
            encoding: 'utf8',
        }
    );
})
