import {Model} from '@src/Data/Model';
import {CraftDetail} from '@src/Data/CraftDetail';
import {ICrafterSchema} from '@src/Schema/ICrafterSchema';

export class Crafter
{

	public readonly craftingList: {[key: string]: CraftDetail} = {};
	public unlocked: boolean = true;

	public constructor(public readonly model: Model, public readonly prototype: ICrafterSchema)
	{
		for (const craft of prototype.craftingList) {
			craft.equipId = prototype.equipId;
			this.craftingList[craft.moduleId] = new CraftDetail(this, craft);
		}
	}

	public getCraftDetail(moduleId: number): CraftDetail | null
	{
		for (const k in this.craftingList)
		{
			const craftDetail = this.craftingList[k];
			if (craftDetail.prototype.moduleId === moduleId)
			{
				return craftDetail;
			}
		}

		return null;
	}
}
