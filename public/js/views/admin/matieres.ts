//matieres.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {MatieresModel} from '../../data/matieresmodel';
//
export class Matieres extends MatieresModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
}// class MatieresModel
