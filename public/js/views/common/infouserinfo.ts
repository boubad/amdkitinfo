//infouserinfo.ts
//
import {UserInfo} from '../../data/userinfo';
import {InfoUIManager} from './infouimanager';
//
export class InfoUserInfo extends UserInfo {
	//
	static inject() { return [InfoUIManager]; }
	//
	public constructor(serv:InfoUIManager){
		super(serv);
	}
}