import {IItemAmountSchema} from '@src/Schema/IItemAmountSchema';

export interface IRecipeSchema
{

	slug: string;
	name: string;
	className: string;
	time: number;
	ingredients: IItemAmountSchema[];
	products: IItemAmountSchema[];
	producedIn: string[];

}
