import {IMachinesResult} from '@src/Tools/Production/IMachinesResult';
import { CraftDetail } from '@src/Data/CraftDetail';
import { Material } from '@src/Data/Material';
import model from '@src/Data/Model';

export class RecipeResult
{

	public machine: IMachinesResult;
	public nodeId: number;
	public productAmountCache: {
		product: Material,
		amount: number,
		maxAmount: number,
	};

	public constructor(public readonly recipe: CraftDetail, public readonly amount: number)
	{
		const machines = amount * recipe.getTotalCraftingTime();
		this.machine = {
			amount: machines,
			maxAmount: null,
			overclock: 100,
			lastMachineOverclock: 100,
		};

		const product: Material = model.getMaterialByModuleId(recipe.prototype.moduleId);
		const itemsPerMachine = model.cycleLength * recipe.getTotalCraftingTime();
		this.productAmountCache = {
			product: product,
			maxAmount: itemsPerMachine * machines * (product.prototype.outputAmount ? product.prototype.outputAmount : 0),
			amount: itemsPerMachine * machines * (product.prototype.outputAmount ? product.prototype.outputAmount : 0),
		};
	}

	public getMachineCount(): number
	{
		return this.machine.amount;
	}

	public getMachineTooltip(): string
	{
		return this.machine.amount.toFixed(2) + 'x at ' + this.machine.overclock + '%';
	}

}
