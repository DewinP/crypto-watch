# Crypto Watch

This is a simple application that allows you to track the value of a cryptocurrency and allows you to like and share the value of the cryptocurrency.

# Functionalities

As a guest/unathorized user, they can

- See top 100 cryptocurrencies by market cap
- Sort the cryptocurrencies by market cap and price
- Search for a cryptocurrency by name
- See the value of a cryptocurrency and a graph of the value over time

A logged in user can

- Do the same as a guest user
- Like a cryptocurrency and sort the cryptocurrencies by likes

# Technologies Used

Front-End:

- React
- Redux Toolkit
- Redux Toolkit Query
- Nextjs
- Chakra UI
- ReCharts

Back-End:

- Express
- MongoDB
- JWT (JSON Web Token)
- Node

# Installation

To get this project ot run localy, download or clone this repository. You should now have two folders `frontend` and `backend`.

To install the `backend` run the fallowing commands in the command line, from the root directory.

```
$ cd backend
$ npm i or npm install
$ cd config
- visit mongodb.com and create a database and make sure you add you whitelist your ip address so that you can access your database.
- open the `default.ts` file and add/change the variables according to your liking.
```

To run the `backend` server.

```
$ npm run dev
 -code will run in the port on the localhost:1337, unless changed in the `config.ts` file.
```

To setup and run the `frontend` run the fallowing commands in the command line, from the root directory.

```
$ cd frontend
$ npm i or npm install
$ npm run dev
```

# Screenshots and GIFs of fully responsive website:

###### Gif of user flow:

![crytop watch](https://user-images.githubusercontent.com/62264413/147864847-ca103531-28ec-4a84-a04d-c7e5db41c893.gif)

###### Landing Page

| Guest View                                | Logged In View                               |
| ----------------------------------------- | -------------------------------------------- |
| ![guest](https://i.imgur.com/1uEZbrW.png) | ![loggedin](https://i.imgur.com/O5kasWW.png) |

###### Coin Page

| Guest View                                | Logged In View                               |
| ----------------------------------------- | -------------------------------------------- |
| ![guest](https://i.imgur.com/NRijIEM.png) | ![loggedin](https://i.imgur.com/57zkdWS.png) |

###### Login and Signup Page:

| Login Page                                     | SignupPage                                      |
| ---------------------------------------------- | ----------------------------------------------- |
| ![login page](https://i.imgur.com/XYe5o2u.png) | ![signup page](https://i.imgur.com/J1t51Fu.png) |
