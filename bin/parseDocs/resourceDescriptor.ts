import {Strings} from '@src/Utils/Strings';
import {IResourceSchema} from '@src/Schema/IResourceSchema';

export default function parseResourceDescriptors(descriptors: {
	ClassName: string,
	mDecalSize: string,
	mDisplayName: string,
	mDescription: string,
	mStackSize: string,
}[]): IResourceSchema[]
{
	const result = [];
	for (const descriptor of descriptors) {
		result.push({
			item: descriptor.ClassName,
		});
	}
	return result;
}
