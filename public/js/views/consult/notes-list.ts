import {NoteListModel} from '../../data/notelistmodel';
import {InfoUserInfo} from '../common/infouserinfo';
//
export class NoteList extends NoteListModel {
	//
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}
