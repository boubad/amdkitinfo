//synchro-view.ts
//
import {InfoUserInfo} from './infouserinfo';
import {SynchroModel} from '../../data/synchromodel';
//
//
export class SynchroView extends SynchroModel {
	//
	public static inject() { return [InfoUserInfo]; }
	//
	constructor(info: InfoUserInfo) {
		super(info);
	}
}// SynchroView 
