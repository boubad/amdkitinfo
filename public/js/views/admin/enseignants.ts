//enseignants.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {EnseignantsModel} from '../../data/enseignantsmodel';
//
import {IEnseignant} from 'infodata';
export class Enseignants extends EnseignantsModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
}// class EnseignantsModel
