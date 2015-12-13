//profaffectations.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {EnseignantAffectationsModel} from '../../data/enseignantaffectationsmodel';
//
export class Profaffectations extends EnseignantAffectationsModel {
    //
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
    //
   
}// class ProfAffectatios
