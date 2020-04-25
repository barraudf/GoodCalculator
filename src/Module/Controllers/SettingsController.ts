import model, { Model } from '@src/Data/Model';
import { Crafter } from '@src/Data/Crafter';

export class SettingsController
{

	public readonly model: Model = model;
	public crafters: Crafter[];

	public static $inject = ['$cookies'];

	public constructor(private $cookies: any)
	{
		this.crafters = Object.values(model.crafters);
	}

	public Save(): void
	{
		this.crafters.forEach((crafter: Crafter) => {
			if (!crafter.unlocked)
			{
				this.$cookies.put('Locked' + crafter.prototype.equipId, true);
			} else {
				this.$cookies.remove('Locked' + crafter.prototype.equipId);
			}
		});

		this.$cookies.put('language', this.model.language);
		this.$cookies.put('cycleLength', this.model.cycleLength);
	}

}
