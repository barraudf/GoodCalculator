import {IMaterialSchema} from '@src/Schema/IMaterialSchema';
import localize from '@bin/parseDocs/Localization';
import parseMaterialAmount from '@bin/parseDocs/MaterialAmount';

export default function parseMaterial(materials: {
    material_id: number,
    sell_price: number,
    icon_sprite: string,
    stack_buy_price: number,
    output_amount: number,
	icon_id: string,
	module_category: string,
    input_materials: any,
    loca_string: string,
    module_id: number,
    stack_size: number
}[])
{
	const result: IMaterialSchema[] = [];
	for (const material of materials) {
        const isRawMaterial: boolean = material.module_category === 'cat_material';

		result.push({
			materialId: material.material_id,
            moduleCategory: material.module_category,
            iconId: material.icon_id,
            stackBuyPrice: material.stack_buy_price,
            iconSprite: material.icon_sprite,
            stackSize: material.stack_size,
            outputAmount: isRawMaterial ? undefined : material.output_amount,
            sellPrice: isRawMaterial ? undefined : material.sell_price,
            moduleId: isRawMaterial ? undefined : material.module_id,
            name: localize(material.loca_string),
            inputMaterials: isRawMaterial ? undefined : parseMaterialAmount(material.input_materials)
		});
	}
	return result;
}
