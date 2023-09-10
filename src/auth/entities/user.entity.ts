import { Tweet } from 'src/tweet/entities/tweet.entity';
import { AbstractEntity } from './../../database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];
}
