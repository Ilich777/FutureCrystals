import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Contest } from "./contest";
import { Users } from "./users";

@Entity()
class Requests extends BaseEntity {
	@PrimaryGeneratedColumn()
		request_id: number;
	@ManyToOne(() => Contest)
	@JoinColumn({name: "contest_id", referencedColumnName: "contest_id", foreignKeyConstraintName: "requestsContest_id"})
		contest: Contest;
	@ManyToOne(() => Users)
	@JoinColumn({name: "user_id", referencedColumnName: "user_id", foreignKeyConstraintName: "requestsUsers_id"})
		user: Users;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}

export { Requests };
