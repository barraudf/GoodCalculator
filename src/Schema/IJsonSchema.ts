import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {ICrafterSchema} from '@src/Schema/ICrafterSchema';

export interface IJsonSchema
{

	materials: IMaterialSchema[];
	crafters: ICrafterSchema[];

}
