import data from '@src/Data/Data';
import {IItemSchema} from '@src/Schema/IItemSchema';
import {ITransitionObject} from '@src/Types/ITransitionObject';
import {IRecipeSchema} from '@src/Schema/IRecipeSchema';
import {IBuildingSchema} from '@src/Schema/IBuildingSchema';
import {RecentlyVisitedItemsService} from '@src/Module/Services/RecentlyVisitedItemsService';

export class ItemController
{

	public item: IItemSchema;
	public recipes: IRecipeSchema[];
	public usagesAsIngredient: IRecipeSchema[];

	public static $inject = ['$state', '$transition$', 'RecentlyVisitedItemsService'];

	public constructor($state: any, $transition$: ITransitionObject<{item: string}>, recentlyVisitedItemsService: RecentlyVisitedItemsService)
	{
		const item = data.getItemBySlug($transition$.params().item);
		if (item === null) {
			$state.go('home');
			return;
		}
		recentlyVisitedItemsService.addVisited(item.className);
		this.item = item;
		this.recipes = Object.values(data.getRecipesForItem(item));
		this.usagesAsIngredient = Object.values(data.getUsagesAsIngredientForItem(item));
	}

	public getItem(className: string): IItemSchema|null
	{
		return data.getRawData().items[className];
	}

	public getBuilding(className: string): IBuildingSchema|null
	{
		return data.getRawData().buildings[className];
	}

	public getMachine(recipe: IRecipeSchema): IBuildingSchema|null
	{
		return data.getManufacturerByClassName(recipe.producedIn[0]);
	}

}
