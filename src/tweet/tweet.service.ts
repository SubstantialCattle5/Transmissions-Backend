import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  private async findUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  private async findTweet(tweetId: string) {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: ['user'],
      select: {
        id: true,
        content: true,
        user: {
          username: true,
          id: true,
        },
      },
    });
    if (!tweet) {
      throw new BadRequestException('Tweet not found');
    }
    return tweet;
  }

  async create(userId: string, createTweetDto: CreateTweetDto) {
    const user = await this.findUser(userId);
    const tweet = new Tweet({
      ...createTweetDto,
      user,
    });
    const savedTweet = await this.tweetRepository.save(tweet);

    return {
      message: `Successfully created a new tweet with ID ${savedTweet.id}`,
      tweet: savedTweet.content,
      user: savedTweet.user.username,
      tweetId: savedTweet.id,
    };
  }

  async findAll() {
    const tweets = await this.tweetRepository.find({
      relations: ['user'],
      select: {
        id: true,
        content: true,
        user: {
          username: true,
        },
      },
    });

    return {
      message: `Found ${tweets.length} tweets`,
      tweets,
    };
  }

  async findOne(id: string) {
    const tweet = await this.findTweet(id);

    return {
      message: `Found tweet with ID ${id}`,
      tweet,
    };
  }

  async update(
    userId: string,
    tweetId: string,
    updateTweetDto: UpdateTweetDto,
  ) {
    const user = await this.findUser(userId);
    const tweet = await this.findTweet(tweetId);

    if (user.id !== tweet.user.id) {
      throw new BadRequestException('User not authorized');
    }

    const updatedTweet = await this.tweetRepository.save({
      ...tweet,
      ...updateTweetDto,
    });

    return {
      message: `Successfully updated tweet with ID ${updatedTweet.id}`,
      tweet: updatedTweet.content,
      user: updatedTweet.user.username,
      tweetId: updatedTweet.id,
    };
  }

  async remove(userId: string, tweetId: string) {
    const user = await this.findUser(userId);
    const tweet = await this.findTweet(tweetId);

    if (user.id !== tweet.user.id) {
      throw new BadRequestException('User not authorized');
    }

    await this.tweetRepository.delete(tweetId);

    return {
      message: `Successfully deleted tweet with ID ${tweetId}`,
      tweets: await this.findAll(),
    };
  }
}
