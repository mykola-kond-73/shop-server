# Shop REST API server documentations

## Available Scripts

In the project directory, you can run:

### `npm start`

This command starts the server on the port specified in the corresponding environment variable. This variable can be specified in the .env file

### `npm run build`

This command starts webpack, which builds the project into the build folder

### `npm run debug`

This command starts the server in debug mode

### `npm run startpm2`

This command starts the server using the pm2 process manager. The launch is based on the ecosystem.config.js configuration file

### `npm run ts`

This command starts tsc. The dist folder is created.

### `npm run ts:w`

This command starts tsc in watch mode. The dist folder is created and the creation process is displayed on the screen.

### `npm run lint`

This command starts eslint. All project files are passed through eslint, which finds inconsistencies in code writing style, according to the .eslintrc.yml file. All found inconsistencies are displayed on the screen after execution of the command.

### `npm run lint:fix`

This command starts eslint. All project files are passed through eslint, which finds inconsistencies in code writing style, according to the .eslintrc.yml file. All found inconsistencies that eslint can correct, it corrects itself.