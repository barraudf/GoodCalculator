import rawData from '@data/data.json';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {ICrafterSchema} from '@src/Schema/ICrafterSchema';
import { ICraftDetailSchema } from '@src/Schema/ICraftDetailSchema';

export class Data
{

	public getRawData(): IJsonSchema
	{
		return rawData as any;
	}

	public getAllMaterials(): IMaterialSchema[]
	{
		return this.getRawData().materials;
	}

	public getAllCrafters(): ICrafterSchema[]
	{
		return this.getRawData().crafters;
	}

	public getMaterialById(materialId: number): IMaterialSchema|null
	{
		const materials = this.getRawData().materials;
		for (const key in materials) {
			const material = materials[key];
			if (material.materialId === materialId) {
				return material;
			}
		}
		return null;
	}

	public getCrafterById(equipId: number): ICrafterSchema|null
	{
		const crafters = this.getRawData().crafters;
		for (const key in crafters) {
			const crafter = crafters[key];
			if (crafter.equipId === equipId) {
				return crafter;
			}
		}
		return null;
	}

	public getRecipesForMaterialOutput(material: IMaterialSchema): ICraftDetailSchema[]
	{
		const recipes: ICraftDetailSchema[] = [];
		if (!material.moduleId) {
			return recipes;
		}
		const crafters = this.getRawData().crafters;
		function addRecipes() {
			for (const key in crafters) {
				const crafter = crafters[key];
				for (const craft of crafter.craftingList) {
					if (craft.moduleId === material.moduleId) {
						craft.equipId = crafter.equipId;
						recipes.push(craft);
					}
				}
			}
		}
		addRecipes();
		return recipes;
	}

	public getRecipesForMaterialInput(material: IMaterialSchema): IMaterialSchema[]
	{
		const materials = this.getRawData().materials;
		const recipes: IMaterialSchema[] = [];
		function addRecipes() {
			for (const key in materials) {
				const materialOut = materials[key];
				if (materialOut.inputMaterials) {
					for (const materialIn of materialOut.inputMaterials) {
						if (material.materialId === materialIn.materialId) {
							recipes.push(materialOut);
						}
					}
				}
			}
		}
		addRecipes();
		return recipes;
	}
}

export default new Data;
