const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userJohn, userJane, taskOne, populateDB } = require('./fixtures/db');

beforeEach(populateDB);

test('Create task for user', async () => {
  const { body } = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userJohn.tokens[0].token}`)
    .send({ description: 'testing one o one' })
    .expect(201);

  const task = await Task.findById(body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Fetch user tasks', async () => {
  const { body } = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userJane.tokens[0].token}`)
    .send()
    .expect(200);

  expect(body.length).toBe(2);
});

test('FAIL: Delete tasks by BAD user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userJane.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
