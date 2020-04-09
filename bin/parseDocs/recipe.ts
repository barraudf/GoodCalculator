import {IRecipeSchema} from '@src/Schema/IRecipeSchema';
import {Strings} from '@src/Utils/Strings';
import {Arrays} from '@src/Utils/Arrays';
import parseItemAmount from '@bin/parseDocs/itemAmount';
import parseBlueprintClass from '@bin/parseDocs/blueprintClass';

export default function parseRecipes(recipes: {
	ClassName: string;
	mDisplayName: string;
	mIngredients: string;
	mProduct: string;
	mManufactoringDuration: string;
	mManualManufacturingMultiplier: string;
	mProducedIn: string;
}[]): IRecipeSchema[]
{
	const result: IRecipeSchema[] = [];

	recipeLoop:
	for (const recipe of recipes) {
		const producedIn = Arrays.ensureArray(Strings.unserializeDocs(recipe.mProducedIn)).map(parseBlueprintClass).map((className: string) => {
			return className.replace('Build_', 'Desc_');
		});

		const products = Arrays.ensureArray(Strings.unserializeDocs(recipe.mProduct)).map(parseItemAmount);

		const machines = [];
		for (const producer of producedIn) {
			machines.push(producer);
		}

		result.push({
			slug: Strings.webalize(recipe.mDisplayName),
			name: recipe.mDisplayName,
			className: recipe.ClassName,
			time: parseFloat(recipe.mManufactoringDuration),
			ingredients: Arrays.ensureArray(Strings.unserializeDocs(recipe.mIngredients)).map(parseItemAmount),
			products: products,
			producedIn: machines,
		});
	}
	return result;
}
