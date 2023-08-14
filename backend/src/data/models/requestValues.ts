import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Nominations } from "./nominations";
import { Requests } from "./requests";

@Entity()
class RequestValues extends BaseEntity {
	@PrimaryGeneratedColumn()
		requestValues_id: number;
	@Column()
		value: string;
	@Column({
		nullable: true,
		default: null
	})
		mark: number;
	@ManyToOne(() => Nominations)
	@JoinColumn({name: "nomination_id", referencedColumnName: "nomination_id", foreignKeyConstraintName: "requestValuesNominations_id"})
		nomination: Nominations;
	@ManyToOne(() => Requests)
	@JoinColumn({name: "request_id", referencedColumnName: "request_id", foreignKeyConstraintName: "requestValuesRequests_id"})
		request: Requests;
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}

export { RequestValues };
