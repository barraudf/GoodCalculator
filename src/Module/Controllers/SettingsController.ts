import model from '@src/Data/Model';
import { Crafter } from '@src/Data/Crafter';

export class SettingsController
{

	public crafters: Crafter[];

	public static $inject = ['$cookies'];

	public constructor(private $cookies: any)
	{
		this.crafters = Object.values(model.crafters);

		// TODO : load globally
		this.crafters.forEach((crafter: Crafter) => {
			const locked: boolean = this.$cookies.get('Locked' + crafter.prototype.equipId);
			if (locked)
			{
				crafter.unlocked = false;
			}
		});
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
	}

}
