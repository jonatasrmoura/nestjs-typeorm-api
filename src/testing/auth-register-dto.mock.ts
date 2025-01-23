import { AuthRegisterDTO } from '../auth/dto/auth-register.dto';
import { Role } from '../enums/role.enum';

export const authRegisterDtoMock: AuthRegisterDTO = {
  name: `Jonas Oliveira`,
  email: `jonas@example.com`,
  birthAt: '2000-01-01',
  role: Role.User,
  password: 'Teste@123',
};
