# mosh-vidly-node

App created during Ultimate Node course from Code with Mosh

## Running server

In order to run server just use this command:
```
node index.js
```

With `nodemon` package installed locally you can run the server with auto-reload on change like this:
```
nodemon index.js
```

By default server will be listening on port 3000 unless you provide different port in `process.env.PORT` variable.

In order to run the server correctly `vidly_jwtPrivateKey` environment variable needs to be set on your machine.
An example of setting the variable for mac:
```
export vidly_jwtPrivateKey=testPrivateKey
```
