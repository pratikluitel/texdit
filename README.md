## Texdit for Reddit

An ad free reddit post fetcher app in [React Native](https://reactnative.dev/) - expo

Fetches the thumbnail in the frontpage, and the full picture after you click on the post. The goal was to only fetch text posts (as indicated by the name of this app, but ehh why not overdeliver)

All replies are currently not fetched (there were some performace issues, which will be fixed soon), you can adjust the reply depth in `components/CommentsComponent.js`, just modify the `max_reply_depth` variable

<div style="display: flex; margin-bottom:20px">
<img src='https://i.redd.it/ebe8sh0vs6d51.png' width=180 />
<img src='https://i.redd.it/mbrdgq0qf1e51.png' width=180 />
<img src='https://i.redd.it/i5ykdubns6d51.png' width=180 />
<img src='https://i.redd.it/s857gc1sg1e51.png' width=180 />
</div>



Minimal styling for now, will focus on it after the basic functionality is completed.

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