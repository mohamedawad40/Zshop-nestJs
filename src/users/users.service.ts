import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    // This service will handle user-related operations such as creating, updating, and deleting users.
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User> // Injecting the User repository to interact with the database
    ) {}

    async createUser (createUserDto: CreateUserDto): Promise<User> {
        const  { email, password, role } = createUserDto; // Destructuring the DTO to get the user details
        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);
        const newUser = this.userRepo.create({ email, password: hashPassword, role }); // Creating a new user instance
        return this.userRepo.save(newUser);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        const { password, profile } = updateUserDto;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        await this.userRepo.update(id, { ...(password && { password: hashedPassword }), ...(profile && { profile }) });
    }

    async removeUser(id: number): Promise<void> {
        await this.userRepo.delete(id); // Deleting the user by ID
    } 
}
