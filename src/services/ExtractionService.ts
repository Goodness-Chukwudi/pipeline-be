import csv from "csvtojson"
import {Model, ClientSession} from "mongoose";


class ExtractionService {

    public devCsvToJson(csvFilePath: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            csv().fromFile(csvFilePath)
            .then((jsonObjects: any[]) => {
                
                for (let i = 0; i < jsonObjects.length; i++) {
                    const dev = jsonObjects[i];
                    const pointString = dev.geometry.substring(7, dev.geometry.length-1)
                    const pointArray = pointString.split(" ");
                    dev.geometry = {
                        type: "Point",
                        coordinates: [parseFloat(pointArray[0]), parseFloat(pointArray[1])]
                    }

                    if (!dev.hireable) dev.hireable = false;
                    if (dev.hireable == "TRUE") dev.hireable = true;
                    dev.organizations = this.parseArray(dev.organizations);
                    dev.following_list = this.parseArray(dev.following_list);
                    dev.follower_list = this.parseArray(dev.follower_list);
                    dev.languages = this.parseArray(dev.languages);
                }
                resolve(jsonObjects);
            })
        });
    }

    public async saveCsvToDB<T> (csvFilePath: string, Schema: Model<T>, session: ClientSession) {
        const data = await this.devCsvToJson(csvFilePath);
        Schema.insertMany(data, {session: session})
        .then((savedDocuments: any) => {
            console.log(savedDocuments[37])
        })
        .catch((e:Error) => {
            console.log(e);
        });
    }


    private parseArray(value: string) {
        if (value) {
            const stringArray = value.replace(/'/g, '"');
            return JSON.parse(stringArray);
        }
        return [];
    } 

    private parseObject(value: string) {
        if (value) {
            const regexForQoutes = /(?<!(^|,))'(?!(,|$))/g;
            let stringObject = value.replace(regexForQoutes, '');
            stringObject = stringObject.replace(/'/g, '"');
            stringObject = stringObject.replace(/I"m/g, "I\'m");
            stringObject = stringObject.replace(/n"t/g, "n\'t");
            stringObject = stringObject.replace(/"s/g, "\'s");
            stringObject = stringObject.replace(/None/g, '""');
            stringObject = stringObject.replace(/\n/g, ' ');
            return JSON.parse(stringObject);
        }
        return [];
    }
}

export default ExtractionService;
