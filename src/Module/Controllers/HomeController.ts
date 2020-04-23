import data from '@src/Data/Data';
import model, { Model } from '@src/Data/Model';
import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {RecentlyVisitedMaterialsService} from '@src/Module/Services/RecentlyVisitedItemsService';

export class HomeController
{

	public readonly model: Model = model;
	public materials: IMaterialSchema[] = Object.values(data.getAllMaterials());
	public filter = '';

	public static $inject = ['RecentlyVisitedMaterialsService'];

	public constructor(public recentlyVisited: RecentlyVisitedMaterialsService) {}

	public getFilteredMaterials(): IMaterialSchema[]
	{
		if (!this.filter) {
			return this.materials;
		}

		return this.materials.filter((material) => {
			return material.name[model.language].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

	public getMaterialById(materialId: number): IMaterialSchema|null
	{
		return data.getMaterialById(materialId);
	}

}
