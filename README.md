# Getting Started
First, make sure you install any NodeJS dependencies:
```bash
npm i
```

Then, ensure that you have the backend server running locally or are proxying to the backend service. Then start by running these commands in parallel:
 - `npm run watch-css`
 - `npm run watch-docs`
 - `npm run start`

You may need to login to the site first by goign to `http://localhost:3001/auth/github` (assuming the backend is running on port `3001`).

Before you PR make sure to run `npm run build` and check for errors!

The second command will open your browser to the local development server and you're off to the races. Change files locally to make changes!