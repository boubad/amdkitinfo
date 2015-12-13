//administrators.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {AdministratorsModel} from '../../data/administratorsmodel';
//
export class Administrators extends AdministratorsModel {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
    }// constructor
}// class DepartementModel
