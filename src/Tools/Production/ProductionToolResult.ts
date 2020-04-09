import {RecipeResult} from '@src/Tools/Production/RecipeResult';
import {ItemAmount} from '@src/Data/ItemAmount';
import vis from 'vis-network';
import model from '@src/Data/Model';

export class ProductionToolResult
{

	public readonly nodes = new vis.DataSet<{
		id: number,
		label: string,
		title?: string,
		shape: string,
		image: string,
	}>();
	public readonly edges = new vis.DataSet<{
		from: number,
		to: number,
		label?: string,
		title?: string,
		id?: number,
	}>();
	public rawResources: {[key: string]: {amount: number, data: Array<{amount: number, id: number}>}} = {};

	public constructor(public readonly recipes: RecipeResult[])
	{
		let id = 1;
		for (const recipe of recipes) {
			this.nodes.add({
				id: id,
				label: '',
				title: '',
				shape: 'image',
				image: '',
			});
			recipe.nodeId = id;
			this.updateNode(id);
			id++;
		}

		for (const recipe of recipes) {
			ingredientLoop:
			for (const ingredient of recipe.recipe.ingredients) {
				let amount = ingredient.amount * recipe.getMachineCount() * 15 / recipe.recipe.prototype.time;
				for (const re of recipes) {
					for (const product of re.productAmountCache) {
						if (product.product === ingredient.item.prototype.className && product.amount > 0) {
							const diff = Math.min(product.amount, amount);

							product.amount -= diff;

							this.edges.add({
								from: re.nodeId,
								to: recipe.nodeId,
								label: ingredient.item.prototype.name + '\n' + diff.toFixed(2) + '/day',
							});

							amount -= diff;
							if (amount <= 1e-6) {
								continue ingredientLoop;
							}
						}
					}
				}

				if (amount >= 1e-6 && model.isRawResource(ingredient.item)) {
					if (!(ingredient.item.prototype.className in this.rawResources)) {
						this.rawResources[ingredient.item.prototype.className] = {
							amount: 0,
							data: [],
						};
					}
					this.rawResources[ingredient.item.prototype.className].amount += amount;
					this.rawResources[ingredient.item.prototype.className].data.push({
						id: recipe.nodeId,
						amount: amount,
					});
				}
			}
		}

		for (const k in this.rawResources) {
			if (this.rawResources.hasOwnProperty(k)) {
				const resource = this.rawResources[k];
				const item = model.getItem(k);

				this.nodes.add({
					id: id,
					label: ProductionToolResult.getRecipeDisplayedName(item.prototype.name) + '\n' + resource.amount.toFixed(2) + ' / day',
					title: '',
					shape: 'image',
					image: '/assets/images/items/' + item.prototype.slug + '.png',
				});

				for (const data of resource.data) {
					this.edges.add({
						from: id,
						to: data.id,
						label: item.prototype.name + '\n' + data.amount.toFixed(2) + ' / day',
					});
				}

				id++;
			}
		}
	}

	public updateNode(id: number): void
	{
		let recipe;
		for (const item of this.recipes) {
			if (item.nodeId === id) {
				recipe = item;
				break;
			}
		}
		if (!recipe) {
			return;
		}
		this.nodes.update({
			id: id,
			label: ProductionToolResult.getRecipeDisplayedName(recipe.recipe.prototype.name) + '\n' + recipe.getMachineCount().toFixed(2) + 'x ' + recipe.recipe.machine.name,
			title: recipe.getMachineTooltip(),
			shape: 'image',
			image: '/assets/images/items/' + recipe.recipe.products[0].item.prototype.slug + '.png',
		});
	}

	private static getRecipeDisplayedName(name: string): string
	{
		const parts = name.split(' ');
		if (parts.length >= 4) {
			parts.splice(Math.ceil(parts.length / 2), 0, '</b>\n<b>');
		}
		return '<b>' + parts.join(' ') + '</b>';
	}

}
