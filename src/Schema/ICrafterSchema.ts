import {ICraftDetailSchema} from '@src/Schema/ICraftDetailSchema';
import { ILocalizedStringSchema } from './ILocalizedStringSchema';

export interface ICrafterSchema
{

	equipId: number;
	iconSprite: string;
	iconId: string;
	craftingList: ICraftDetailSchema[];
	name: ILocalizedStringSchema;

}
