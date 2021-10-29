import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import User from '../../../users/typeorm/entities/User';
import Category from './Category';
import ProductImage from './ProductImage';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('uuid')
  category_id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductImage, product_image => product_image.product)
  product_images: ProductImage[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // Gerando um id para a entidade durante o cadastro
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export default Product;
