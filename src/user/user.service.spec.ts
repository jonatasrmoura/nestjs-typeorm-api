import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { userRespositoryMock } from '../testing/user-repository.mock';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRespositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
  });
});
