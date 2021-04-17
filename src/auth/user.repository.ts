import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {fullName,password } = authCredentialsDto;
        const user = new User();
        user.fullName = fullName;
        user.password = password;

        await user.save();
    }
}