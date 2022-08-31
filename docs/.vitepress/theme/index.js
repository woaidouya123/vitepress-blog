import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './layout.vue'

export default {

    ...DefaultTheme,
    Layout,
//   enhanceApp({ app }) {
    // app.component('HtmlContainer', HtmlContainer)
//   }
}
