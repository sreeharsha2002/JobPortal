# Node Should be Installed

## To tun the app u should Install some dependencies.

For run

- Set `mongoURI` in `./backend/config/default.json` to the mongo uri of DB. Set the secret for authentication middleware also in the same file.

- Run mongo if doing locally or give the atlas URI in config.
-

- Open one shell/ terminal window in the folder
  - `cd backend`
  - `npm install`
  - `npm i bcryptjs config express express-validator jsonwebtoken mongoose word-count`
  - `npm run start`
- Open another shell/ terminal window in the folder
  - `cd frontend`
  - `npm install`
  - `npm axios fuse.js moment react react-dom react-moment react-redux react-router-dom react-scripts redux redux-devtools-extension redux-thunk uuid`
  - Either do `npm run start` to run using node or `npm run server` to run using nodemon

> Navigate to localhost:3000/ in your browser.
