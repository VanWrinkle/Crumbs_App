# Crumbs API

## Instructions

- React and Express are built as separate projects for now
- At first deployment: Execute `npm install` in both projects.
- Certificate `server.crt` and private key `private-key.pem` must be present in the root directory of the express
- Starting express with `npm start` will also trigger a production build of the React project. 
- The service does not reflect changes to React. Express must either be restarted to trigger a new build or manually
executing `npm start build` from the client directory.

## Usage


