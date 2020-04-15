import rawData from '@data/data.json';
import {default as solver, ISolverModel, ISolverResult, ISolverResultSingle} from 'javascript-lp-solver';
import {IRecipeSchema} from '@src/Schema/IRecipeSchema';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {ItemAmount} from '@src/Data/ItemAmount';

export class Solver
{

	public static solveProduction(production: ItemAmount[]): ISolverResult|ISolverResultSingle
	{
		const data: IJsonSchema = rawData as any;
		const model: ISolverModel = {
			optimize: {},
			constraints: {},
			variables: {},
		};

		for (const k in data.items) {
			if (data.items.hasOwnProperty(k)) {
				const item = data.items[k];
				if (item.module_category !== 'cat_material') {
					model.constraints[item.slug] = {
						min: 0,
					};
				} else {
					model.constraints[item.slug] = {
						max: 0,
					};
				}
			}
		}

		for (const itemAmount of production) {
			delete model.optimize[itemAmount.item.prototype.slug];
			model.constraints[itemAmount.item.prototype.slug] = {
				equal: parseFloat(itemAmount.amount + ''),
			};
		}

		for (const k in data.recipes) {
			if (data.recipes.hasOwnProperty(k)) {
				const recipe: IRecipeSchema = data.recipes[k];
				const def: {[key: string]: number} = {};
				const itemName = recipe.products[0].item;
				// for (const ingredient of recipe.ingredients) {
				// 	def[ingredient.item] = -ingredient.amount;
				// }
				for (const product of recipe.products) {
					def[product.item] = product.amount;
				}
				model.variables[recipe.className] = def;
			}
		}

		return solver.Solve(model);
	}

}
