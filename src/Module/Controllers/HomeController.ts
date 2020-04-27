import data from '@src/Data/Data';
import model, { Model } from '@src/Data/Model';
import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {RecentlyVisitedMaterialsService} from '@src/Module/Services/RecentlyVisitedItemsService';
import { Material } from '@src/Data/Material';

export class HomeController
{

	public readonly model: Model = model;
	public materials: Material[] = Object.values(model.materials);
	public filter = '';

	public static $inject = ['RecentlyVisitedMaterialsService'];

	public constructor(public recentlyVisited: RecentlyVisitedMaterialsService) {}

	public getFilteredMaterials(): Material[]
	{
		if (!this.filter) {
			return this.materials;
		}

		return this.materials.filter((material) => {
			return material.toString().toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

	public getMaterialById(materialId: number): IMaterialSchema|null
	{
		return data.getMaterialById(materialId);
	}

}
