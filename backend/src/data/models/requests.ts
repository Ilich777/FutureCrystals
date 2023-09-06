import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import { Contest } from "./contest";
import { Users } from "./users";
import { RequestValues } from "./requestValues";

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
	@OneToMany(
		()=>RequestValues,
		(request)=> request.request,
		{	
			cascade: true
		}
	)
		values: RequestValues[];
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}

export { Requests };
