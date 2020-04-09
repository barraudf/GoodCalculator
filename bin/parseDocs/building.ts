import {Strings} from '@src/Utils/Strings';
import {IBuildingSchema} from '@src/Schema/IBuildingSchema';

export default function parseBuildings(buildings: {
	ClassName: string,
	mDisplayName: string,
	mDescription: string,
}[], fixClassName: boolean = false): IBuildingSchema[]
{
	const result: IBuildingSchema[] = [];
	for (const building of buildings) {

		result.push({
			slug: Strings.webalize(building.mDisplayName),
			name: building.mDisplayName,
			description: building.mDescription.replace(/\r\n/ig, '\n'),
			categories: [],
			className: fixClassName ? building.ClassName.replace('Build_', 'Desc_') : building.ClassName,
		});
	}
	return result;
}
