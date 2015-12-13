//departements.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {DepartementsModel} from '../../data/departementsmodel';
//
export class Departements extends DepartementsModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
}// class Departements
