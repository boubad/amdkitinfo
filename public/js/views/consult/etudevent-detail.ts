//etudevent-detail.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {EtudiantEventDetailModel} from '../../data/etudianteventdetailmodel';
//
export class EtudeventDetail extends EtudiantEventDetailModel {
	//
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}// class Profgroupeevents
