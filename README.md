## Texdit for Reddit

A reddit post fetcher app in [React Native](https://reactnative.dev/) - expo

Currently fetches only the default/best page. Subreddits can be added to the subreddits array in `./HomeComponents.js`

Also fetches the comments and replies upto a certain level, which can be changed.

The loading is async, and it's much faster than before.

Fetches the thumbnail in the frontpage, and the full picture after you click on the post. The goal was to only fetch the text post (as indicated by the name of this app, but ehh why not)

<img src='https://i.redd.it/ebe8sh0vs6d51.png' width=180 />
<img src='https://i.redd.it/2e109kmks6d51.png' width=180 />
<img src='https://i.redd.it/i5ykdubns6d51.png' width=180 />
<img src='https://i.redd.it/31acno7tt6d51.png' width=180 />

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