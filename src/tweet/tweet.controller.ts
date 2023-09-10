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
import { ApiBearerAuth } from '@nestjs/swagger';
import { createDoc, findAll, findOne, removeDocs, updateDoc } from './docs';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @createDoc()
  @Post()
  create(@GetUser('id') id: string, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(id, createTweetDto);
  }

  @findAll()
  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @findOne()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOne(id);
  }

  @updateDoc()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @GetUser('id') id: string,
    @Param('id') postId: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(id, postId, updateTweetDto);
  }

  @removeDocs()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@GetUser('id') id: string, @Param('id') postId: string) {
    return this.tweetService.remove(id, postId);
  }
}
