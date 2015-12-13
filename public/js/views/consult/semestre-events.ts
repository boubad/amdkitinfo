import {EtudEventReportModel} from '../../data/etudeventreportmodel';
import {InfoUserInfo} from '../common/infouserinfo';
//
export class SemestreEvents extends EtudEventReportModel {
     //
	static inject() { return [InfoUserInfo]; }
    //
	constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}
