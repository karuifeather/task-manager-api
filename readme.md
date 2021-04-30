# Task Manager App

Built using Node, Express and MongoDB, is this little Task Manager app, packed with user authentication and basic authorization along with features like handling images.

It is a pure backend project. To test the routes, you'll have to use Postman or similar software.

[TOC]

## Usage

- Download the repo
- Cd into the local project directory
- Run `npm run dev`

## Routes

The following is in no way a proper documentation for an API but instead aims to provide a high-level overview of the available rotutes. You'll have to start looking at the code for proper usage of the app.

- User routes `/users`

| Method | Path           | Description                              |
| ------ | -------------- | ---------------------------------------- |
| POST   | `/ `           | Create an account                        |
| POST   | `/login `      | Login                                    |
| POST   | `/logout `     | Logout from the current signed in device |
| POST   | `/logoutAll`   | Logout from all the signed in devices    |
| GET    | `/me `         | Get profile of current user              |
| PATCH  | `/me`          | Update current user data                 |
| DELETE | `/me `         | Delete current user                      |
| POST   | `/me/avatar `  | Upload avatar                            |
| DELETE | `/me/avatar `  | Delete avatar                            |
| GET    | `/:id/avatar ` | Get user avatar by id                    |

- Task routes `/tasks`

  Please note that the following routes are all protected.

| Method | Path   | Description                            |
| ------ | ------ | -------------------------------------- |
| POST   | `/`    | Create a task                          |
| GET    | `/`    | Get tasks [for query params see below] |
| GET    | `/:id` | Get task by id                         |
| PATCH  | `/:id` | Update task by id                      |
| DELETE | `/:id` | Delete task by id                      |

- `GET /tasks` supports the following parameters: 
  	- limit: number 
  	- page: number 
  	- completed: boolean 
  	- sortBy = fieldName[:order], eg: `/tasks?sortBy=createdAt:d`

## Scripts

- `npm run dev` starts the server in development mode
- `npm start` starts the server in production mode
- `npm test` to run tests

## Environment Variables

### .env

Create `.env` file in the project root and define these variables:

```
SENDGRID_API_KEY=insert_string
PORT=insert_port
MONGODB_URL=insert_mongodb_uri
JWT_SECRET=insert_your_jwt_secret
```

### test.env

To run the tests, create `test.env` in the project root and define these variables:

```
SENDGRID_API_KEY=insert_string
PORT=insert_port
MONGODB_URL=insert_mongodb_uri
JWT_SECRET=insert_your_jwt_secret
```

**_Note_**:

- that SENDGRID_API_KEY is not used during tests but it must be defined.
- that MONGODB_URL is recommended to be different from your other environments
  - you can setup a local mongodb server and use its uri like so: `MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test`
