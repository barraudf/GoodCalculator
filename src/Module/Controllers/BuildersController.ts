import data from '@src/Data/Data';
import {RecentlyVisitedItemsService} from '@src/Module/Services/RecentlyVisitedItemsService';
import { IBuildingSchema } from '@src/Schema/IBuildingSchema';

export class BuildersController
{

	public builders: IBuildingSchema[] = Object.values(data.getAllBuilders());
	public filter = '';

	public getFilteredBuilders(): IBuildingSchema[]
	{
		if (!this.filter) {
			return this.builders;
		}

		return this.builders.filter((builder) => {
			return builder.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
		});
	}

}
