//baseeditmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseConsultViewModel} from './baseconsultmodel';
import {IBaseItem, IFileDesc, IUIManager} from 'infodata';
//
export class BaseEditViewModel<T extends IBaseItem> extends BaseConsultViewModel<T> {
	private _add_mode: boolean = false;
	private _old_item: T;
	//
	constructor(info: UserInfo) {
		super(info);
	}// constructor
	//
	protected is_storeable(): boolean {
		return this.currentItem.is_storeable();
	}
	//
	public get isReadOnly(): boolean {
		return (!this.is_admin) && (!this.is_super);
	}
	public get isEditable(): boolean {
		return this.is_admin || this.is_super;
	}
	public get avatarUrl(): string {
		return this.currentItem.url;
	}
	public get hasAvatarUrl(): boolean {
		return (this.currentItem.url !== null);
	}
	public get canRemoveAvatar(): boolean {
		return this.isEditable && (this.currentItem.id !== null) &&
			(this.currentItem.rev !== null) && (this.currentItem.avatarid !== null);
	}
	public get cannotRemoveAvatar(): boolean {
		return (!this.canRemoveAvatar);
	}
	public get canSaveAvatar(): boolean {
		return this.isEditable && (this.currentItem.rev !== null) &&
			(this.currentItem.id !== null) && this.fileDesc.is_storeable;
	}
	public get cannotSaveAvatar(): boolean {
		return (!this.canSaveAvatar);
	}
	public get workingUrl(): string {
		return this.fileDesc.url;
	}
	public get hasWorkingUrl(): boolean {
		return (this.workingUrl !== null);
	}
	public get isEditItem(): boolean {
		return (this.currentItem.id !== null) && (this.currentItem.rev !== null);
	}
	public get isNotEditItem(): boolean {
		return (!this.isEditItem);
	}
	public avatarFileChanged(event: any): any {
		this.fileDesc.changed(event, true);
	}// fileChanged
	public removeAvatar(): any {
		let p = this.currentItem;
		if ((p.id === null) || (p.rev === null)) {
			return;
		}
		let id = p.avatardocid();
		let avatarid = p.avatarid;
		if ((id === null) || (avatarid === null)) {
			return;
		}
		let service = this.dataService;
		return this.confirm('Voulez-vous vraiment supprimer cet avatar?').then((bRet) => {
			if (bRet) {
				this.clear_error();
				return service.remove_attachment(id, avatarid);
			} else {
				return Promise.resolve(false);
			}
		}).then((b) => {
			if (b) {
				if (p.url !== null) {
					this.uiManager.revokeUrl(p.url);
					p.url = null;
				}
				p.avatarid = null;
				return service.save_item(p);
			} else {
				return Promise.resolve(false);
			}
		}).then((x) => {
			if (x) {
				this.fileDesc.clear();
				this.info_message = 'Avatar supprimé.';
			}
		}).catch((err) => {
			this.set_error(err);
		});
	}
	public saveAvatar(): any {
		let f = this.fileDesc;
		let p = this.currentItem;
		if ((f === null) || (p === null)) {
			return;
		}
		if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
			return;
		}
		let id = p.avatardocid();
		if (id === null) {
			return;
		}
		let avatarid = f.name;
		let type = f.type;
		let data = f.data;
		if ((avatarid === null) || (type === null) || (data === null)) {
			return;
		}
		let service = this.dataService;
		this.clear_error();
		return service.maintains_attachment(id, avatarid, data, type).then((r) => {
			p.avatarid = avatarid;
			return service.save_item(p);
		}).then((px) => {
			p.url = this.fileDesc.url;
			this.fileDesc.clear_url();
			this.fileDesc.clear();
			this.info_message = 'Avatar modifié.';
		}).catch((err) => {
			this.set_error(err);
		});
	}// saveAvatar
	protected get oldItem(): T {
		return (this._old_item !== undefined) ? this._old_item : null;
	}
	protected set oldItem(s: T) {
		this._old_item = s;
	}
	protected get AddMode(): boolean {
		return this._add_mode;
	}
	protected set addMode(b: boolean) {
		this._add_mode = b;
	}
	public get canAdd(): boolean {
		return (!this.addMode) && this.isEditable;
	}
	public addNew(): any {
		this.oldItem = this.currentItem;
		this.currentItem = this.create_item();
		this.addMode = true;
	}
	public get canCancel(): boolean {
		return this.addMode;
	}
	public get cannotCancel(): boolean {
		return (!this.canCancel);
	}
	public cancel_add(): void {
		this.currentItem = this.oldItem;
		this.addMode = false;
	}
	public cancel(): void {
		this.cancel_add();
	}
	public get canRemove(): boolean {
		return this.isEditItem && this.isEditable;
	}
	public get cannotRemove(): boolean {
		return (!this.canRemove);
	}
	public get canSave(): boolean {
		return this.is_storeable() && this.isEditable;
	}
	public get cannotSave(): boolean {
		return (!this.canSave);
	}
	//
	public refresh(): Promise<any> {
		let oldid = this.currentItem.id;
		return super.refresh().then((r) => {
			let p = this.sync_array(this.items, oldid);
			this.currentItem = p;
			return true;
		});
	}// refresh
	public save(): Promise<any> {
		let item = this.currentItem;
		if (!item.is_storeable()) {
			return Promise.resolve(false);
		}
		this.clear_error();
		return this.dataService.save_item(item).then((r) => {
			return this.refreshAll();
		}).catch((err) => {
			this.set_error(err);
			return false;
		});
	}// save
	public remove(): Promise<any> {
		let item = this.currentItem;
		if ((item.id === null) || (item.rev === null)) {
			return Promise.resolve(false);
		}
		return this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?').then((b) => {
			this.clear_error();
			return this.dataService.remove_item(item);
		}).then((r) => {
			this.refreshAll();
			return true;
		}).catch((err) => {
			this.set_error(err);
			return false;
		});
	}// remove
	public get description(): string {
		return this.currentItem.description;
	}
	public set description(s: string) {
		this.currentItem.description = s;
	}
	public get status(): string {
		return this.currentItem.status;
	}
	public set status(s: string) {
		this.currentItem.status = s;
	}
}// class BaseEditViewModel
