import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id) {
    return this.postService.findOne(id);
  }
  @Get('user/:id')
  findPostsByUserId(@Param('id') id) {
    return this.postService.findPostsByUserId(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto, req.user);
  }
  @Patch()
  incrementViews(@Body() { id }) {
    return this.postService.incrementViews(id);
  }
}
