import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {}
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async uploadUserAvatar(file, user): Promise<User> {
    const filename = await this.createFile(file);
    await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: { avatar: filename },
      },
    );
    return this.userService.findOne(user._id);
  }
}
