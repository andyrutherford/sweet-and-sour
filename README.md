# Sweet and Sour

An ecommerce app

<img src="./screenshots/1.png" width="600">
<img src="./screenshots/2.png" width="600">
<img src="./screenshots/3.png" width="600">
<img src="./screenshots/4.png" width="600">

## Features

- Add items to your shopping basket
- Leave ratings and reviews on products you have purchased
- Checkout and create an order
- Create an account and view your order history
- Admin account for managing Products, Users, Orders

## Setup

To run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

```sh
# Clone this repository
$ git clone

$ cd

$ npm install

# Create a .env file in the root directory with the following:
$ NODE_ENV=development
$ PORT=5000
$ MONGODB_URI=<your-mongodb-uri>
$ JWT_SECRET=<your-jwt-secret>
$ PAYPAL_CLIENT_ID=<your-paypal-id>
```

For the Paypal API Payment Sandbox to work, you will need to create the client ID [here](https://developer.paypal.com/developer/accounts/).

## Tech

- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [node.js](http://nodejs.org) - evented I/O for the backend
- [Express](http://expressjs.com) - fast node.js network app framework
- [mongoDB](https://www.mongodb.com/) - general purpose, document-based, distributed database
- [mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [Cloudinary](https://cloudinary.com/) - for image storage
- [Redux](https://react-redux.js.org/) - for state management
- [multer](https://www.npmjs.com/package/multer) - node.js middleware for handling multipart/form-data
- [JSON Web Token](https://jwt.io/) - for user authentication
- [React Bootstrap](https://react-bootstrap.github.io/) - Bootstrap components built for React

## Demo

## License

MIT
