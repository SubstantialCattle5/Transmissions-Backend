import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
