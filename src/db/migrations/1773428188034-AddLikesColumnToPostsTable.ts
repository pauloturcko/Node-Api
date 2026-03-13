import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddLikesColumnToPostsTable1773428188034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "posts",
      new TableColumn({
        name: "likes",
        default: 0,
        type: "int",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("posts", "likes");
  }
}
