import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  addPostInFavorite(@Req() { user }, @Body() { post }) {
    return this.favoriteService.addPostToUserFavorite(post, user);
  }
  @Put()
  @UseGuards(JwtAuthGuard)
  removePostFromFavorite(@Req() { user }, @Body() { post }) {
    return this.favoriteService.removePostFromFavorite(post, user);
  }
}
