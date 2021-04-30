const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userJohnId = new mongoose.Types.ObjectId();
const userJohn = {
  _id: userJohnId,
  name: 'John',
  email: 'john@example.com',
  password: 'hello1234',
  age: 21,
  tokens: [
    {
      token: jwt.sign({ _id: userJohnId }, process.env.JWT_SECRET),
    },
  ],
};

const userJaneId = new mongoose.Types.ObjectId();
const userJane = {
  _id: userJaneId,
  name: 'Jane',
  email: 'jane@example.com',
  password: 'hello1234',
  age: 21,
  tokens: [
    {
      token: jwt.sign({ _id: userJaneId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'john sanchai?',
  completed: false,
  author: userJohnId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'jane vok lagyo',
  completed: true,
  author: userJaneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'jane vok lage ghich',
  completed: true,
  author: userJaneId,
};

const populateDB = async () => {
  await User.deleteMany();
  await new User(userJohn).save();
  await new User(userJane).save();
  await Task.deleteMany();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userJohn,
  userJohnId,
  userJane,
  userJaneId,
  populateDB,
  taskOne,
};
