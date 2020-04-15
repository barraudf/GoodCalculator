import rawData from '@data/data.json';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {Material} from '@src/Data/Material';
import {Crafter} from '@src/Data/Crafter';

export class Model
{

	public materials: {[key: number]: Material} = {};
	public crafters: {[key: number]: Crafter} = {};

	public constructor(public readonly data: IJsonSchema)
	{
		for (const k in data.materials) {
			const material = data.materials[k];
			this.materials[material.materialId] = new Material(this, material);
		}
		for (const k in data.crafters) {
			const crafter = data.crafters[k];
			this.crafters[crafter.equipId] = new Crafter(this, crafter);
		}
	}

	public getMaterial(materialId: number): Material
	{
		if (materialId in this.materials) {
			return this.materials[materialId];
		}
		throw new Error('Unknown material ' + materialId.toString());
	}

	public getCraftableMaterials(): Material[]
	{
		const materials: Material[] = [];
		for (const k in this.materials) {
			const material = this.materials[k];
			if (!Material.isRawResource(material)) {
				materials.push(material);
			}
		}
		return materials;
	}

	public getCrafter(equipId: number): Crafter
	{
		if (equipId in this.crafters) {
			return this.crafters[equipId];
		}
		throw new Error('Unknown material ' + equipId.toString());
	}

}

export default new Model(rawData as any);
