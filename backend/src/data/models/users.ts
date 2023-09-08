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
import { Requests } from "./requests";
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
	@OneToMany(
		()=>Requests,
		(request)=> request.user,
		{	
			cascade: true
		}
	)
		request: Requests[];
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;

}
export { Users };
