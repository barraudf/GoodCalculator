import rawData from '@data/data.json';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {Item} from '@src/Data/Item';
import {Recipe} from '@src/Data/Recipe';

export class Model
{

	public items: {[key: string]: Item} = {};
	public recipes: {[key: string]: Recipe} = {};

	public constructor(public readonly data: IJsonSchema)
	{
		for (const k in data.items) {
			if (data.items.hasOwnProperty(k)) {
				this.items[k] = new Item(this, data.items[k]);
			}
		}
		for (const k in data.recipes) {
			if (data.recipes.hasOwnProperty(k)) {
				const recipe = data.recipes[k];
				this.recipes[k] = new Recipe(this, recipe);
			}
		}
	}

	public getItem(className: string): Item
	{
		if (className in this.items) {
			return this.items[className];
		}
		throw new Error('Unknown item ' + className);
	}

	public getAutomatableItems(): Item[]
	{
		const items: Item[] = [];
		for (const k in this.items) {
			if (this.items.hasOwnProperty(k)) {
				for (const l in this.recipes) {
					if (this.recipes.hasOwnProperty(l)) {
						items.push(this.items[k]);
						break;
					}
				}
			}
		}
		return items;
	}

	public isRawResource(item: Item): boolean
	{
		return item.prototype.className in this.data.resources;
	}

}

export default new Model(rawData as any);
