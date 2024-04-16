import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'pk_users_id' })
  id: number;

  @Column({ name: 'firstname', type: 'varchar', length: 255, nullable: true, default: null })
  firstname: string | null;

  @Column({ name: 'lastname', type: 'varchar', length: 255, nullable: true, default: null })
  lastname: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 16, nullable: true, default: null, unique: true })
  phone: string | null;

  @Column({ name: 'email', type: 'varchar', length: 320, unique: true })
  email: string;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
