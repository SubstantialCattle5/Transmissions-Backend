import { AbstractEntity } from './../../database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
