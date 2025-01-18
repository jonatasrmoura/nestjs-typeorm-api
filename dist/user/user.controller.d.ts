import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    create(data: CreateUserDTO): Promise<import("./entity/user.entity").UserEntity>;
    list(): Promise<import("./entity/user.entity").UserEntity[]>;
    show(id: number): Promise<import("./entity/user.entity").UserEntity>;
    update(data: UpdatePutUserDTO, id: number): Promise<import("./entity/user.entity").UserEntity>;
    updatePartial(data: UpdatePatchUserDTO, id: number): Promise<import("./entity/user.entity").UserEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
