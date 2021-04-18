import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {userName,password } = authCredentialsDto;
        const user = new User();
        user.userName = userName;
        user.password = password;
        try{
         await user.save();
        }catch(error){
          throw new ConflictException(error.detail);
        }
    }
}