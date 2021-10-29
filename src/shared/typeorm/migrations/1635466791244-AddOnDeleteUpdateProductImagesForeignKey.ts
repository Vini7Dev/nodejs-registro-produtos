import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddOnDeleteUpdateProductImagesForeignKey1635466791244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_images', 'fk_product_images_product_id');

    await queryRunner.createForeignKey('product_images', new TableForeignKey({
      name: 'fk_product_images_product_id',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_images', 'fk_product_images_product_id');

    await queryRunner.createForeignKey('product_images', new TableForeignKey({
      name: 'fk_product_images_product_id',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
    }));
  }
}
