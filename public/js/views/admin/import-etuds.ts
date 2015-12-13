//import-etuds.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {ImportAffectationModel} from '../../data/importaffectationsmodel';
//
export class ImportEtuds extends ImportAffectationModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }// constructor
}// class ImportEtuds
