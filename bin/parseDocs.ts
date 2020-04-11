import * as fs from 'fs';
import * as path from 'path';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {IItemSchema} from '@src/Schema/IItemSchema';
import parseItemDescriptors from '@bin/parseDocs/itemDescriptor';
import parseRecipes from '@bin/parseDocs/recipe';
import parseBuildings from '@bin/parseDocs/building';
import parseBuildingDescriptors from '@bin/parseDocs/buildingDescriptor';

const docs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'Docs.json')).toString());

const json: IJsonSchema = {
	recipes: {},
	items: {},
	buildings: {},
};

let biomass: IItemSchema[] = [];
let extraInfo: any[] = [];

for (const definitions of docs) {
	switch (definitions.NativeClass) {
		case 'Class\'/Script/FactoryGame.FGItemDescriptor\'':
		case 'Class\'/Script/FactoryGame.FGEquipmentDescriptor\'':
		case 'Class\'/Script/FactoryGame.FGConsumableDescriptor\'':
		case 'Class\'/Script/FactoryGame.FGItemDescriptorNuclearFuel\'':
			for (const item of parseItemDescriptors(definitions.Classes)) {
				json.items[item.className] = item;
			}
			break;
		case 'Class\'/Script/FactoryGame.FGRecipe\'':
			for (const recipe of parseRecipes(definitions.Classes)) {
				json.recipes[recipe.className] = recipe;
			}
			break;
		case 'Class\'/Script/FactoryGame.FGBuildablePole\'':
		case 'Class\'/Script/FactoryGame.FGBuildableConveyorBelt\'':
		case 'Class\'/Script/FactoryGame.FGBuildableWire\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePowerPole\'':
		case 'Class\'/Script/FactoryGame.FGBuildableTradingPost\'':
		case 'Class\'/Script/FactoryGame.FGBuildableSpaceElevator\'':
		case 'Class\'/Script/FactoryGame.FGBuildableManufacturer\'':
		case 'Class\'/Script/FactoryGame.FGBuildableStorage\'':
		case 'Class\'/Script/FactoryGame.FGBuildable\'':
		case 'Class\'/Script/FactoryGame.FGBuildableWall\'':
		case 'Class\'/Script/FactoryGame.FGBuildableStair\'':
		case 'Class\'/Script/FactoryGame.FGBuildableConveyorLift\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePipelineSupport\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePipeline\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePipelineJunction\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePipelinePump\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePipeReservoir\'':
		case 'Class\'/Script/FactoryGame.FGBuildableTrainPlatformCargo\'':
		case 'Class\'/Script/FactoryGame.FGBuildableRailroadStation\'':
		case 'Class\'/Script/FactoryGame.FGBuildableRailroadTrack\'':
		case 'Class\'/Script/FactoryGame.FGBuildableFoundation\'':
		case 'Class\'/Script/FactoryGame.FGBuildableFactory\'':
		case 'Class\'/Script/FactoryGame.FGBuildableAttachmentMerger\'':
		case 'Class\'/Script/FactoryGame.FGBuildableAttachmentSplitter\'':
		case 'Class\'/Script/FactoryGame.FGBuildableResourceSink\'':
		case 'Class\'/Script/FactoryGame.FGBuildableResourceSinkShop\'':
		case 'Class\'/Script/FactoryGame.FGConveyorPoleStackable\'':
		case 'Class\'/Script/FactoryGame.FGBuildableDockingStation\'':
		case 'Class\'/Script/FactoryGame.FGPipeHyperStart\'':
		case 'Class\'/Script/FactoryGame.FGBuildablePipeHyper\'':
		case 'Class\'/Script/FactoryGame.FGBuildableTrainPlatformEmpty\'':
		case 'Class\'/Script/FactoryGame.FGBuildableSplitterSmart\'':
		case 'Class\'/Script/FactoryGame.FGBuildableWalkway\'':
			for (const building of parseBuildings(definitions.Classes, true)) {
				json.buildings[building.className] = building;
			}
			break;
		case 'Class\'/Script/FactoryGame.FGBuildingDescriptor\'':
			extraInfo = parseBuildingDescriptors(definitions.Classes);
			break;
	}
}

// add extra info to buildings
for (const info of extraInfo) {
	for (const key in json.buildings) {
		if (info.className === json.buildings[key].className) {
			json.buildings[key].categories = info.categories;
			break;
		}
	}
}

// convert liquid requirements to m3
for (const key in json.recipes) {
	const recipe = json.recipes[key];

	for (const ingredient of recipe.ingredients) {
		if (!json.items[ingredient.item]) {
			throw new Error('Invalid item ' + ingredient.item);
		}
	}
	for (const product of recipe.products) {
		if (!json.items[product.item]) {
			continue;
		}
	}
}

fs.writeFileSync(path.join(__dirname, '..', 'data', 'data.json'), JSON.stringify(json, null, '\t') + '\n');
