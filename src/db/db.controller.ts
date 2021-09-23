import { Controller, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { DbService } from './db.service';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post/post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/db')
export class DbController {
  constructor(
    private readonly dbService: DbService,
    private readonly authService: AuthService,
    private readonly postService: PostService,
  ) {}
  @Post('user')
  seedUser() {
    this.dbService.users.map(async (user) => {
      await this.authService.register(user);
    });
  }
  @Post('post')
  @UseGuards(JwtAuthGuard)
  seedPost(@Req() req) {
    this.dbService.posts.map(async (post) => {
      await this.postService.create(post, req.user);
    });
  }
  @Delete()
  deleteUsers() {
    this.dbService.dropUsers();
  }
}
