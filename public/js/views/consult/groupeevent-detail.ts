// groupeevent-detail.ts
import {InfoUserInfo} from '../common/infouserinfo';
import {GroupeEventDetailModel} from '../../data/groupeeventdetailmodel';

export class GroupeeventsDetail extends GroupeEventDetailModel {
	 //
	static inject() { return [InfoUserInfo]; }
  //
  constructor(userinfo: InfoUserInfo) {
    super(userinfo);
  }
}// class Profgroupeevents
