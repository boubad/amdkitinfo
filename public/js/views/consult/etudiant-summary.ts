//etudiantsumary.ts
import {InfoUserInfo} from '../common/infouserinfo';
import {EtudiantSumaryModel} from '../../data/etudiantsummarymodel';
//
export class EtudiantSumary extends EtudiantSumaryModel {
    //
	static inject() { return [InfoUserInfo]; }
  //
	constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}

