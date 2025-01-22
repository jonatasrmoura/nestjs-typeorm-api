import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRespository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    const userAlreadyExists = await this.usersRespository.exists({
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('E-mail já cadastrado!');
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRespository.create(data);

    return this.usersRespository.save(user);
  }

  async list() {
    return this.usersRespository.find();
  }

  async show(id: number) {
    await this.exists(id);
    return this.usersRespository.findOneBy({ id });
  }

  async update(id: number, data: UpdatePutUserDTO) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    await this.usersRespository.update(id, {
      ...data,
      birthAt: data.birthAt ? new Date(data.birthAt) : null,
    });

    return this.show(id);
  }

  async updatePartial(
    id: number,
    { birthAt, email, name, role, password }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);

    if (email) data.email = email;

    if (name) data.name = name;

    if (role) data.role = role;

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    await this.usersRespository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    await this.exists(id);
    await this.usersRespository.delete(id);
    return true;
  }

  async exists(id: number) {
    const userExists = await this.usersRespository.exists({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
