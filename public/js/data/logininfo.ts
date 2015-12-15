// logininfo.ts
//
import {IDocPersist, IDataService, IPerson, IDepartement, IAnnee, IUnite, IGroupe, ISemestre,
IMatiere, IEtudiant, IEnseignant, IAdministrator, IItemFactory} from 'infodata';
import {InfoElement} from './infoelement';
import {PouchDatabase} from './pouchdatabase';
import {ItemFactory} from './itemfactory';
import {DataService} from './dataservice';

//
export class LoginInfo extends InfoElement {
	//
	public all_departements: IDepartement[] = [];
    public all_annees: IAnnee[] = [];
    public all_semestres: ISemestre[] = [];
    public all_unites: IUnite[] = [];
    public all_matieres: IMatiere[] = [];
    public all_groupes: IGroupe[] = [];
    public all_administrators: IAdministrator[] = [];
    public all_enseignants: IEnseignant[] = [];
    public all_etudiants: IEtudiant[] = [];
	private _departement: IDepartement = null;
	public is_prof: boolean = false;
	public is_etud: boolean = false;
	public is_admin: boolean = false;
	public is_super: boolean = false;
	public is_connected:boolean = false;
	public person:IPerson = null;
	public dataService: IDataService = new DataService(new PouchDatabase(), new ItemFactory());
	//
	constructor() {
		super();
	}// constructor
	public get itemfactory(): IItemFactory {
		return this.dataService.itemFactory;
	}
	public get departement(): IDepartement {
		return this._departement;
	}
	public set departement(p: IDepartement) {
		if ((p === undefined) || (p === null)) {
			this._departement = null;
		} else {
			this._departement = null;
			let aa = this.all_departements;
			let id = p.id;
			for (let x of aa) {
				if (x.id == id) {
					this._departement = x;
					break;
				}
			}
		}
		this.is_admin = false;
		this.is_prof = false;
		this.is_etud = false;
		if (this.is_super) {
			this.is_admin = true;
		} else {
			if (this.departement !== null) {
				let id = this.departement.id;
				let aa = this.all_administrators;
				for (let i = 0; i < aa.length; ++i) {
					let a = aa[i];
					if (a.departementid == id) {
						this.is_admin = true;
						break;
					}
				}// i
				let pp = this.all_enseignants;
				for (let i = 0; i < pp.length; ++i) {
					let a = pp[i];
					if (a.departementid == id) {
						this.is_prof = true;
						break;
					}
				}// i
				let ee = this.all_etudiants;
				for (let i = 0; i < ee.length; ++i) {
					let a = aa[i];
					if (a.departementid == id) {
						this.is_etud = true;
						break;
					}
				}// i
			}// dep
		}
	}
	private find_user(username: string, password: string): Promise<IPerson> {
		let model: IPerson = this.dataService.itemFactory.create_person({ username: username });
		model.check_id();
		return this.dataService.find_item_by_id(model.id, true).then((pPers: IPerson) => {
			let oRet: IPerson = null;
			if ((pPers !== undefined) && (pPers !== null)) {
				if (pPers.check_password(password)) {
					oRet = pPers;
				}
			}
			return oRet;
		}).catch((e) => {
			return null;
		});
	}// find_user
	public disconnect(): void {
		this.is_connected = false;
		this.person = null;
		this.departement = null;
		this.all_departements = null;
		this.all_annees = null;
		this.all_groupes = null;
		this.all_unites = null;
		this.all_matieres = null;
		this.all_semestres = null;
		this.all_etudiants = null;
		this.all_enseignants = null;
		this.all_administrators = null;
		this.is_admin = false;
		this.is_super = false;
		this.is_prof = false;
		this.is_super = false;
	}// disconnect
	public refresh_data(): Promise<boolean> {
		this.is_connected = false;
		this.is_admin = false;
		this.is_super = false;
		this.is_prof = false;
		this.is_super = false;
		let pPers: IPerson = this.person;
		if ((pPers === undefined) || (pPers === null)) {
			return Promise.resolve(false);
		}
		this.is_connected = true;
		this.is_super = pPers.is_super;
		let service = this.dataService;
		if (service === null) {
			return Promise.resolve(false);
		}
		let old: IDepartement = this.departement;
		this.departement = null;
		this.all_departements = [];
		this.all_annees = [];
		this.all_groupes = [];
		this.all_unites = [];
		this.all_matieres = [];
		this.all_semestres = [];
		this.all_etudiants = [];
		this.all_enseignants = [];
		this.all_administrators = [];
		if (pPers.is_super) {
			let model: IDepartement = this.dataService.itemFactory.create_departement();
			let selector: any = { type: model.type };
			return service.query_items(model.type()).then((dd: IDepartement[]) => {
				this.all_departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
				let xold = (old !== null) ? old.id : null;
				this._departement = this.sync_array(this.all_departements, xold);
				return true;
			}).catch((e) => {
				return false;
			});
		} else {
			let dids = pPers.departementids;
			return service.get_items_array(dids).then((dd: IDepartement[]) => {
				this.all_departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
				let xold = (old !== null) ? old.id : null;
				this._departement = this.sync_array(this.all_departements, xold);
				return service.get_items_array(pPers.anneeids);
			}).then((aa: IAnnee[]) => {
				this.all_annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
				return service.get_items_array(pPers.uniteids);
			}).then((uu: IUnite[]) => {
				this.all_unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
				return service.get_items_array(pPers.groupeids);
			}).then((gg: IGroupe[]) => {
				this.all_groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
				return service.get_items_array(pPers.semestreids);
			}).then((ss: ISemestre[]) => {
				this.all_semestres = ((ss !== undefined) && (ss !== null)) ? ss : [];
				return service.get_items_array(pPers.matiereids);
			}).then((mm: IMatiere[]) => {
				this.all_matieres = ((mm !== undefined) && (mm !== null)) ? mm : [];
				return service.get_items_array(pPers.etudiantids);
			}).then((ee: IEtudiant[]) => {
				this.all_etudiants = ((ee !== undefined) && (ee !== null)) ? ee : [];
				return service.get_items_array(pPers.enseignantids);
			}).then((pp: IEnseignant[]) => {
				this.all_enseignants = ((pp !== undefined) && (pp !== null)) ? pp : [];
				return service.get_items_array(pPers.administratorids);
			}).then((gx: IAdministrator[]) => {
				this.all_administrators = ((gx !== undefined) && (gx !== null)) ? gx : [];
				return true;
			}).catch((err) => {
				return false;
			});
		}
	}// refresh_data
	public login(username: string, password: string): Promise<boolean> {
		this.disconnect();
		return this.find_user(username, password).then((pPers) => {
			this.person = pPers;
			return this.refresh_data();
		}).then((b) => {
			return (this.person !== null);
		})
	}// login
}// class LoginInfo
