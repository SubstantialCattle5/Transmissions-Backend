import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user-decorator';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('id') id: string, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(id, createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @GetUser('id') id: string,
    @Param('id') postId: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(id, postId, updateTweetDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@GetUser('id') id: string, @Param('id') postId: string) {
    return this.tweetService.remove(id, postId);
  }
}
