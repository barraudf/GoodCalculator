const download = require('download');
import * as path from 'path';


const dataFileList: {[key: string]: string} = {
	'materials.json': 'https://goodcompanygame.com/gamedata/materials.json',
	'equipment.json': 'https://goodcompanygame.com/gamedata/equipment.json',
	'goodcompanyBase_de.json': 'https://goodcompanygame.com/localization/goodcompanyBase_de.json',
	'goodcompanyBase_en.json': 'https://goodcompanygame.com/localization/goodcompanyBase_en.json',
	'goodcompanyBase_es.json': 'https://goodcompanygame.com/localization/goodcompanyBase_es.json',
	'goodcompanyBase_fr.json': 'https://goodcompanygame.com/localization/goodcompanyBase_fr.json',
	'goodcompanyBase_ja.json': 'https://goodcompanygame.com/localization/goodcompanyBase_ja.json',
	'goodcompanyBase_pt.json': 'https://goodcompanygame.com/localization/goodcompanyBase_pt.json',
	'goodcompanyBase_ru.json': 'https://goodcompanygame.com/localization/goodcompanyBase_ru.json',
	'goodcompanyBase_zh.json': 'https://goodcompanygame.com/localization/goodcompanyBase_zh.json',
};


(async () => {
	await Promise.all(
		Object.values(dataFileList)
	.map(url => {
		const dest = path.join(__dirname, '..', 'data');
		console.log('Download : ' + url + ' to ' + dest);
		download(url, dest)}));
})();
