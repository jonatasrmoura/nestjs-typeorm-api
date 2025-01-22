import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";

export const userRespositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  },
};
