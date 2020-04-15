import data from '@src/Data/Data';
import model from '@src/Data/Model';
import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {ITransitionObject} from '@src/Types/ITransitionObject';
import {ICrafterSchema} from '@src/Schema/ICrafterSchema';
import {RecentlyVisitedMaterialsService} from '@src/Module/Services/RecentlyVisitedItemsService';
import { ICraftDetailSchema } from '@src/Schema/ICraftDetailSchema';

export class MaterialController
{

	public material: IMaterialSchema;
	public recipesAsOutput: ICraftDetailSchema[];
	public recipesAsInput: IMaterialSchema[];

	public static $inject = ['$state', '$transition$', 'RecentlyVisitedMaterialsService'];

	public constructor($state: any, $transition$: ITransitionObject<{material: string}>, recentlyVisitedMaterialsService: RecentlyVisitedMaterialsService)
	{
		const material = data.getMaterialById(parseInt($transition$.params().material, undefined));
		if (material === null) {
			$state.go('home');
			return;
		}
		recentlyVisitedMaterialsService.addVisited(material.materialId);
		this.material = material;
		this.recipesAsOutput = data.getRecipesForMaterialOutput(material);
		this.recipesAsInput = data.getRecipesForMaterialInput(material);
	}

	public getMaterial(materialId: number): IMaterialSchema|null
	{
		if (materialId in model.materials) {
			return model.materials[materialId].prototype;
		}

		return null;
	}

	public getCrafter(equipId: number): ICrafterSchema|null
	{
		if (equipId in model.crafters) {
			return model.crafters[equipId].prototype;
		}

		return null;
	}

}
