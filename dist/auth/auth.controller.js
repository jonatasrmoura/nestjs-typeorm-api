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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const auth_login_dto_1 = require("./dto/auth-login.dto");
const auth_register_dto_1 = require("./dto/auth-register.dto");
const auth_forget_dto_1 = require("./dto/auth-forget.dto");
const auth_reset_dto_1 = require("./dto/auth-reset.dto");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("../guards/auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const file_service_1 = require("../file/file.service");
const user_entity_1 = require("../user/entity/user.entity");
let AuthController = class AuthController {
    constructor(userService, authService, fileService) {
        this.userService = userService;
        this.authService = authService;
        this.fileService = fileService;
    }
    async login({ email, password }) {
        return this.authService.login(email, password);
    }
    async register(body) {
        return this.authService.register(body);
    }
    async forget({ email }) {
        return this.authService.forget(email);
    }
    async reset({ password, token }) {
        return this.authService.reset(password, token);
    }
    async me(user) {
        return { user };
    }
    async uploadPhoto(user, photo) {
        const path = (0, path_1.join)(__dirname, '../', '../', 'storage', 'photos', `photo-${user.id}.png`);
        try {
            await this.fileService.upload(photo, path);
            return { sucess: true };
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async uploadFiles(user, files) {
        return files;
    }
    async uploadFilesFields(user, files) {
        return files;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_dto_1.AuthRegisterDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forget'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forget_dto_1.AuthForgetDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forget", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reset_dto_1.AuthResetDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('me'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('photo'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: 'image/*' }),
            new common_1.MaxFileSizeValidator({
                maxSize: 1024 * 250,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('files'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Array]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'photo',
            maxCount: 1,
        },
        {
            name: 'documents',
            maxCount: 10,
        },
    ])),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('files-fields'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFilesFields", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        file_service_1.FileService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map