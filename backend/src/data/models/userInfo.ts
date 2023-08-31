import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
	
} from "typeorm";
import { Users } from "./users";

@Entity()
class UserInfo extends BaseEntity {
	@PrimaryGeneratedColumn()
		userInfo_id: number;
	@Column()
		parameterName: string;
	@Column()
		value: string;
	@ManyToOne(() => Users, 
		(user)=> user.info,
		{	
			onDelete: "CASCADE"
		}
	)
	@JoinColumn({name: "user_id", referencedColumnName: "user_id", foreignKeyConstraintName: "userInfoUser_id"})
		user: Users;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;

}
export { UserInfo };
