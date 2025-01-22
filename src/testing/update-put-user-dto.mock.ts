import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDto: UpdatePutUserDTO = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  birthAt: '1990-01-01',
  role: Role.User,
  password: '$2b$10$FJwbX5pjXSRBbREhR0x1deSojcNP0jtZvy2i0Fk.b2PAUX/fyCYEW',
};
