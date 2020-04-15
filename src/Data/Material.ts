import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import {Model} from '@src/Data/Model';
import {MaterialAmount} from '@src/Data/MaterialAmount';

export class Material
{
	public readonly inputMaterials: MaterialAmount[] = [];

	public constructor(private readonly model: Model, public readonly prototype: IMaterialSchema)
	{
		if (prototype.inputMaterials) {
			for (const ingredient of prototype.inputMaterials) {
				this.inputMaterials.push(new MaterialAmount(model.getMaterial(ingredient.materialId), ingredient));
			}
		}
	}

	public static isRawResource(material: Material): boolean
	{
		return material.prototype.moduleCategory === 'cat_material';
	}
}
