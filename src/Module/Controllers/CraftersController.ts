import data from '@src/Data/Data';
import { ICrafterSchema } from '@src/Schema/ICrafterSchema';

export class CraftersController
{

	public crafters: ICrafterSchema[] = data.getAllCrafters();
	public filter = '';

	public getFilteredCrafters(): ICrafterSchema[]
	{
		if (!this.filter) {
			return this.crafters;
		}

		return this.crafters.filter((crafter) => {
			return crafter.name['en'].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

}
