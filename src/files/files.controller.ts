import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Req() req, @UploadedFile() image) {
    const fileName = this.filesService.createFile(image);
    return fileName;
  }
}
