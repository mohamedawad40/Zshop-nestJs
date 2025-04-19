import { IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @MinLength(6)
    password?: string;

    @IsOptional()
    profile?: string;
}