//semestres.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {SemestresModel} from '../../data/semestresmodel';
//
export class Semestres extends SemestresModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
}// class SEmestres
