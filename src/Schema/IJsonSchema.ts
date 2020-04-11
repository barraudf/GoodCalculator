import {IItemSchema} from '@src/Schema/IItemSchema';
import {IRecipeSchema} from '@src/Schema/IRecipeSchema';
import {IBuildingSchema} from '@src/Schema/IBuildingSchema';

export interface IJsonSchema
{

	items: {[key: string]: IItemSchema};
	recipes: {[key: string]: IRecipeSchema};
	buildings: {[key: string]: IBuildingSchema};

}
