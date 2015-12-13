// groupeevents.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {GroupeEventsModel} from '../../data/groupeeventsmodel';
//
export class GroupeEvents extends GroupeEventsModel {
	//
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }// constructor
}// class Profgroupeevents
