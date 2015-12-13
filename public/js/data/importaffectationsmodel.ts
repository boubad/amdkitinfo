// importaffectationmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseView} from './baseview';
import {CSVImporter} from './cvsimporter';
import {IPerson, IEtudiant, IGroupe, IEtudiantAffectation} from 'infodata';
//
interface MyEvent extends EventTarget {
    target: { files: any, result: any };
}
//
//
export class ImportAffectationModel extends BaseView {
    //
	private _importer: CSVImporter = null;
	private _persons: IPerson[] = [];
	private _grps: IGroupe[] = [];
	private _inwork:boolean = false;
    //
    constructor(info: UserInfo) {
        super(info);
		this.title="Import Etudiants/Affectations";
		this._inwork = false;
    }// constructor
	protected post_update_departement(): Promise<boolean> {
        return super.post_update_departement().then((r)=>{
			return this.get_departement_groupetps();
		}).then((gg)=>{
			this._grps = gg;
			return true;
		})
    }// post_change_departement
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			if ((this.departement == null) && (this.departements.length > 0)){
				this.departement = this.departements[0];
			}
			return this.get_departement_groupetps();
		}).then((pp: IGroupe[]) => {
			this._grps = pp;
			return true;
		});
	}// perform_activate
	public canActivate(params?: any, config?: any, instruction?: any): any {
		return this.is_super || this.is_admin;
    }// activate
	//
	public get persons(): IPerson[] {
		return ((this._persons !== undefined) && (this !== null)) ? this._persons : [];
	}
	public has_persons():boolean{
		return (this.persons.length > 0);
	}
	public get depGroupes(): IGroupe[] {
		return ((this._grps !== undefined) && (this !== null)) ? this._grps : [];
	}
	public get canImport(): boolean {
        let bRet =  (this.departementid !== null) && (!this._inwork);
		if (!bRet){
			return false;
		}
		for (let p of this.persons){
			if (p.selected){
				return true;
			}
		}
		return false;
    }
	private get_groupe_name_by_sigle(s:string) : string {
		let sRet:string = null;
		if ((s !== undefined) && (s !== null)){
			let ss = s.trim().toUpperCase();
			for (let x of this.depGroupes){
				if (x.sigle == ss){
					sRet = x.text;
					break;
				}
			}// x
		}// s
		return sRet;
	}//get_groupe_name_by_sigle
	private get_groupe_id_by_sigle(s:string) : string {
		let sRet:string = null;
		if ((s !== undefined) && (s !== null)){
			let ss = s.trim().toUpperCase();
			for (let x of this.depGroupes){
				if (x.sigle == ss){
					sRet = x.id;
					break;
				}
			}// x
		}// s
		return sRet;
	}//get_groupe_id_by_sigle
	private check_persons(): any {
		let dd = this._persons;
		if ((dd !== undefined) && (dd !== null)) {
			for (let p of dd) {
				if (p !== null) {
					p.groupeid = this.get_groupe_id_by_sigle(p.groupeSigle);
					if ((p.username === undefined) || (p.username === null)) {
						p.username = this.create_username(p.lastname, p.firstname);
					}
					p.check_id();
					if ((p.password === undefined) || (p.password === null)) {
						p.reset_password();
					}
					this.add_id_to_array(p.departementids, this.departementid);
					this.add_id_to_array(p.groupeids, p.groupeid);
				}// p
			}// dd	
		}// dd
	}// check_persons
    public importFileChanged(event: MyEvent): any {
		this._persons = [];
        let files = event.target.files;
        if ((files !== undefined) && (files !== null) && (files.length > 0)) {
            let file = files[0];
            if ((this._importer === undefined) || (this._importer === null)) {
                this._importer = new CSVImporter(this.dataService.itemFactory);
            }
            this._importer.read_file(file).then((dd: IPerson[]) => {
				if ((dd !== undefined) && (dd !== null)) {
					for (let x of dd) {
						let p = this.itemFactory.create_person(x);
						if (p !== null) {
							this._persons.push(p);
						}// p
					}// dd	
				}// dd
				this.check_persons();
            }).catch((err) => {
                this.set_error(err);
            });
        }// files
    }// fileChanged
	private process_one_person(p: IPerson): Promise<boolean> {
		let oRet: boolean = false;
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(oRet);
		}
		if (!p.is_storeable()) {
			return Promise.resolve(oRet);
		}
		p.check_id();
		let semid: string = this.semestreid;
		let service = this.dataService;
		let pPers: IPerson = null;
		let nEtudid:string = null;
		return service.find_item_by_id(p.id).then((pz: IPerson) => {
			if ((pz !== undefined) && (pz !== null)) {
				pPers = pz;
				return Promise.resolve(true);
			} else {
				return service.save_item(p);
			}
		}).then((xx)=>{
			if ((pPers === null) && (xx == true)) {
				pPers = p;
			}
			if (pPers !== null){
				let pEtud = this.itemFactory.create_etudiant({
					departementid: this.departementid,
					departementName: this.departementName,
					personid: pPers.id,
					lastname: pPers.lastname,
					firstname: pPers.firstname,
					avatarid: pPers.avatarid
				});
				pEtud.check_id();
				nEtudid = pEtud.id;
				return service.save_item(pEtud);
			} else {
				return Promise.resolve(true);
			}
		}).then((bx) => {
			if (pPers !== null) {
				let grpid = p.groupeid;
				if ((grpid !== null) && (semid !== null)) {
					let px = this.itemFactory.create_etudiantaffectation({
						etudiantid: nEtudid,
						departementid: this.departementid,
						departementName: this.departementName,
						anneeid: this.anneeid,
						anneeName: this.anneeName,
						personid: pPers.id,
						groupeid: grpid,
						semestreid: semid,
						semestreName: this.semestreName,
			            semestreMinDate: this.semestreMinDate,
			            semestreMaxDate: this.semestreMaxDate,
						lastname: pPers.lastname,
						firstname: pPers.firstname,
						groupeName: this.get_groupe_name_by_sigle(p.groupeSigle),
						avatarid: pPers.avatarid,
						startDate: (this.semestre !== null) ? this.semestre.startDate : null,
						endDate: (this.semestre !== null) ? this.semestre.endDate : null,
					});
					px.check_id();
					return service.save_item(px);
				} else {
					return Promise.resolve(true);
				}
			} else {
				return Promise.resolve(false);
			}
		})
	}// process_one_person
    public import_etudiants(): Promise<any> {
		this._inwork = true;
		let oAr: Promise<boolean>[] = [];
		for (let p of this.persons) {
			if (p.selected && p.is_storeable()) {
				oAr.push(this.process_one_person(p));
			}
		}// p
		return Promise.all(oAr).then((dd) => {
			for (let p of this.persons) {
				p.selected = false;
			}// p
			this._inwork = false;
		}).catch((e)=>{
			this._inwork = false;
		})
	}
}// class PersonViewModel
