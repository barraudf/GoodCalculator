import {IMaterialAmountSchema} from '@src/Schema/IMaterialAmountSchema';

export default function parseMaterialAmount(input_materials: {
	icon_sprite: string, 
    icon_id: string, 
    loca_string: string, 
    material_id: number, 
    material_amount: number
}[]): IMaterialAmountSchema[]
{    
    const result: IMaterialAmountSchema[] = [];
	for (const input of input_materials) {
		result.push({
			materialId: input.material_id,
		    amount: input.material_amount
		});
	}
	return result;
}
