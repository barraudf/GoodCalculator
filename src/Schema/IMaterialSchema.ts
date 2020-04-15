import {IMaterialAmountSchema} from '@src/Schema/IMaterialAmountSchema';

export interface IMaterialSchema
{

	materialId: number;
	moduleCategory: string;
	iconId: string;
	stackBuyPrice: number;
	locaString: string;
	iconSprite: string;
	stackSize: number;
	inputMaterials?: IMaterialAmountSchema[];
	outputAmount?: number;
	sellPrice?: number;
	moduleId?: number;
	name: {[locale: string]: string};
}
