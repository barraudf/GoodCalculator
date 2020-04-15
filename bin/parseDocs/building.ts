import {Strings} from '@src/Utils/Strings';
import {IBuilderSchema} from '@src/Schema/IBuilderSchema';
import { IItemAmountSchema } from '@src/Schema/IItemAmountSchema';

export default function parseBuilders(builders: {
	slug: string,
	mDisplayName: string,
	mDescription: string,
	categories: string[],
	products: IItemAmountSchema
}[]): IBuilderSchema[]
{
	const result: IBuilderSchema[] = [];
	for (const building of builders) {

		result.push({
			slug: Strings.webalize(building.mDisplayName),
			name: building.mDisplayName,
			description: building.mDescription.replace(/\r\n/ig, '\n'),
			categories: [],
			products: []
		});
	}
	return result;
}
