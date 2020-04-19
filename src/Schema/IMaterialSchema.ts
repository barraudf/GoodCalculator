import {IMaterialAmountSchema} from '@src/Schema/IMaterialAmountSchema';
import {ILocalizedStringSchema} from '@src/Schema/ILocalizedStringSchema';

export interface IMaterialSchema
{

	materialId: number;
	moduleCategory: string;
	iconId: string;
	stackBuyPrice: number;
	iconSprite: string;
	stackSize: number;
	inputMaterials?: IMaterialAmountSchema[];
	outputAmount?: number;
	sellPrice?: number;
	moduleId?: number;
	name: ILocalizedStringSchema;

}
