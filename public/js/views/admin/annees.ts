//annees.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {AnneesModel} from '../../data/anneesmodel';
//
export class Annees extends AnneesModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
}// class Annees
