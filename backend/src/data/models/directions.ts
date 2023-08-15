import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Nominations } from "./nominations";

@Entity()
class Directions extends BaseEntity {
	@PrimaryGeneratedColumn()
		direction_id: number;
	@Column()
		direction_name: string;
	@Column({
		nullable: true
	})
		image: string;
	@OneToMany(
		()=>Nominations,
		(direction)=> direction.direction,
		{	
			cascade: true
		}
	)
		nominations: Nominations[];
	@CreateDateColumn()
		createdAt: Date;
	@UpdateDateColumn()
		updatedAt: Date;
}

export { Directions };
