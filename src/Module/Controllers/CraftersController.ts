import data from '@src/Data/Data';
import model, { Model } from '@src/Data/Model';
import { Crafter } from '@src/Data/Crafter';

export class CraftersController
{

	public readonly model: Model = model;
	public crafters: Crafter[] = Object.values(model.crafters);
	public filter = '';

	public getFilteredCrafters(): Crafter[]
	{
		if (!this.filter) {
			return this.crafters;
		}

		return this.crafters.filter((crafter) => {
			return crafter.toString().toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

}
