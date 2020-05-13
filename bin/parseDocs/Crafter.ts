import {ICrafterSchema} from '@src/Schema/ICrafterSchema';
import localize from '@bin/parseDocs/Localization';
import parseCraftDetail from '@bin/parseDocs/CraftDetail';
import { createDeflateRaw } from 'zlib';

export default function parseCrafters(crafters: {
	equip_id: number,
	icon_id: string,
	icon_sprite: string,
	crafter_properties?: any,
	loca_string: string
}[]): ICrafterSchema[]
{
	const result: ICrafterSchema[] = [];
	for (const crafter of crafters) {
		if ( (crafter.crafter_properties && crafter.crafter_properties.length === 0) || crafter.equip_id === 3) {
			// Not a crafter or Assembly Table
			continue;
		}

		result.push({
		equipId: crafter.equip_id,
		iconId: crafter.icon_id,
		iconSprite: crafter.icon_sprite,
		name: localize(crafter.loca_string),
		craftingList: parseCraftDetail(crafter.crafter_properties[0].crafting_list)
		});
	}
	return result;
}
