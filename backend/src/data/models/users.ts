import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
	
} from "typeorm";

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
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;

}
export { Users };
