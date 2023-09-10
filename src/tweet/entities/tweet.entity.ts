import { User } from 'src/auth/entities/user.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Tweet extends AbstractEntity<Tweet> {
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;
}
