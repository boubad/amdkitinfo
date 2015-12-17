//attacheddocmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseView} from './baseview';
import {FileDesc} from './filedesc';
import {AttachedDoc} from './attacheddoc';
import {IBaseItem, IFileDesc, IAttachedDoc} from 'infodata';
//
export class AttachedDocModel extends BaseView {
	private _itemid: string = null;
	private _add_mode: boolean = false;
	private fileDesc: IFileDesc = null;
	private _current_item: IBaseItem = null;
	private _docs: IAttachedDoc[] = [];
	private _current_doc: IAttachedDoc = null;
	private _old_doc: IAttachedDoc = null;
	private _link_text: string = null;
	private _link_ref: string = null;
	private _link_type: string = null;
	//
	constructor(info: UserInfo) {
		super(info);
		this.fileDesc = new FileDesc();
	}// constructor
	public avatarFileChanged(event: any): any {
		this.fileDesc.changed(event);
		this.currentDoc = new AttachedDoc({
			name: this.fileDesc.name,
			content_type: this.fileDesc.type,
			title: this.fileDesc.name
		});
	}// fileChanged
	//
	public get docs(): IAttachedDoc[] {
		return ((this._docs !== undefined) && (this._docs !== null)) ? this._docs : [];
	}
	public set docs(d: IAttachedDoc[]) {
		this._docs = ((d !== undefined) && (d !== null)) ? d : [];
	}
	public get has_docs(): boolean {
		return (this.docs.length > 0);
	}
	public get currentDoc(): IAttachedDoc {
		return ((this._current_doc !== undefined) && (this._current_doc !== null)) ? this._current_doc : new AttachedDoc();
	}
	public get docName(): string {
		return this.currentDoc.id;
	}
	public set docName(s: string) {
	}
	public get docType(): string {
		return this.currentDoc.content_type;
	}
	public set docType(s: string) {
		if (this.currentDoc !== null) {
			this.currentDoc.content_type = s;
		}
	}
	public get docTitle(): string {
		return this.currentDoc.title;
	}
	public set docTitle(s: string) {
		if (this.currentDoc !== null) {
			this.currentDoc.title = s;
		}
	}
	public get docDescription(): string {
		return this.currentDoc.description;
	}
	public set docDescription(s: string) {
		if (this.currentDoc !== null) {
			this.currentDoc.description = s;
		}
	}
	public set currentDoc(s: IAttachedDoc) {
		this._current_doc = ((s !== undefined) && (s !== null)) ? s : new AttachedDoc();
		this.fileDesc.clear();
		this._link_type = null;
		if (this._link_ref !== null) {
			this.uiManager.revokeUrl(this._link_ref);
			this._link_ref = null;
		}
		this._link_text = null;
		if (this.currentDoc !== null) {
			this._link_type = this.currentDoc.content_type;
			let sRet: string = null;
			if (this.canRemove) {
				sRet = 'Télécharger le fichier ' + this.currentDoc.id;
			}
			this._link_text = sRet;
			let xid: string = this.currentItem.id;
			let avatarid = this.currentDoc.title;
			this.dataService.find_attachment(xid, avatarid).then((b) => {
				if ((b !== undefined) && (b !== null)) {
					this._link_ref = this.uiManager.createUrl(b);
				}
			})
		}// doc
	}
	public get currentItem(): IBaseItem {
		return (this._current_item !== undefined) ? this._current_item : null;
	}
	public set currentItem(s: IBaseItem) {
		this._current_item = (s !== undefined) ? s : null;
		this._itemid = (this.currentItem !== null) ? this.currentItem.id : null;
		this.refreh_docs();
	}
	//
	public refreh_docs(): Promise<boolean> {
		this.fileDesc.clear();
		this._current_item = null;
		this._docs = [];
		this._current_doc = null;
		this.title = '';
		let self = this;
		return this.dataService.find_item_by_id(this._itemid, true).then((pe: IBaseItem) => {
			self._current_item = (pe != undefined) ? pe : null;
			if (self.currentItem !== null) {
				let dd = self.currentItem.attachments;
				self.docs = dd;
				self.title = 'Documents associés - ' + self.currentItem.text;
			}
			if (self.docs.length > 0) {
				self.currentDoc = self.docs[0];
			}
			return true;
		});
	}// refresh_docs
	protected initialize_activate_params(params?:any) : Promise<boolean> {
		this._itemid = ((params !== undefined) && (params !== null) && (params.id !== undefined)) ? params.id : null;
		return this.refreh_docs();
	}// initialize_activate_params
	protected perform_activate(): Promise<boolean> {
		return Promise.resolve(true);
	}
	public deactivate(): any {
		this.fileDesc.clear();
		if (this._link_ref !== null) {
			this.uiManager.revokeUrl(this._link_ref);
			this._link_ref = null;
		}
		this._link_text = null;
	}
	public get isEditable(): boolean {
		return (this.currentItem !== null) && (this.currentItem.id !== null) &&
			(this.currentItem.rev !== null);
	}
	private get oldDoc(): IAttachedDoc {
		return this._old_doc;
	}
	private set oldDoc(s: IAttachedDoc) {
		this._old_doc = (s !== undefined) ? s : null;
	}
	private get AddMode(): boolean {
		return this._add_mode;
	}
	protected set addMode(b: boolean) {
		this._add_mode = b;
	}
	public get canAdd(): boolean {
		return (!this.addMode) && this.isEditable;
	}
	public addNew(): any {
		this.oldDoc = this.currentDoc;
		this.currentDoc = null;
		this.addMode = true;
	}
	public get canCancel(): boolean {
		return this.addMode;
	}
	public get cannotCancel(): boolean {
		return (!this.canCancel);
	}
	public cancel_add(): void {
		this.currentDoc = this.oldDoc;
		this.addMode = false;
	}
	public cancel(): void {
		this.cancel_add();
	}
	public get canRemove(): boolean {
		return this.isEditable && (this.currentDoc !== null) &&
			(this.currentDoc.id !== null) && (this.currentDoc.content_type !== null);
	}
	public get cannotRemove(): boolean {
		return (!this.canRemove);
	}
	public get linkText(): string {
		return (this._link_text !== undefined) ? this._link_text : null;
	}
	public get linkRef(): string {
		return (this._link_ref !== undefined) ? this._link_ref : null;
	}// linkRef
	public get linkType(): string {
		return (this._link_type !== undefined) ? this._link_type : null;
	}
	public get has_ref(): boolean {
		return (this.linkRef !== null);
	}
	public get canSave(): boolean {
		if (!this.isEditable) {
			return false;
		}
		if ((this.currentDoc !== null) && (this.currentDoc.stub)) {
			return true;
		}
		let b = this.fileDesc.is_storeable && this.isEditable;
		if (!b) {
			return false;
		}
		let id = this.currentItem.avatarid;
		if ((id !== null) && (id == this.fileDesc.name)) {
			return false;
		}
		return true;
	}
	public get cannotSave(): boolean {
		return (!this.canSave);
	}
	public save(): Promise<any> {
		let f = this.fileDesc;
		let p = this.currentItem;
		this.clear_error();
		return this.dataService.save_item(this.currentItem).then((b) => {
			if ((f !== null) && f.is_storeable) {
				let avatarid = f.name;
				let type = f.type;
				let data = f.data;
				return this.dataService.maintains_attachment(p.id, avatarid, data, type);
			} else {
				return Promise.resolve(true);
			}
		}).then((bx) => {
			return this.refreh_docs();
		}).catch((e) => {
			this.set_error(e);
			return false;
		});
	}//save_attached_data
	public remove(): Promise<any> {
		let p = this.currentItem;
		if (p === null) {
			return Promise.resolve(false);
		}
		if ((p.id === null) || (p.rev === null)) {
			return Promise.resolve(false);
		}
		let id = p.id;
		let avatarid = this.currentDoc.id;
		if ((id === null) || (avatarid === null)) {
			return;
		}
		return this.confirm('Voulez-vous vraiment supprimer ' + avatarid + '?').then((b) => {
			if ((b !== undefined) && (b !== null) && (b == true)) {
				this.clear_error();
				return this.dataService.remove_attachment(id, avatarid);
			} else {
				return Promise.resolve(false);
			}
		}).then((r) => {
			return this.refreh_docs();
		}).catch((err) => {
			this.set_error(err);
			return false;
		});
	}
}// class BaseEditViewModel
