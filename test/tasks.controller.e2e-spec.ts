import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Task } from '../src/tasks/task.model';
import { TasksService } from '../src/tasks/tasks.service';
import * as mongoose from 'mongoose';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let tasksService: TasksService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tasksService = moduleFixture.get<TasksService>(TasksService);
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect(); // Disconnect from MongoDB after tests
  });

  it('/tasks (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .expect(HttpStatus.OK);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('/tasks (POST)', async () => {
    const newTask: Partial<Task> = {
      title: 'Test Task',
      planning: 'Testing POST endpoint',
      done: false,
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(newTask)
      .expect(HttpStatus.CREATED);

    expect(response.body.title).toEqual(newTask.title);
    expect(response.body.planning).toEqual(newTask.planning);
    expect(response.body.done).toEqual(newTask.done);
  });

  it('/tasks/:id (PUT)', async () => {
    const newTask: Partial<Task> = {
      title: 'Updated Task Title',
      planning: 'Updated Task Planning',
      done: false,
    };
    const createdTask = await tasksService.create(newTask as Task);

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTask.id}`)
      .send({ ...createdTask.toJSON(), title: 'Changed Title' })
      .expect(HttpStatus.OK);

    expect(response.body.title).toEqual('Changed Title');
  });

  it('/tasks/:id (DELETE)', async () => {
    const newTask: Partial<Task> = {
      title: 'Task to Delete',
      planning: 'Task to Delete Planning',
      done: false,
    };
    const createdTask = await tasksService.create(newTask as Task);

    const response = await request(app.getHttpServer())
      .delete(`/tasks/${createdTask.id}`)
      .expect(HttpStatus.OK);

    expect(response.body.title).toEqual(newTask.title);
    expect(response.body.planning).toEqual(newTask.planning);
    expect(response.body.done).toEqual(newTask.done);
  });

  it('/tasks/:id/done (PATCH)', async () => {
    const newTask: Partial<Task> = {
      title: 'Task to Done',
      planning: 'Task to done Planning',
      done: false,
    };
    const createdTask = await tasksService.create(newTask as Task);

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${createdTask.id}/done`)
      .expect(HttpStatus.OK);

    expect(response.body.title).toEqual(newTask.title);
    expect(response.body.planning).toEqual(newTask.planning);
    expect(response.body.done).toBeTruthy();
  });
});
