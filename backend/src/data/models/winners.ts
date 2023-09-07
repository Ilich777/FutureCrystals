import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
	
} from "typeorm";
import { Users } from "./users";
import { Contest } from "./contest";
import { Directions } from "./directions";

/*enum statuses {
	uploadWorks = 1,
	selectWinners,
	contestEnded
}*/

@Entity()
class Winners extends BaseEntity {
	@PrimaryGeneratedColumn()
		winner_id: number;
	@ManyToOne(() => Users, 
		(user)=> user.winner,
		{	
			onDelete: "CASCADE"
		})
	@JoinColumn({name: "user_id", referencedColumnName: "user_id", foreignKeyConstraintName: "winnersUser_id"})
		user: Users;
	@ManyToOne(() => Contest)
	@JoinColumn({name: "contest_id", referencedColumnName: "contest_id", foreignKeyConstraintName: "winnersContest_id"})
		contest: Contest;
	@ManyToOne(() => Directions)
	@JoinColumn({name: "direction_id", referencedColumnName: "direction_id", foreignKeyConstraintName: "winnersDirections_id"})
		direction: Directions;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;

}
export { Winners };
