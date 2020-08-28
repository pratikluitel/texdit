import './appInfo'
import appInfo from './appInfo'
export const baseurl = !appInfo.loggedIn?'https://www.reddit.com':'https://oauth.reddit.com'