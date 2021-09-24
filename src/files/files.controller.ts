import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Req() req, @UploadedFile() image) {
    return this.filesService.createFile(image);
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadUserAvatar(@Req() { user }, @UploadedFile() image) {
    return this.filesService.uploadUserAvatar(image, user);
  }
}
