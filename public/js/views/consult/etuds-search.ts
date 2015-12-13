//etudsearch.ts
import {InfoUserInfo} from '../common/infouserinfo';
import {EtudiantSearchModel} from '../../data/etudiantsearchmodel';
//
export class EtudSearch extends EtudiantSearchModel {
	static inject() { return [InfoUserInfo]; }
	//
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Recherche Etudiants";
    }
}