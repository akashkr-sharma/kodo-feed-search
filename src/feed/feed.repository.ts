
import {FeedDto} from "./dto/feed.dto";
import feedData from '../../data/mock_data.json';

export class FeedRepository {
    
    Data:Array<FeedDto>
    
    /**
     * 
     * @param Data used to store mock data
     * if constructor will be call without mock data 
     *      then 
     *      1) mock data will be imported 
     *      2) data will be sorted based on dateLastEdited in desc order
     * 
     */
    constructor(Data: Array<FeedDto>=[]){
        this.Data = Data;

        if(! this.Data.length) {
            this.importData();
        }
        this.sortData()
    }

    importData() {
        for(let i=0; i<feedData.length; i++){            
            this.Data.push(new FeedDto(feedData[i]));
        }
    }

    sortData() {
        this.Data.sort((obj1, obj2) => {
            if (obj1.dateLastEdited <= obj2.dateLastEdited)
                return 1
            else
                return -1
        })
    }

    
    /**
     * 
     * @param feedDtoObject is type of FeedDto 
     * if we need to create feedData then using create function we can add data in @param Data
     * and then sort those on the basis of dateLastEdited key in desc order
     */
    /**
     * create(feedDtoObject: FeedDto){
     *  this.Data.push(new FeedDto(feedDtoObject));
     * this.sortData()
     * }
     */

    /**
     * 
     * @param words 
     * @param caseInsensetive 
     * will change the words in one type case. we can either convert the string in upper case or lower case
     * @returns Array<string>
     */
    private _caseInsensetiveTypeWords(words: Array<string>, caseInsensetive):Array<string>{
        if(words.length && caseInsensetive){
            words = words.length && words.map((element) => {
                return element.toUpperCase();
            })
        }
        return words
    }


    /**
     * 
     * @param value: string
     * @param pattern: Regex
     * @param words 
     * @param caseInsensetive 
     * after matching the regex pattern will check weather the words are case sensetive or not 
     * if it is case sensetive then we match the found words exectly with required word
     * but if it is not then will have to ignore the case and then match the required words with the result
     * @returns Boolean
     */
    private _fieldValueMatch(value: string, pattern: RegExp, words: Array<string>, caseInsensetive: Boolean): Boolean{
        let result: Array<string> = value.match(pattern);
        let res = false;
        if(!result)
            return res

        result = this._caseInsensetiveTypeWords(result, caseInsensetive);

        for(let i in words){
            const element = words[i];
            if(result.length && !result.includes(element)){
                return res
            }
        }
        return true;

    }

    /**
     * 
     * @param pattern 
     * @param words 
     * @param queryField 
     * @param caseInsensetive 
     * queryFields are given to check the string match with given pattern if match has been found in any of the 
     * queryFields then return the result
     * @returns Array<FeedDto>
     */
    find(pattern: RegExp, words: Array<string>, queryField: Array<string>, caseInsensetive: Boolean =false): Array<FeedDto>{
        return this.Data.reduce((arr, obj) => {
            
            words = this._caseInsensetiveTypeWords(words, caseInsensetive);

            const fields = Object.keys(obj)
            for (let idx in queryField){
                const field = queryField[idx];
                if (!fields.includes(field)){
                    throw new Error("Field does't exist");
                }
                if(this._fieldValueMatch(obj[field], pattern, words, caseInsensetive)){
                    arr.push(obj);
                    break;
                }
            }
            return arr;
        }, [])
    }

    findAll(): Array<FeedDto>{
        return this.Data;
    }


}



