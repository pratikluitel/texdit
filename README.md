## Texdit for Reddit

An ad free reddit post fetcher app in [React Native](https://reactnative.dev/) - expo, with all the usual reddit features - sorting posts, comments, et al. except of course the sign in feature - which is coming soon, so yayy??

Fetches the thumbnail in the frontpage, and the full picture after you click on the post. The goal was to only fetch text posts (as indicated by the name of this app, but ehh why not overdeliver)

All replies are currently not fetched (there were some performace issues, which will be fixed soon), you can adjust the reply depth in `components/CommentsComponent.js`, just modify the `max_reply_depth` variable

<div style="display: flex;justify-content: space-between; margin-bottom:20px">
    <img src='https://i.redd.it/o6ap4za08ze51.png' width=180 />
    <img src='https://i.redd.it/tgkdd2rq9ze51.png' width=180 />
    <img src='https://i.redd.it/45gv2jyn7ze51.png' width=180 />
</div>

Has only the dark theme for now, more themes to be added later.

---

#### Running in your system

1. Install the [npm package manager](https://www.npmjs.com/) and [yarn package manager](https://yarnpkg.com/). Yarn is optional.

2. Clone the repo
   `git clone https://github.com/pratikluitel/texdit`

3. Install dependencies
   `yarn` if you're using yarn or
   `npm i` if you're using npm

4. Run `yarn start` or `npm start` to run the expo client.

5. Install the [expo app](https://expo.io/tools#client) on your phone, and follow the instructions.

---
