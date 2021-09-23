import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(userDto: AuthUserDto): Promise<string> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async register(userDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(userDto);
    return this.generateToken(user);
  }
  async generateToken(user): Promise<any> {
    return {
      token: this.jwtService.sign({ ...user._doc }),
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    try {
      const user = await this.userService.findByEmail(userDto.email);
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Некорректный емейл или пароль',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
