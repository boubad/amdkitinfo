// synchromodel.ts
import {UserInfo} from './userinfo';
import {SynchroManager} from './syncmanager';
import {BaseView} from './baseview';
//
//
export class SynchroModel extends BaseView {
	//
	private _manager: SynchroManager;
	private _candidateServer: string;
	private _canPerform: boolean;
	//
	constructor(info: UserInfo) {
		super(info);
		if ((info !== undefined) && (info !== null)) {
			this._manager = new SynchroManager(info.dataService);
			this._canPerform = true;
		}
	}
	public get candidateServer(): string {
		return (this._candidateServer !== undefined) ? this._candidateServer : "";
	}
	public set candidateServer(s: string) {
		this._candidateServer = s;
	}
	private get syncManager(): SynchroManager {
		return (this._manager !== undefined) ? this._manager : null;
	}
	public get canPerform(): boolean {
		return ((this._canPerform !== undefined) && (this._canPerform !== null)) ? this._canPerform : false;
	}
	public set canPerform(b: boolean) {
		this._canPerform = b;
	}
	public get servers(): string[] {
        return (this.syncManager !== null) ? this.syncManager.servers : [];
    }
    public get currentServer(): string {
        return (this.syncManager !== null) ? this.syncManager.currentServer : null;
    }
    public set currentServer(s: string) {
		if (this.syncManager !== null) {
			this.syncManager.currentServer = s;
		}
    }

    public get canRemoveServer(): boolean {
        return (this.currentServer !== null) && (this.currentServer.trim().length > 0) &&
			this.canImport && this.canExport;
    }
    public get cannotRemoveServer(): boolean {
        return (!this.canRemoveServer);
    }
    public removeServer(): void {
		if (this.syncManager !== null) {
			this.syncManager.remove_server(this.currentServer);
		}
    }// removeServer
    //
    public get canAddServer(): boolean {
        return (this.candidateServer !== null) && (this.candidateServer.trim().length > 0) &&
			this.canImport && this.canExport;
    }
    public get cannotAddServer(): boolean {
        return (!this.canAddServer);
    }
    public addServer(): void {
		if (this.syncManager !== null) {
			this.syncManager.add_server(this.candidateServer);
			this.candidateServer = null;
		}
    }// addServer
    //
	public get canImport(): boolean {
        return (this.currentServer !== null) ? this.syncManager.canImport : false;
    }
	public get canExport(): boolean {
        return (this.currentServer !== null) ? this.syncManager.canExport : false;
    }
	public import(): Promise<any> {
		this.canPerform = false;
		this.clear_error();
		this.info_message = "Synchronization en cours (import) ...";
		return this.syncManager.import_from().then((r) => {
			this.userInfo.loginInfo.refresh_data();
			this.info_message = "Synchronization terminée!";
			this.canPerform = true;
			return true;
		}).catch((e) => {
			this.set_error(e);
			this.canPerform = true;
			return false;
		})
	}
	public export(): Promise<any> {
		this.canPerform = false;
		this.clear_error();
		this.info_message = "Synchronization en cours (export) ...";
		return this.syncManager.export_to().then((r) => {
			this.info_message = "Synchronization terminée";
			this.canPerform = true;
			return true;
		}).catch((e) => {
			this.set_error(e);
			this.canPerform = true;
			return false;
		})
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		let userinfo = this.userInfo;
		if (userinfo !== null) {
			bRet = userinfo.is_connected && (!userinfo.is_etud);
		}
		return bRet;
    }// activate
}// SynchroModel
