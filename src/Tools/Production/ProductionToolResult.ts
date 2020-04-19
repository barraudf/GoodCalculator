import {RecipeResult} from '@src/Tools/Production/RecipeResult';
import {MaterialAmount} from '@src/Data/MaterialAmount';
import vis from 'vis-network';
import model from '@src/Data/Model';
import { Material } from '@src/Data/Material';

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
	public rawResources: {[key: number]: {amount: number, data: Array<{amount: number, id: number}>}} = {};

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
			const material: Material = model.getMaterialByModuleId(recipe.recipe.prototype.moduleId);
			ingredientLoop:
			for (const input of material.inputMaterials) {
				let amount = input.prototype.amount * recipe.getMachineCount() * 15  / recipe.recipe.getTotalCraftingTime();
				for (const re of recipes) {
					const product = re.productAmountCache;
					if (product.product.prototype.materialId === input.prototype.materialId && product.amount > 0) {
						const diff = Math.min(product.amount, amount);

						product.amount -= diff;

						this.edges.add({
							from: re.nodeId,
							to: recipe.nodeId,
							label: /*input.material.prototype.name['en'] + '\n' + */diff.toFixed(2) + ' / day',
						});

						amount -= diff;
						if (amount <= 1e-6) {
							continue ingredientLoop;
						}
					}
				}

				if (amount >= 1e-6 && Material.isRawResource(input.material)) {
					if (!(input.material.prototype.materialId in this.rawResources)) {
						this.rawResources[input.prototype.materialId] = {
							amount: 0,
							data: [],
						};
					}
					this.rawResources[input.prototype.materialId].amount += amount;
					this.rawResources[input.prototype.materialId].data.push({
						id: recipe.nodeId,
						amount: amount,
					});
				}
			}
		}

		for (const k in this.rawResources) {
			if (this.rawResources.hasOwnProperty(k)) {
				const resource = this.rawResources[k];
				const materialId = parseInt(k, undefined);
				const item = model.getMaterial(materialId);

				this.nodes.add({
					id: id,
					label: item.prototype.name['en'] + '\n' + resource.amount.toFixed(2) + ' / day',
					title: '',
					shape: 'image',
					image: '/assets/images/' + item.prototype.iconSprite + '/' + item.prototype.iconId + '.png',
				});

				for (const data of resource.data) {
					this.edges.add({
						from: id,
						to: data.id,
						label: /*item.prototype.name['en'] + '\n' + */data.amount.toFixed(2) + ' / day',
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
			label: model.getMaterialByModuleId(recipe.recipe.prototype.moduleId).prototype.name['en'] + '\n' + recipe.getMachineCount().toFixed(2) + 'x ' + recipe.recipe.crafter.prototype.name['en'],
			title: recipe.getMachineTooltip(),
			shape: 'image',
			image: '/assets/images/' + model.getMaterialByModuleId(recipe.recipe.prototype.moduleId).prototype.iconSprite + '/' +
			 model.getMaterialByModuleId(recipe.recipe.prototype.moduleId).prototype.iconId + '.png',
		});
	}

}
