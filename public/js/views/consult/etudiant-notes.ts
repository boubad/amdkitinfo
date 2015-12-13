//etudiant-notes.ts
//
import {InfoUserInfo} from '../common/infouserinfo';
import {BaseEtudiantNotesModel} from '../../data/etudnotesmodel';
//
export class EtudiantNotes extends BaseEtudiantNotesModel {
	//
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}// class EtudDetail
