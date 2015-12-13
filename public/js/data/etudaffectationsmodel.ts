//etudaffectationsmodel.ts
//
import {UserInfo} from './userinfo';
import {AffectationViewModel} from './affectationsmodel';
import {IEtudiantAffectation, IEtudiant, IGroupe, IPerson} from 'infodata';
import {GENRE_TP,GENRE_PROMO} from './infoconstants';
//
export class EtudaffectationsModel extends AffectationViewModel<IEtudiantAffectation, IEtudiant> {
	//
	private _groupes: IGroupe[] = null;
	private _pgroupes: IGroupe[] = [];
	//
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Affectations Etudiants';
    }// constructor
    //
    protected create_person(): IEtudiant {
        return this.itemFactory.create_etudiant({ 
			departementid: this.departementid ,
			departementName: this.departementName});
    }
	
	private get_groupe_parents(p:IGroupe) : Promise<IGroupe[]> {
		let oRet:IGroupe[] = [];
		if ((p === undefined) || (p === null)){
			return Promise.resolve(oRet);
		}
		oRet.push(p);
		let id = p.parentid;
		if ((id === undefined) || (id === null)){
			return Promise.resolve(oRet);
		}
		let genre = p.genre;
		if ((genre === undefined) || (genre === null) || (genre == GENRE_PROMO)){
			return Promise.resolve(oRet);
		}
		return this.dataService.find_item_by_id(id).then((g1:IGroupe)=>{
			let xid:string = null;
			if ((g1 !== undefined) && (g1 !== null)){
				oRet.push(g1);
				xid = g1.parentid;
			}
			if (xid !== null){
				return this.dataService.find_item_by_id(xid);
			} else {
				return Promise.resolve(null);
			}
		}).then((g2:IGroupe)=>{
			if ((g2 !== undefined) && (g2 !== null)){
				oRet.push(g2);
			}
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}// get_groupe_parents
	protected prepare_model(): any {
		return {type: this.modelItem.type(),
			semestreid:this.semestreid,
			groupeid: this.groupeid};
	}// prepare_model
    protected create_item(): IEtudiantAffectation {
        let p = this.itemFactory.create_etudiantaffectation({
            departementid: this.departementid,
			departementName: this.departementName,
            anneeid: this.anneeid,
			anneeName: this.anneeName,
            semestreid: this.semestreid,
			semestreName: this.semestreName,
			semestreMinDate: this.semestreMinDate,
			semestreMaxDate: this.semestreMaxDate,
            groupeid: this.groupeid,
			groupeName: this.groupeName,
            startDate: this._start,
            endDate: this._end
        });
        return p;
    }
	private save_affectation(p: IEtudiantAffectation): Promise<boolean> {
		let oRet: boolean = false;
		return this.dataService.find_item_by_id(p.personid).then((pPers: IPerson) => {
			p.check_person(pPers);
			let oAr: string[] = pPers.groupeids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
			for (let x of this._pgroupes) {
				this.add_id_to_array(oAr, x.id);
			}// x
			pPers.groupeids = oAr;
			return this.dataService.save_item(pPers);
		}).then((bx) => {
			return this.dataService.save_item(p);
		}).catch((e) => {
			return oRet;
		});
	}// save_affectation
	protected perform_activate(): Promise<any> {
		this._groupes = null;
		return super.perform_activate();
	}
	protected get_groupes(): IGroupe[] {
		if ((this._groupes !== undefined) && (this._groupes !== null) && (this._groupes.length > 0)) {
			return this._groupes;
		}
		let oRet: IGroupe[] = [];
		let info = this.userInfo;
		let gg = ((info !== undefined) && (info !== null)) ? info.groupes : [];
		if ((gg !== undefined) && (gg !== null)) {
			for (let g of gg) {
				if (g.genre == GENRE_TP) {
					oRet.push(g);
				}
			}// g
		}// gg
		this._groupes = oRet;
		return this._groupes;
	}
	public is_storeable(): boolean {
		return (this.groupe !== null) &&
			(this.groupe.genre == GENRE_TP) && super.is_storeable();
	}
    protected retrieve_add_items(): IEtudiantAffectation[] {
        let oRet: IEtudiantAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.etudiantid = p.id;
				a.check_id();
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
	public save(): Promise<any> {
        if (!this.is_storeable()) {
            return Promise.resolve(false);
        }
        let oItems = this.retrieve_add_items();
        if (oItems === null) {
			return Promise.resolve(false);
        }
        if (oItems.length < 1) {
			return Promise.resolve(false);
        }
		let oAr: Promise<boolean>[] = [];
		for (let x of oItems) {
			oAr.push(this.save_affectation(x));
		}
        this.clear_error();
		return Promise.all(oAr).then((r) => {
			this.currentPersons = [];
			return this.refreshAll();
		}).catch((err) => {
            this.set_error(err);
			return false;
        });
    }// save
}// class EtudAffViewModel
