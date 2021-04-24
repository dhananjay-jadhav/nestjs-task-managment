import { JwtPayLoad } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtServide: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const userName = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!userName) {
      throw new UnauthorizedException('username or password is incorrect');
    }

    const payload: JwtPayLoad = { userName };
    const accessToken = await this.jwtServide.sign(payload);

    return { accessToken };
  }
}
