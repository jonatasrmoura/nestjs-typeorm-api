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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entity/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, userService, mailer, usersRespository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.mailer = mailer;
        this.usersRespository = usersRespository;
        this.issuer = 'login';
        this.audience = 'users';
    }
    createToken(user) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                expiresIn: '7 days',
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience,
            }),
        };
    }
    checkToken(token) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return data;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    isValidToken(token) {
        try {
            this.checkToken(token);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async login(email, password) {
        const user = await this.usersRespository.findOneBy({
            email,
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email e/ou senha incorretos.');
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Email e/ou senha incorretos.');
        }
        return this.createToken(user);
    }
    async forget(email) {
        const user = await this.usersRespository.findOneBy({
            email,
        });
        if (!user) {
            throw new common_1.UnauthorizedException('E-mail está incorretos.');
        }
        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: '30 minutes',
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users',
        });
        await this.mailer.sendMail({
            subject: 'Recuperação de senha',
            to: user.email,
            template: 'forget',
            context: {
                name: user.name,
                token,
            },
        });
        return { resetToken: token };
    }
    async reset(password, token) {
        try {
            const { id } = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            });
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            await this.usersRespository.update(id, { password });
            const user = await this.userService.findById(id);
            return this.createToken(user);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async register(data) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        mailer_1.MailerService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map