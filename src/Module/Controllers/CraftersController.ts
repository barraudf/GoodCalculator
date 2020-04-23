import data from '@src/Data/Data';
import model, { Model } from '@src/Data/Model';
import { ICrafterSchema } from '@src/Schema/ICrafterSchema';

export class CraftersController
{

	public readonly model: Model = model;
	public crafters: ICrafterSchema[] = data.getAllCrafters();
	public filter = '';

	public getFilteredCrafters(): ICrafterSchema[]
	{
		if (!this.filter) {
			return this.crafters;
		}

		return this.crafters.filter((crafter) => {
			return crafter.name[model.language].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

}
