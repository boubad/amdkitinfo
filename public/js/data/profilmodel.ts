//profilmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseView} from './baseview';
import {FileDesc} from './filedesc';
import {IDataService, IPerson, IElementDesc, IFileDesc} from 'infodata';
//
const EMPTY_STRING: string = '';
//
export class ProfilModel extends BaseView {
	//
	private fileDesc: IFileDesc;
	//
	public profilMode: boolean = true;
	public passwordMode: boolean = false;
	public avatarMode: boolean = false;
	public newPassword: string = null;
	public confirmPassword: string = null;
	//
	public firstname: string = null;
	public lastname: string = null;
	public email: string = null;
	public phone: string = null;
	public description: string = null;
	//
	constructor(info: UserInfo) {
		super(info);
		this.title = 'Profil';
		this.fileDesc = new FileDesc();
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
		return (this.is_connected);
	}// canActivate
	public activate(params?: any, config?: any, instruction?: any): any {
		if (this.is_etud) {
			this.profilMode = false;
			this.passwordMode = false;
			this.avatarMode = true;
		} else {
			this.profilMode = true;
			this.passwordMode = false;
			this.avatarMode = false;
		}
		this.clear_error();
		this.fileDesc.clear();
		this.retrieve_userData();
	}// activate
	public get can_profil(): boolean {
		return (!this.profilMode) && (!this.is_etud);
	}
	public get can_password(): boolean {
		return (!this.passwordMode);
	}
	public get can_avatar(): boolean {
		return (!this.avatarMode);
	}
	protected retrieve_userData(): any {
		let px = this.userInfo.person;
		this.fileDesc.clear();
		this.newPassword = EMPTY_STRING;
		this.confirmPassword = EMPTY_STRING;
		if (px !== null) {
			this.firstname = (px.firstname !== null) ? px.firstname : EMPTY_STRING;
			this.lastname = (px.lastname !== null) ? px.lastname : EMPTY_STRING;
			this.email = (px.email !== null) ? px.email : EMPTY_STRING;
			this.phone = (px.phone !== null) ? px.phone : EMPTY_STRING;
			this.description = (px.description !== null) ? px.description : EMPTY_STRING;
		} else {
			this.firstname = EMPTY_STRING;
			this.lastname = EMPTY_STRING;
			this.email = EMPTY_STRING;
			this.phone = EMPTY_STRING;
			this.description = EMPTY_STRING;
		}
	}// retrieve_userData
	public get old_url(): string {
		return this.url;
	}
	public get has_old_url(): boolean {
		return this.has_url;
	}
	public set_profil(): any {
		this.profilMode = true;
		this.passwordMode = false;
		this.avatarMode = false;
		this.title = "Profil utilisateur";
	}
	public set_password(): any {
		this.profilMode = false;
		this.passwordMode = true;
		this.avatarMode = false;
		this.title = "Mot de passe";
	}
	public set_avatar(): any {
		this.profilMode = false;
		this.passwordMode = false;
		this.avatarMode = true;
		this.title = "Avatar";
	}
	public get canChangePwd(): boolean {
		return (this.newPassword !== null) && (this.confirmPassword !== null) &&
			(this.newPassword == this.confirmPassword) &&
			(this.newPassword.trim().length > 0);
	}
	public changePwd(): any {
		let pPers = this.userInfo.person;
		if (pPers === null) {
			return;
		}
		let self = this;
		pPers.change_password(this.newPassword);
		this.clear_error();
		return this.dataService.save_item(pPers).then((r) => {
			self.info_message = 'Mot de passe modifié';
			self.newPassword = EMPTY_STRING;
			self.confirmPassword = EMPTY_STRING;
		}, (err) => {
			self.set_error(err);
		});
	}
	public get canSaveData(): boolean {
		return (this.firstname !== null) && (this.firstname.trim().length > 0) &&
			(this.lastname !== null) && (this.lastname.trim().length > 0);
	}
	public saveData(): any {
		let pPers = this.userInfo.person;
		if (pPers === null) {
			return;
		}
		if (!this.canSaveData) {
			return;
		}
		pPers.firstname = this.firstname;
		pPers.lastname = this.lastname;
		pPers.email = this.email;
		pPers.phone = this.phone;
		pPers.description = this.description;
		let self = this;
		this.clear_error();
		return this.dataService.save_item(pPers).then((r) => {
			self.info_message = 'Informations enregistrées!';
		}, (err) => {
			self.set_error(err);
		});
	}// saveData
	public get current_url(): string {
		return this.fileDesc.url;
	}
	public get has_current_url(): boolean {
		return (this.fileDesc.url !== null);
	}
	public get canRemove(): boolean {
		return this.has_old_url;
	}
	public get canSave(): boolean {
		return this.fileDesc.is_storeable;
	}
	public fileChanged(event: any): any {
		this.fileDesc.changed(event, true);
	}// fileChanged
	public remove(): any {
		let pPers = this.userInfo.person;
		if (pPers === null) {
			return;
		}
		let id = pPers.id;
		let avatarid = pPers.avatarid;
		if ((id === null) || (avatarid === null)) {
			return;
		}
		this.confirm('Voulez-vous vraiment supprimer cet avatar?').then((bRet) => {
			if (bRet) {
				this.fileDesc.clear();
				if (pPers.url !== null) {
					this.uiManager.revokeUrl(pPers.url);
					pPers.url = null;
				}
			}
		}).catch((e)=>{
			this.set_error(e);
		})
	}
	public save(): any {
		let pPers = this.userInfo.person;
		if (pPers === null) {
			return;
		}
		let id = pPers.id;
		if (id === null) {
			return;
		}
		let avatarid = this.fileDesc.name;
		let type = this.fileDesc.type;
		let data = this.fileDesc.data;
		if ((avatarid === null) || (type === null) || (data === null)) {
			return;
		}
		let service = this.dataService;
		this.clear_error();
		return service.maintains_attachment(id, avatarid, data, type).then((r) => {
			pPers.avatarid = avatarid;
			return service.save_item(pPers);
		}).then((p) => {
			this.fileDesc.clear();
			if (pPers.url !== null) {
				this.uiManager.revokeUrl(pPers.url);
				pPers.url = null;
			}
			return this.retrieve_one_avatar(pPers);
		});
	}// save
}// class Profil
