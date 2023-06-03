# Shop REST API server documentations

----

1. **This is a full-stack application, the client app is located [here](https://github.com/mykola-kond-73/shop).**

2. **Here used express**

3. **Server start on *localhost:8000***

4. **Using NO SQL dtabase Mongodb in the cloud**

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

This command starts the server on the port specified in the corresponding environment variable. This variable can be specified in the .env file

### `yarn run build`

This command starts webpack, which builds the project into the build folder

### `yarn run debug`

This command starts the server in debug mode

### `yarn run startpm2`

This command starts the server using the pm2 process manager. The launch is based on the ecosystem.config.js configuration file

### `yarn run ts`

This command starts tsc. The dist folder is created.

### `yarn run ts:w`

This command starts tsc in watch mode. The dist folder is created and the creation process is displayed on the screen.

### `yarn run lint`

This command starts eslint. All project files are passed through eslint, which finds inconsistencies in code writing style, according to the .eslintrc.yml file. All found inconsistencies are displayed on the screen after execution of the command.

### `yarn run lint:fix`

This command starts eslint. All project files are passed through eslint, which finds inconsistencies in code writing style, according to the .eslintrc.yml file. All found inconsistencies that eslint can correct, it corrects itself.

# `.env file`
In .env file musst be kyes:

`PORT` - the port on which the server starts (8000)

`NODE_ENV` - mode (development, production)
`DB_PASS` - database password
`DB_USER` - database user
`DB_DATABASE` - database name
`JWT_ACCESS_TOKEN` - secret key for the access token
`JWT_REFRESH_TOKEN` - secret key for the refresh token
`API_URL` - (http://localhost:8000)