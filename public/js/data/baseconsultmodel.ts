//baseconsultmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseView} from './baseview';
import {FileDesc} from './filedesc';
import {IBaseItem, IFileDesc} from 'infodata';
//
export class BaseConsultViewModel<T extends IBaseItem> extends BaseView {
	//
	public items: T[] = [];
	private _current_item: T = null;
	protected fileDesc: IFileDesc = new FileDesc();
	public modelItem: T = null;
	private _page_size: number = 16;
	private _current_page: number = 0;
	private _pages_count: number = 0;
	public allIds: string[] = [];
	public pageStatus: string = null;
	//
	constructor(info: UserInfo) {
		super(info);
		this.modelItem = this.create_item();
		this._current_item = this.create_item();
	}// constructor
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			if (this.modelItem === null) {
				this.modelItem = this.create_item();
			}
			if (this._current_item === null) {
				this._current_item = this.create_item();
			}
			if (this.fileDesc === null) {
				this.fileDesc = new FileDesc();
			} else {
				this.fileDesc.clear();
			}
		})
	}
	protected create_item(): T {
		return null;
	}
	protected prepare_model(): any {
		return {};
	}// prepare_model
	//
	protected post_change_item(): Promise<any> {
		return Promise.resolve(true);
	}// post_change_item
	public get currentItem(): T {
		if (this._current_item == null){
			this._current_item = this.create_item();
		}
		return this._current_item;
	}
	public set currentItem(s: T) {
		this._current_item = ((s !== undefined) || (s !== null)) ? s : this.create_item();
		this.fileDesc.clear();
		let x = this.currentItem;
		if (x !== null) {
			let docid = this.currentItem.avatardocid();
			let id = this.currentItem.avatarid;
			let url = this.currentItem.url;
			if ((url === null) && (id !== null) && (docid !== null)) {
				this.retrieve_one_avatar(this.currentItem).then((v) => {
					this.post_change_item();
				})
			} else {
				this.post_change_item();
			}
		}
	}
	//
	protected get_all_ids(): Promise<string[]> {
		let sel: any = this.prepare_model();
		sel.type = this.create_item().type();
		return this.dataService.query_ids(sel);
	}// get_all_ids
	//
	public get canShowForm(): boolean {
		return this.is_refresh() && this.is_not_busy;
	}
	public get can_show():boolean{
		return this.is_refresh();
	}
	protected is_refresh(): boolean {
		return (!this.get_isbusy_change());
	}
	public refresh(): Promise<any> {
		this.is_busy = true;
		this.clear_error();
		if (this.items.length > 0) {
			for (let elem of this.items) {
				let x = elem.url;
				if (x !== null) {
					this.revokeUrl(x);
					elem.url = null;
				}
			}// elem
		}
		this.items = [];
		let nbItems = this.allIds.length;
		if (nbItems < 1) {
			this.is_busy =false;
			return Promise.resolve(true);
		}
		let nc = this.itemsPerPage;
		let istart = (this.currentPage - 1) * nc;
		if (istart < 0) {
			istart = 0;
		}
		let iend = istart + nc - 1;
		if (iend >= nbItems) {
			iend = nbItems - 1;
		}
		let xids: string[] = [];
		for (let i = istart; i <= iend; ++i) {
			xids.push(this.allIds[i]);
		}
		let oldid: string = this.currentItem.id;
		return this.dataService.get_items_array(xids).then((rr: T[]) => {
			let rx = ((rr !== undefined) && (rr !== null)) ? rr : [];
			return this.retrieve_avatars(rx);
		}).then((xx: T[]) => {
			this.items = [];
			for (let xc of xx) {
				this.add_item_to_array(this.items, xc);
			}
			let p = this.sync_array(this.items, oldid);
			this.currentItem = p;
			this.pageStatus = this.get_pageStatus();
			this.is_busy = false;
			return true;
		}).catch((e)=>{
			this.is_busy = false;
			return true;
		});
	}// refresh
	public get_pageStatus(): string {
		return (this.pagesCount > 1) ?
			('Page ' + this.currentPage + ' sur ' + this.pagesCount) : null;
	}
	protected prepare_refresh(): void {
		this.allIds = [];
		this._pages_count = 0;
		this._current_page = 0;
		this.items = [];
		this.pageStatus = null;
	}
	public refreshAll(): Promise<any> {
		this.is_busy = true;
		this.prepare_refresh();
		if (!this.is_refresh()) {
			this.is_busy = false;
			return Promise.resolve(true);
		}
		let nc = this.itemsPerPage;
		this.clear_error();
		return this.get_all_ids().then((ids) => {
			this.allIds = ((ids !== undefined) && (ids !== null)) ? ids : [];
			let nt = this.allIds.length;
			let np = Math.floor(nt / nc);
			if ((np * nc) < nt) {
				++np;
				this.pagesCount = np;
			}
			return this.refresh();
		}).catch((err) => {
			this.set_error(err);
			this.is_busy = false;
			return false;
		})
	}// refreshAll
	public get hasItems(): boolean {
		return (this.allIds.length > 0);
	}
	public get hasPages(): boolean {
		return (this.pagesCount > 1);
	}
	public get pagesCount(): number {
		return this._pages_count;
	}
	public set pagesCount(s: number) {
		this._pages_count = ((s !== undefined) && (s !== null) && (s >= 0)) ? s : 0;
	}
	public get itemsPerPage(): number {
		return ((this._page_size !== undefined) && (this._page_size > 0)) ?
			this._page_size : 16;
	}
	public set itemsPerPage(s: number) {
		let n = this.check_number(s);
		if ((n !== null) && (n > 0) && (n != this._page_size)) {
			this._page_size = n;
			this.refreshAll();
		}
	}
	public get currentPage(): number {
		if ((this._current_page === undefined) || (this._current_page === null)) {
			this._current_page = 0;
		}
		return (this._current_page + 1);
	}
	public set currentPage(s: number) {
		let n = this.check_number(s);
		if ((n !== null) && (n > 0)) {
			--n;
			if ((n >= 0) && (n != this._current_page)) {
				this._current_page = n;
				this.refresh();
			}
		}// n
	}// set currentPage
	public get canPrevPage(): boolean {
		return (this._current_page > 0);
	}
	public get canNextPage(): boolean {
		return ((this._current_page + 1) < this._pages_count);
	}
	public firstPage(): void {
		if (this.currentPage > 1) {
			this.currentPage = 1;
		}
	}
	public prevPage(): void {
		if (this.currentPage > 1) {
			let n = this.currentPage - 1;
			this.currentPage = n;
		}
	}
	public nextPage(): void {
		let n = this.currentPage;
		if (n < this._pages_count) {
			this.currentPage = n + 1;
		}
	}// nextPage
	public lastPage(): void {
		let n = this.currentPage;
		if (n < this._pages_count) {
			this.currentPage = this._pages_count;
		}
	}


}// class BaseConsultViewModel
