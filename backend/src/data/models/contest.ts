import { IsInt } from "class-validator";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
	
} from "typeorm";

export enum statuses {
	uploadWorks = 1,
	selectWinners,
	contestEnded
}

@Entity()
class Contest extends BaseEntity {
	@PrimaryGeneratedColumn()
		contest_id: number;

	@Column()
	@IsInt()
		year: number;
	@Column({
		type: "enum",
		enum: statuses,
		default: statuses.uploadWorks,
	})
		status: statuses;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;

}
export { Contest };
