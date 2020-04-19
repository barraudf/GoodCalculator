import { ILocalizedStringSchema } from "@src/Schema/ILocalizedStringSchema"
import * as fs from 'fs';
import * as path from 'path';


const locEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_en.json')).toString());
const locDe = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_de.json')).toString());
const locFr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_fr.json')).toString());
const locEs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_es.json')).toString());
const locPt = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_pt.json')).toString());
const locRu = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_ru.json')).toString());
const locJa = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_ja.json')).toString());
const locZh = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'goodcompanyBase_zh.json')).toString());


export default function localize(locaString: string): ILocalizedStringSchema
{
    const result: ILocalizedStringSchema = {
        'en': localizeSingle(locaString, locEn),
        'de': localizeSingle(locaString, locDe),
        'fr': localizeSingle(locaString, locFr),
        'es': localizeSingle(locaString, locEs),
        'pt': localizeSingle(locaString, locPt),
        'ru': localizeSingle(locaString, locRu),
        'ja': localizeSingle(locaString, locJa),
        'zh': localizeSingle(locaString, locZh)
    }

    return result;
}

function localizeSingle(locaString: string, locJson: any) : string
{
    return locJson[locaString];
}
