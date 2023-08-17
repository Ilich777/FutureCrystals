import { Directions } from "../../data/models/directions";
import { Nominations } from "../models/nominations";


class NominationsRepository {
	public async getByDirectionId(id:number) : Promise<Nominations[]> {
		try {
			if(typeof id !== "number")
				throw new Error("id isn't number");

			const directionWithNoms = await Directions.find({
				where:{
					direction_id: id
				},
				relations:{
					nominations:true
				}
			});

			if(directionWithNoms === null)
				throw new Error("Direction by given id not found");
			const {nominations} = directionWithNoms[0];
			
			/*if(!nominations)
				throw new Error("Nominations in finded Direction not found");*/

			return nominations;
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

export default new NominationsRepository();
