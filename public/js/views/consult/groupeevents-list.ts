//groupeeeventslistmodel.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {BaseGroupeEventListModel} from '../../data/groupeeventslistmodel';
//
export class GroupeEventListModel extends BaseGroupeEventListModel {
    //
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }// constructor
}// class GroupeEventListModel
