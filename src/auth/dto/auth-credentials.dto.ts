import { IsNotEmpty } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    fullName:string;
    
    @IsNotEmpty()
    password:string;
}