import rawData from '@data/data.json';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {Material} from '@src/Data/Material';
import {Crafter} from '@src/Data/Crafter';
import { CraftDetail } from './CraftDetail';
import angular from 'angular';

export class Model
{

	public materials: {[key: number]: Material} = {};
	public crafters: {[key: number]: Crafter} = {};
	public language: string = 'en';
	public cycleLength: number = 15;
	public cycleNames: {[key: number]: string} = {15: 'Day', 105: 'Week', 450: 'Month'};

	private constructor(public readonly data: IJsonSchema)
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

		const $injector = angular.injector(['ngCookies']);
		$injector.invoke(['$cookies', ($cookies: any) => this.loadCookies($cookies)]);
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

	public static Instanciate(data: IJsonSchema): Model
	{
		return new Model(data);
	}

	private loadCookies($cookies: any)
	{
		for (const k in this.crafters) {
			const crafter = this.crafters[k];
			const locked: boolean = $cookies.get('Locked' + crafter.prototype.equipId);
			if (locked)
			{
				crafter.unlocked = false;
			}
		}

		const lang = $cookies.get('language');
		if (lang) {
			this.language = lang;
		}

		const cycle = $cookies.get('cycleLength');
		if (cycle) {
			this.cycleLength = parseInt(cycle, undefined);
		}
	}

}

export default Model.Instanciate(rawData as any);
