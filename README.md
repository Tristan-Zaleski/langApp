# langApp
Personal project to help practice web development conecepts as well as learn a new language.
Steps below are the quickest way to get the project going, with instructions based on
linux/mac/bash terminal usage

Everything Required:
- npm (Win) or brew (Mac) for package management
- Node JS for hosting website (I use nodemon in example)
- MongoDB Community Server for hosting data

Once cloned, app can be run as long as their is an active mongoDB running on the local machine
at default port 27017 pointed at a DB named langDB. Once database is up and running fully, node
can be used to host the backend, and new cards can be created to populate the site.

For Windows:
```
$ mongod
$ nodemon app.js
```

For macOS/Linux:
```
$ brew services start mongodb/brew/mongodb-community@5.0
$ nodemon app.js
```

Should report success on port 3000. Can visit at localhost:3000 on a browser.
