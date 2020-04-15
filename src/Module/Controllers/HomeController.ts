import data from '@src/Data/Data';
import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {RecentlyVisitedMaterialsService} from '@src/Module/Services/RecentlyVisitedItemsService';

export class HomeController
{

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
			return material.name['en'].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

	public getMaterialById(materialId: number): IMaterialSchema|null
	{
		return data.getMaterialById(materialId);
	}

}
