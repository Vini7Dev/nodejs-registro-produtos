import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export default User;
