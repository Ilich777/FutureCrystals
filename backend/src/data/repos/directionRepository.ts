import { Directions } from "../models/directions";
import { Nominations } from "../../data/models/nominations";
import { nominationArray, directionArray } from "../nominations";

interface Nomination {
	nomination_name: string;
    description: string;
    max_mark: number;
}

class DirectionsRepository {
	public async init() : Promise<boolean> {
		try{
			const mapCallback = (data: Nomination)=>{
				const nomination = new Nominations();
				Object.assign(nomination, data);
				return nomination;
			};
			const countField = await Directions.count();
			if (countField === 0) {
				const culturalNom = nominationArray["cultural"];
				const culturalDir = directionArray[0];

				const direction1 = new Directions();
				direction1.direction_name = culturalDir;
				direction1.image = "cultural.jpeg";
				direction1.nominations = culturalNom.map((data)=>mapCallback(data));

				await direction1.save();


				const scienceNom = nominationArray["science"];
				const scienceDir = directionArray[1];

				const direction2 = new Directions();
				direction2.direction_name = scienceDir;
				direction2.image = "science.jpg";
				direction2.nominations = scienceNom.map((data)=>mapCallback(data));

				await direction2.save();


				const socialNom = nominationArray["social"];
				const socialDir = directionArray[2];

				const direction3 = new Directions();
				direction3.direction_name = socialDir;
				direction3.image = "social.jpg";
				direction3.nominations = socialNom.map((data)=>mapCallback(data));

				await direction3.save();


				const sportNom = nominationArray["sport"];
				const sportDir = directionArray[3];

				const direction4 = new Directions();
				direction4.direction_name = sportDir;
				direction4.image = "sport.jpeg";
				direction4.nominations = sportNom.map((data)=>mapCallback(data));

				await direction4.save();

				const educationalNom = nominationArray["educational"];
				const educationalDir = directionArray[4];

				const direction5 = new Directions();
				direction5.direction_name = educationalDir;
				direction5.image = "educational.jpeg";
				direction5.nominations = educationalNom.map((data)=>mapCallback(data));

				await direction5.save();
				return true;
			} else {
				return false;
			}
		} catch(e:any){
			throw new Error("Something with creating");
		}
	}
	public async getDirections() : Promise<Directions[]> {
		try{
			const directions = await Directions.find({
				select:{
					direction_id: true,
					direction_name: true,
					image: true
				},
				order: {
					direction_name: "ASC"
				}
			});
			return directions;
		} catch(e:any){
			throw new Error("Something with getting directions");
		}
	}
	/*public async getDirections() : Promise<boolean> {
		try{
			return true;
		} catch(e:any){
			throw new Error("Something with getting directions");
		}
	}*/
}
export default new DirectionsRepository();
