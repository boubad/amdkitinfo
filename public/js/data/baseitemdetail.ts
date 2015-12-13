//baseitemdetail.ts
//
import {BaseView} from './baseview';
import {UserInfo} from './userinfo';
import {IPersonItem, IPerson,IEtudiantEvent} from 'infodata';
//
export class BaseDetailModel<T extends IPersonItem> extends BaseView {
    //
	private _person: IPerson;
	private _item: T;
	private _canEdit: boolean;
	private _evtModel: IEtudiantEvent;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }
	protected get evtModel(): IEtudiantEvent {
		if ((this._evtModel === undefined) || (this._evtModel === null)) {
			this._evtModel = this.itemFactory.create_etudiantevent();
		}
		return this._evtModel;
	}
	public get currentItem(): T {
		return (this._item !== undefined) ? this._item : null;
	}
	protected post_set_current_item(): Promise<any> {
		return Promise.resolve(true);
	}
	public set currentItem(s: T) {
		this._item = (s !== undefined) ? s : null;
		this.post_set_current_item();
	}
	public get currentPerson(): IPerson {
		if ((this._person === undefined) || (this._person === null)) {
			this._person = this.itemFactory.create_person();
		}
		return this._person;
	}
	public set currentPerson(s: IPerson) {
		this._person = s;
	}
	public get canEdit(): boolean {
		if ((this._canEdit === undefined) || (this._canEdit === null)) {
			this._canEdit = false;
		}
		return this._canEdit;
	}
	public set canEdit(s: boolean) {
		this._canEdit = s;
	}
	public get isReadOnly(): boolean {
		return (!this.canEdit);
	}
	protected initialize_item(evtid: string): Promise<boolean> {
		this.clear_error();
		this._item = null;
		return this.dataService.find_item_by_id(evtid).then((p: T) => {
			this.currentItem = p;
			return this.retrieve_one_avatar(this.currentItem);
		}).then((x) => {
			let nid = (this.currentItem !== null) ? this.currentItem.personid : null;
			return this.dataService.find_item_by_id(nid);
		}).then((pPers: IPerson) => {
			this._person = pPers;
			return true;
		});
	}// initialize_item
	public get canSave(): boolean {
		return (this.currentItem !== null) && this.currentItem.is_storeable();
	}
	public get cannotSave(): boolean {
		return (!this.canSave);
	}
	public save(): Promise<any> {
		let p = this.currentItem;
		if (p === null) {
			return Promise.resolve(false);
		}
		if (!p.is_storeable()) {
			return Promise.resolve(false);
		}
		this.clear_error();
		return this.dataService.save_item(p).then((b) => {
			if ((b !== undefined) && (b !== null) && (b == true)) {
				this.info_message = "Item modifié!";
			} else {
				this.error_message = "Erreur enregistrement...";
			}
		}).catch((e) => {
			this.set_error(e);
		})
	}// save
	public activate(params?: any, config?: any, instruction?: any): any {
		let id: string = null;
		if (params.id !== undefined) {
			id = params.id;
		}
		let p = this.currentItem;
		if (p !== null) {
			if (p.url !== null) {
				this.revokeUrl(p.url);
			}
		}
		this.canEdit = false;
		this.currentItem = null;
		return this.initialize_item(id);
	}// activate
	public deactivate(): any {
		if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
			this.revokeUrl(this.currentItem.url);
			this.currentItem.url = null;
		}
	}
	public get itemUrl(): string {
		return (this.currentItem !== null) ? this.currentItem.url : null;
	}
	public get hasItemUrl(): boolean {
		return (this.itemUrl !== null);
	}// hasUrl
	public get description(): string {
		return (this.currentItem !== null) ? this.currentItem.description : null;
	}
	public set description(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.description = s;
		}
	}
	public get status(): string {
		return (this.currentItem !== null) ? this.currentItem.status : null;
	}
	public set status(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.status = s;
		}
	}
	public get departementName(): string {
		return (this.currentItem !== null) ? this.currentItem.departementName : null;
	}
	public get fullname(): string {
		return this.currentPerson.fullname;
	}
    public get username(): string {
		return this.currentPerson.username;
	}
    public get firstname(): string {
		return this.currentPerson.firstname;
	}
    public get lastname(): string {
		return this.currentPerson.lastname;
	}
    public get email(): string {
		return this.currentPerson.email;
	}
    public get phone(): string {
		return this.currentPerson.phone;
	}
	public get dossier(): string {
		return this.currentPerson.dossier;
	}
    public get sexe(): string {
		return this.currentPerson.sexe;
	}
    public get ville(): string {
		return this.currentPerson.ville;
	}
    public get etablissement(): string {
		return this.currentPerson.etablissement;
	}
    public get serieBac(): string {
		return this.currentPerson.serieBac;
	}
    public get optionBac(): string {
		return this.currentPerson.optionBac;
	}
    public get mentionBac(): string {
		return this.currentPerson.mentionBac;
	}
    public get etudesSuperieures(): string {
		return this.currentPerson.etudesSuperieures;
	}
	public get apb(): string {
		return this.currentPerson.apb;
	}
	public get birthYear():string {
		return this.number_to_string(this.currentPerson.birthYear);
	}
}
