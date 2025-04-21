import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const { email, password, role } = createUserDto;
        const user = await this.usersService.createUser({ email, password, role });
        return user;
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }


    @UseGuards(JwtGuard)
    @Get('profile')
    async getProfile(@Req() req: any) {
        const user = req.user;
        return user;
    }

    @UseGuards(JwtGuard)
    @Patch('profile')
    async updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
        const user = req.user;
        await this.usersService.update(user.id, updateUserDto);
        return this.usersService.findUserByEmail(user.email);
    }

    @UseGuards(JwtGuard)
    @Delete('profile')
    async deleteProfile(@Req() req: any) {
        const user = req.user;
        await this.usersService.removeUser(user.id);
        return { message: 'User deleted successfully' };
    }
}
