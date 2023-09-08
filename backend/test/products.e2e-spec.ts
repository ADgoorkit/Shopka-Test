import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/products (POST) thorws 400 on negative numbers', () => {
    const product = {
      name: 'product',
      description: 'produdct desc',
      price: -10,
      rating: -10,
    };
    return request(app.getHttpServer())
      .post('/products')
      .send(product)
      .expect(400);
  });

  it('/products (POST) returns 201 when ok', () => {
    const product = {
      name: 'product',
      description: 'produdct desc',
      price: 10,
      rating: 10,
    };
    return request(app.getHttpServer())
      .post('/products')
      .send(product)
      .expect(201);
  });
});
