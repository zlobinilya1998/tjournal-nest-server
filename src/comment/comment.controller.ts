import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAllComments() {
    return this.commentService.findAllComments();
  }
  @Get(':id')
  findAllCommentsInPost(@Param('id') id: string) {
    return this.commentService.findAllCommentsInPost(id);
  }
  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  findAllCommentsOfUser(@Param('id') id: string) {
    return this.commentService.findAllCommentsOfUser(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto, req.user);
  }
}
