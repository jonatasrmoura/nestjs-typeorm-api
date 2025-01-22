import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { userRespositoryMock } from '../testing/user-repository.mock';
import { UserEntity } from './entity/user.entity';

import { userEntityList } from '../testing/user.entity-list.mock';
import { createUserDto } from '../testing/create-user-dto.mock';
import { updatePutUserDto } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDto } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRespositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('Method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Method list', async () => {
      const result = await userService.list();
      expect(result).toEqual(userEntityList);
    });

    test('Method show', async () => {
      const result = await userService.show(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Method update', async () => {
      const result = await userService.update(1, updatePutUserDto);
      expect(result).toEqual(userEntityList[0]);
    });

    test('Method partial', async () => {
      const result = await userService.updatePartial(1, updatePatchUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Method delete', async () => {
      const result = await userService.delete(1);
      expect(result).toEqual(true);
    });
  });
});
