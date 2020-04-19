import model from '@src/Data/Model';
import {default as solver, ISolverModel, ISolverResult, ISolverResultSingle} from 'javascript-lp-solver';
import {MaterialAmount} from '@src/Data/MaterialAmount';
import {Material} from '@src/Data/Material';
import { CraftDetail } from '@src/Data/CraftDetail';

export class Solver
{

	public static solveProduction(production: MaterialAmount[]): ISolverResult|ISolverResultSingle
	{
		const solverModel: ISolverModel = {
			optimize: {},
			constraints: {},
			variables: {},
		};

		for (const k in model.materials) {
			const material = model.materials[k];
			if (!Material.isRawResource(material)) {
				solverModel.constraints[material.prototype.materialId] = {
					min: 0,
				};
			} else {
				solverModel.constraints[material.prototype.materialId] = {
					max: 0,
				};
			}

			let fastest: CraftDetail | null = null ;
			for (const l in model.crafters) {
				const crafter = model.crafters[l];

				for (const m in crafter.craftingList) {
					const craft = crafter.craftingList[m];

					if (craft.prototype.moduleId !== material.prototype.moduleId || crafter.unlocked === false) {
						continue;
					}

					if (fastest === null || craft.prototype.craftDuration < fastest.prototype.craftDuration) {
						fastest = craft;
					}
				}
			}

			if (fastest != null) {
				const def: {[key: string]: number} = {};
				for (const input of material.inputMaterials) {
					def[input.prototype.materialId] = -input.prototype.amount;
				}
				def[material.prototype.materialId] = material.prototype.outputAmount ? material.prototype.outputAmount : 0;
				solverModel.variables[fastest.prototype.equipId + '|' + material.prototype.moduleId] = def;
			}
		}

		for (const materialAmount of production) {
			delete solverModel.optimize[materialAmount.material.prototype.materialId];
			solverModel.constraints[materialAmount.material.prototype.materialId] = {
				equal: materialAmount.prototype.amount,
			};
		}

		return solver.Solve(solverModel);
	}

}
