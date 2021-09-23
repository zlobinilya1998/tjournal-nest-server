import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  img: string;
  @IsNotEmpty()
  icon: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  html: string;
  @IsNotEmpty()
  category: string;
}
