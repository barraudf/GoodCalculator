import {ICraftDetailSchema} from '@src/Schema/ICraftDetailSchema';

export interface ICrafterSchema
{

	equipId: number;
	iconSprite: string;
	iconId: string;
	locaString: string;
	craftingList: ICraftDetailSchema[];
	name: {[locale: string]: string};

}
