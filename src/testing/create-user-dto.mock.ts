import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";

export const createUserDto: CreateUserDTO = {
  name: `Jorge da Silva`,
  email: `jorge@example.com`,
  birthAt: '2000-01-01',
  role: Role.User,
  password: '$2b$10$FJwbX5pjXSRBbREhR0x1deSojcNP0jtZvy2i0Fk.b2PAUX/fyCYEW',
};
