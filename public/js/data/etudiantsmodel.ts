//etudiants.ts
//
import {UserInfo} from './userinfo';
import {PersonViewModel} from './personmodel';
import {IEtudiant} from 'infodata';
//
export class EtudiantsModel extends PersonViewModel<IEtudiant> {
	//
    private _date:string = null;
    //
	//
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Etudiants';
    }// constructor
    protected create_item(): IEtudiant {
        return this.itemFactory.create_etudiant({
			departementid:this.departementid,
			departementName: this.departementName
		});
    }
     protected post_change_item(): Promise<any> {
        return super.post_change_item().then((r) => {
          let pPers = this.currentPerson;
          if (pPers !== null){
              this._date = this.date_to_string(pPers.birthDate);
          } else {
              this._date = null;
          }
          return true;
        });
    }// post_change_item
	 public get dossier(): string {
        return this.currentPerson.dossier;
    }
    public set dossier(s: string) {
        this.currentPerson.dossier = s;
    }
    public get sexe(): string {
        return this.currentPerson.sexe;
    }
    public set sexe(s: string) {
        this.currentPerson.sexe = s;
    }
	 public get birthYear(): string {
        return this.number_to_string(this.currentPerson.birthYear);
    }
    public set birthYear(s: string) {
        this.currentPerson.birthYear = this.check_number(s);
    }
    public get birthDate(): string {
        return this._date;
    }
    public set birthDate(s: string) {
        this.currentPerson.birthDate = this.string_to_date(s);
		this._date = s;
    }
    public get ville(): string {
        return this.currentPerson.ville;
    }
    public set ville(s: string) {
        this.currentPerson.ville = s;
    }
    public get etablissement(): string {
        return this.currentPerson.etablissement;
    }
    public set etablissement(s: string) {
        this.currentPerson.etablissement = s;
    }
    public get serieBac(): string {
        return this.currentPerson.serieBac;
    }
    public set serieBac(s: string) {
        this.currentPerson.serieBac = s;
    }
    public get optionBac(): string {
        return this.currentPerson.optionBac;
    }
    public set optionBac(s: string) {
        this.currentPerson.optionBac = s;
    }
    public get mentionBac(): string {
        return this.currentPerson.mentionBac;
    }
    public set mentionBac(s: string) {
        this.currentPerson.mentionBac = s;
    }
    public get etudesSuperieures(): string {
        return this.currentPerson.etudesSuperieures;
    }
    public set etudesSuperieures(s: string) {
        this.currentPerson.etudesSuperieures = s;
    }
	 public get apb(): string {
        return this.currentPerson.apb;
    }
    public set apb(s: string) {
        this.currentPerson.apb = s;
    }
}// class Etudiants
