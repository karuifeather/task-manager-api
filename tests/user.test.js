const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userJohn, userJohnId, populateDB } = require('./fixtures/db');

beforeEach(populateDB);

test('Signup a new user', async () => {
  const { body } = await request(app)
    .post('/users')
    .send({
      name: 'karuifeather',
      email: 'k@example.com',
      password: 'hello1234',
      age: 21,
    })
    .expect(201);

  const user = await User.findById(body.user._id);
  expect(user).not.toBeNull();
  expect(body).toMatchObject({
    user: {
      name: 'karuifeather',
      email: 'k@example.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('hello1234');
});

test('Login existing user', async () => {
  const { body } = await request(app)
    .post('/users/login')
    .send({
      email: userJohn.email,
      password: userJohn.password,
    })
    .expect(200);

  const user = await User.findById(userJohn._id);
  expect(body.token).toBe(user.tokens[1].token);
});

test('FAIL: Login BAD user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'fail@example.com',
      password: 'failmesenpai',
    })
    .expect(400);
});

test('Get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userJohn.tokens[0].token}`)
    .send()
    .expect(200);
});

test('FAIL: Get profile for BAD user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Delete profile for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userJohn.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userJohnId);
  expect(user).toBeNull();
});

test('FAIL: Delete profile for BAD user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userJohn.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/dk2.jpg')
    .expect(200);

  const user = await User.findById(userJohnId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});
