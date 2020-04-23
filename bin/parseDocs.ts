import * as fs from 'fs';
import * as path from 'path';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
const download = require('download');
import parseMaterial from '@bin/parseDocs/Material';
import parseCrafter from '@bin/parseDocs/Crafter';

const materialsDocs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'materials.json')).toString());
const equipmentsDocs  = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'equipment.json')).toString());

const json: IJsonSchema = {
	materials: [],
	crafters: []
};

for (const material of parseMaterial(materialsDocs.materials)) {

	json.materials.push(material);
	(async () => {
		const url: string = 'https://goodcompanygame.com/icons/' + material.iconSprite + '/' + material.iconId + '.png';
		const dest: string = path.join(__dirname, '..', 'www', 'assets', 'images', material.iconSprite);
		await download(url, dest);
	})();
}

for (const crafter of parseCrafter(equipmentsDocs.equipment)) {

	json.crafters.push(crafter);
	(async () => {
		const url: string = 'https://goodcompanygame.com/icons/' + crafter.iconSprite + '/' + crafter.iconId + '.png';
		const dest: string = path.join(__dirname, '..', 'www', 'assets', 'images', crafter.iconSprite);
		await download(url, dest);
	})();
}

fs.writeFileSync(path.join(__dirname, '..', 'data', 'data.json'), JSON.stringify(json, null, '\t') + '\n');
