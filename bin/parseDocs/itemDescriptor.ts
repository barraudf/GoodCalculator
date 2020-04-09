import {IItemSchema} from '@src/Schema/IItemSchema';
import {Strings} from '@src/Utils/Strings';

export default function parseItemDescriptors(items: {
	ClassName: string,
	mDisplayName: string,
	mDescription: string,
	mStackSize: string,
}[])
{
	const result: IItemSchema[] = [];
	for (const item of items) {
		result.push({
			slug: Strings.webalize(item.mDisplayName),
			className: item.ClassName,
			name: item.mDisplayName,
			description: item.mDescription.replace(/\r\n/ig, '\n'),
			stackSize: Strings.stackSizeFromEnum(item.mStackSize),
		});
	}
	return result;
}
