import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Product from './Product';

@Entity('product_images')
class ProductImage {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  file_name: string;

  @Column('uuid')
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export default ProductImage;
