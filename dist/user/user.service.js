"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
let UserService = class UserService {
    constructor(usersRespository) {
        this.usersRespository = usersRespository;
    }
    async create(data) {
        const userAlreadyExists = await this.usersRespository.findOneBy({
            email: data.email,
        });
        if (userAlreadyExists) {
            throw new common_1.BadRequestException('E-mail já cadastrado!');
        }
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const user = this.usersRespository.create(data);
        this.usersRespository.save(user);
        return user;
    }
    async list() {
        return this.usersRespository.find();
    }
    async findById(id) {
        await this.exists(id);
        return this.usersRespository.findOneBy({ id });
    }
    async update(id, data) {
        await this.exists(id);
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        await this.usersRespository.update(id, {
            ...data,
            birthAt: data.birthAt ? new Date(data.birthAt) : null,
        });
        return this.findById(id);
    }
    async updatePartial(id, { birthAt, email, name, role, password }) {
        await this.exists(id);
        const data = {};
        if (birthAt)
            data.birthAt = new Date(birthAt);
        if (email)
            data.email = email;
        if (name)
            data.name = name;
        if (role)
            data.role = role;
        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        }
        await this.usersRespository.update(id, data);
        return this.findById(id);
    }
    async delete(id) {
        await this.exists(id);
        return this.usersRespository.delete(id);
    }
    async exists(id) {
        const userExists = await this.usersRespository.exists({
            where: { id },
        });
        if (!userExists) {
            throw new common_1.NotFoundException(`O usuário ${id} não existe.`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map