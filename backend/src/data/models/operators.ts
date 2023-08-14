import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Directions } from "./directions";
import { Users } from "./users";

@Entity()
class Operators extends BaseEntity {
	@PrimaryGeneratedColumn()
		operator_id: number;
	@ManyToOne(() => Users)
	@JoinColumn({name: "user_id", referencedColumnName: "user_id", foreignKeyConstraintName: "opetratorsUser_id"})
		user: Users;
	@OneToOne(() => Directions)
	@JoinColumn({name: "direction_id", referencedColumnName: "direction_id", foreignKeyConstraintName: "opetratorsDirections_id"})
		direction: Directions;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}

export { Operators };
