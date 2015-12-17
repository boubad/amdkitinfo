//enseignantaffectationsmodel.ts
//
import {UserInfo} from './userinfo';
import {AffectationViewModel} from './affectationsmodel';
import {IEnseignant, IEnseignantAffectation} from 'infodata';
//
export class EnseignantAffectationsModel extends AffectationViewModel<IEnseignantAffectation, IEnseignant> {
    //
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Affectations enseignants';
    }// constructor
    //
    protected create_person(): IEnseignant {
		return this.itemFactory.create_enseignant({ 
			departementid: this.departementid,
			departementName: this.departementName });
    }
	protected prepare_model(): any {
		return {type: this.modelItem.type(),
			semestreid:this.semestreid,
			groupeid: this.groupeid,
			matiereid: this.matiereid
		};
	}// prepare_model
    protected is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null)
            && (this.matiereid !== null);
    }
    protected create_item(): IEnseignantAffectation {
        let p = this.itemFactory.create_enseignantaffectation({
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
            uniteid: this.uniteid,
			uniteName: this.uniteName,
            matiereid: this.matiereid,
			matiereName: this.matiereName,
            startDate: this._start,
            endDate: this._end
        });
        return p;
    }
    protected retrieve_add_items(): IEnseignantAffectation[] {
        let oRet: IEnseignantAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.enseignantid = p.id;
				a.check_id();
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
	protected post_update_departement(): Promise<boolean> {
        return super.post_update_departement().then((r) => {
			if ((this.departement == null) && (this.departements.length > 0)){
				this.departement = this.departements[0];
			}
			if ((this.groupe == null) && (this.groupes.length > 0)){
				this.groupe = this.groupes[0];
			}
			if ((this.unite == null) && (this.unites.length > 0)){
				this.unite = this.unites[0];
			}
			if ((this.annee == null) && (this.annees.length > 0)){
				this.annee = this.annees[0];
			}
			return true;
		});
    }
	 protected post_update_unite(): Promise<boolean> {
		 return super.post_update_unite().then((r)=>{
			  if ((this.matiere == null) && (this.matieres.length > 0)){
				this.matiere = this.matieres[0];
			}
		return Promise.resolve(true);
		 });
    }
	 protected post_update_annee(): Promise<boolean> {
		return super.post_update_annee().then((r)=>{
			 if ((this.annee == null) && (this.annees.length > 0)){
				this.annee = this.annees[0];
			}
		return Promise.resolve(true);
		});
    }
    protected post_update_matiere(): Promise<any> {
		return super.post_update_matiere().then((r)=>{
			this.modelItem.matiereid = this.matiereid;
        this.currentAffectations = [];
		return this.activate_refresh();
		});
    }
    protected is_refresh(): boolean {
        return super.is_refresh() && (this.modelItem.matiereid !== null);
    }
}// class ProfAffectationModel
