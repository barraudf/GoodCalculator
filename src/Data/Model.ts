import rawData from '@data/data.json';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {Material} from '@src/Data/Material';
import {Crafter} from '@src/Data/Crafter';
import { CraftDetail } from './CraftDetail';

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
		for (const key in this.materials)
		{
			this.materials[key].LoadInputMaterials();
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

	public getMaterialByModuleId(moduleId: number): Material
	{
		for (const k in this.materials) {
			const material = this.materials[k];
			if (material.prototype.moduleId === moduleId) {
				return material;
			}
		}
		throw new Error('Unknown material with moduleId : ' + moduleId.toString());
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

	public getCraftDetail(equipId: number, moduleId: number): CraftDetail | null
	{
		const crafter = this.getCrafter(equipId);
		if (crafter)
		{
			return crafter.getCraftDetail(moduleId);
		}

		return null;
	}

}

export default new Model(rawData as any);
