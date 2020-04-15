import {Material} from '@src/Data/Material';
import { IMaterialAmountSchema } from '@src/Schema/IMaterialAmountSchema';


export class MaterialAmount
{

	public constructor(public readonly material: Material, public readonly prototype: IMaterialAmountSchema)
	{

	}

}
