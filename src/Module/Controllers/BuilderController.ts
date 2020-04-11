import data from '@src/Data/Data';
import {IItemSchema} from '@src/Schema/IItemSchema';
import {ITransitionObject} from '@src/Types/ITransitionObject';
import {IRecipeSchema} from '@src/Schema/IRecipeSchema';
import {IBuildingSchema} from '@src/Schema/IBuildingSchema';
import {RecentlyVisitedItemsService} from '@src/Module/Services/RecentlyVisitedItemsService';

export class BuilderController
{
	public builder: IBuildingSchema;
	public recipes: IRecipeSchema[];

	public static $inject = ['$state', '$transition$', 'RecentlyVisitedItemsService'];

	public constructor($state: any, $transition$: ITransitionObject<{builder: string}>)
	{
		const builder = data.getManufacturerByClassName($transition$.params().builder);
		if (builder === null) {
			$state.go('home');
			return;
		}
		this.builder = builder;
		this.recipes = Object.values(data.getRecipesForBuilder(builder));
	}

	public getItem(className: string): IItemSchema|null
	{
		return data.getRawData().items[className];
	}
}
