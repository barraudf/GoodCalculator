import {IItemSchema} from '@src/Schema/IItemSchema';
import {IRecipeSchema} from '@src/Schema/IRecipeSchema';
import {IResourceSchema} from '@src/Schema/IResourceSchema';
import {IBuildingSchema} from '@src/Schema/IBuildingSchema';

export interface IJsonSchema
{

	items: {[key: string]: IItemSchema};
	recipes: {[key: string]: IRecipeSchema};
	resources: {[key: string]: IResourceSchema};
	buildings: {[key: string]: IBuildingSchema};

}
