import model from '@src/Data/Model';
import data from '@src/Data/Data';
import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {ITransitionObject} from '@src/Types/ITransitionObject';
import {ICrafterSchema} from '@src/Schema/ICrafterSchema';

export class CrafterController
{
	public crafter: ICrafterSchema;

	public static $inject = ['$state', '$transition$', 'RecentlyVisitedMaterialsService'];

	public constructor($state: any, $transition$: ITransitionObject<{crafter: string}>)
	{

		const crafter = data.getCrafterById(parseInt($transition$.params().crafter, undefined));
		if (crafter === null) {
			$state.go('home');
			return;
		}
		this.crafter = crafter;
	}

	public getMaterialByModuleId(moduleId: number): IMaterialSchema|null
	{
		for (const key in model.materials) {
			const material = model.materials[key];
			if (material.prototype.moduleId && material.prototype.moduleId === moduleId) {
				return material.prototype;
			}
		}

		return null;
	}

	public getMaterialById(materialId: number): IMaterialSchema|null
	{

		if (materialId in model.materials) {
			return model.materials[materialId].prototype;
		}

		return null;
	}
}
