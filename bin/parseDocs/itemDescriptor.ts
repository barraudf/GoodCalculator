import {IItemSchema} from '@src/Schema/IItemSchema';
import {Strings} from '@src/Utils/Strings';
import {Arrays} from '@src/Utils/Arrays';
import parseItemAmount from '@bin/parseDocs/itemAmount';

export default function parseItemDescriptors(items: {
	mDisplayName: string,
	mDescription: string,
	mStackSize: string,
	module_category: string,
	mIngredients: string;
}[])
{
	const result: IItemSchema[] = [];
	for (const item of items) {
		result.push({
			module_category: item.module_category,
			slug: Strings.webalize(item.mDisplayName),
			name: item.mDisplayName,
			description: item.mDescription.replace(/\r\n/ig, '\n'),
			stackSize: Strings.stackSizeFromEnum(item.mStackSize),
			ingredients: Arrays.ensureArray(Strings.unserializeDocs(item.mIngredients)).map(parseItemAmount),
		});
	}
	return result;
}
