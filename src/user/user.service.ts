import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExists)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Пользователь с данным email уже существует',
        },
        HttpStatus.BAD_REQUEST,
      );
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).populate('favorite');
    if (!user) {
      throw new HttpException(
        'Пользователя с таким емейлом не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
