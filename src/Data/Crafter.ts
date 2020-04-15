import {Model} from '@src/Data/Model';
import {CraftDetail} from '@src/Data/CraftDetail';
import {ICrafterSchema} from '@src/Schema/ICrafterSchema';

export class Crafter
{

	public readonly craftingList: CraftDetail[] = [];

	public constructor(private readonly model: Model, public readonly prototype: ICrafterSchema)
	{
		for (const craft of prototype.craftingList) {
			this.craftingList.push(new CraftDetail(this, craft));
		}
	}

}
