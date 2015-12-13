//home.ts
import {HomeModel} from '../../data/homemodel';
import {InfoUserInfo} from './infouserinfo';

//
export class Home extends HomeModel {
	//
	static inject() { return [InfoUserInfo] }
	//
	//
	constructor(info: InfoUserInfo) {
		super(info);
	}
}// class Home

