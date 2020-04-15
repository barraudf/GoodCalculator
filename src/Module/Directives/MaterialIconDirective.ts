import {IDirective} from 'angular';

export class MaterialIconDirective implements IDirective
{

	public restrict = 'E';
	public template = require('@templates/Directives/materialIcon.html');
	public scope = {
		material: '=material',
		size: '=size',
	};

}
