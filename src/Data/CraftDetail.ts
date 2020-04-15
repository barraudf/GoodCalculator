import {Crafter} from '@src/Data/Crafter';
import { Material } from './Material';
import { ICraftDetailSchema } from '@src/Schema/ICraftDetailSchema';

export class CraftDetail
{

	public constructor(public readonly crafter: Crafter, public readonly prototype: ICraftDetailSchema)
	{

	}

}
