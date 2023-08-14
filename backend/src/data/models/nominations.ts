import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Directions } from "./directions";

@Entity()
class Nominations extends BaseEntity {
	@PrimaryGeneratedColumn()
		nomination_id: number;
	@Column()
		nomination_name: string;
	@Column()
		max_mark: number;
	@Column()
		description: string;
	@ManyToOne(
		() => Directions, 
		(direction)=> direction.nominations,
		{	
			onDelete: "CASCADE"
		}
	)
	@JoinColumn({name: "direction_id", referencedColumnName: "direction_id", foreignKeyConstraintName: "nominationDirections_id"})
		direction: Directions;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}

export { Nominations };
