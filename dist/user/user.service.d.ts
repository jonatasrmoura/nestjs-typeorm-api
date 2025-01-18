import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserEntity } from './entity/user.entity';
export declare class UserService {
    private usersRespository;
    constructor(usersRespository: Repository<UserEntity>);
    create(data: CreateUserDTO): Promise<UserEntity>;
    list(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    update(id: number, data: UpdatePutUserDTO): Promise<UserEntity>;
    updatePartial(id: number, { birthAt, email, name, role, password }: UpdatePatchUserDTO): Promise<UserEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    exists(id: number): Promise<void>;
}
