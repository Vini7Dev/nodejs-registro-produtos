import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProductImages1635457202481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'product_images',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'product_id',
          type: 'uuid',
        },
        {
          name: 'file_name',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        }
      ],
      foreignKeys: [
        {
          name: 'fk_product_images_product_id',
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
        }
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_images');
  }
}
