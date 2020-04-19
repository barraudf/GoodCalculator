import {MaterialAmount} from '@src/Data/MaterialAmount';
import {ISolverResultSingle} from 'javascript-lp-solver';
import {Solver} from '@src/Solver/Solver';
import model from '@src/Data/Model';
import {RecipeResult} from '@src/Tools/Production/RecipeResult';
import {ProductionToolResult} from '@src/Tools/Production/ProductionToolResult';

export class ProductionTool
{

	public production: MaterialAmount[] = [];
	public result: ProductionToolResult|undefined;

	public calculate(): void
	{
		const result = this.getResult();

		if (!result.feasible) {
			this.result = undefined;
			return;
		}

		const recipes: RecipeResult[] = [];

		for (const k in result) {
			if (!result.hasOwnProperty(k) || !k.includes('|') || result[k] < 1e-8) {
				continue;
			}
			const ids = k.split('|');
			const equipId: number = parseInt(ids[0], undefined);
			const moduleId: number = parseInt(ids[1], undefined);
			const craftDetail = model.getCraftDetail(equipId, moduleId);

			if (!craftDetail)
			{
				throw new Error('Unknown craft (equipId=' + equipId.toString() + ', moduleId=' + moduleId.toString());
			}
			recipes.push(new RecipeResult(craftDetail, result[k] / 15));
		}

		if (!recipes.length) {
			this.result = undefined;
			return;
		}

		this.result = new ProductionToolResult(recipes);
	}

	private getResult(): ISolverResultSingle
	{
		const result = Solver.solveProduction(this.production);
		if ('midpoint' in result) {
			return result.midpoint;
		} else {
			return result;
		}
	}

}
