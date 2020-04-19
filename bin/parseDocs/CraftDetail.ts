import {ICraftDetailSchema} from '@src/Schema/ICraftDetailSchema';

export default function parseCraftDetail(craftingList: {
	craft_duration: number, 
	module_id: number
}[]): ICraftDetailSchema[]
{
	const result: ICraftDetailSchema[] = [];
	for (const craft of craftingList) {
		result.push({
			moduleId: craft.module_id,
			craftDuration: craft.craft_duration
		});
	}

	return result;
}