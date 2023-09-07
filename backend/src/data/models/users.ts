import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import { UserInfo } from "./userInfo";
import { Winners } from "./winners";
/*enum statuses {
	uploadWorks = 1,
	selectWinners,
	contestEnded
}*/
import { userRolesConfig } from "../userRoles";
const { roles } = userRolesConfig;
@Entity()
class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
		user_id: number;
	@Column()
		user_name: string;
	@Column()
		login: string;
	@Column()
		email: string;
	@Column({
		type: "enum",
		enum: roles,
		default: roles.student,
	})
		role: string;
	@OneToMany(
		()=>UserInfo,
		(info)=> info.user,
		{	
			cascade: true
		}
	)
		info: UserInfo[];
	@OneToMany(
		()=>Winners,
		(winner)=> winner.user,
		{	
			cascade: true
		}
	)
		winner: UserInfo[];
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;

}
export { Users };
