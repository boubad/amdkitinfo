//groupesmodel.ts
//
import {UserInfo} from './userinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {IGroupe, IElementDesc} from 'infodata';
import {GENRE_PROMO, GENRE_TD, GENRE_TP} from './infoconstants';
//
export class GroupesModel extends DepSigleNameViewModel<IGroupe> {
	private _genres: IElementDesc[] = [{ id: GENRE_TP, display: "Travaux Pratiques" },
		{ id: GENRE_TD, display: "Travaux Dirigés" }, { id: GENRE_PROMO, display: "Amphi" }
	];
	//
	public leftgroupes: IGroupe[] = [];
	public rightgroupes: IGroupe[] = [];
	public selectedLeft: IGroupe[] = [];
	public selectedRight: IGroupe[] = [];
	//
	private all_children: IGroupe[] = [];
	public _xgenre: IElementDesc = null;
	//
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Groupes';
    }// constructor
	public get canHaveChildren(): boolean {
		let p = this.currentItem;
		return (p !== null) && (p.genre !== null) && (p.genre != GENRE_TP);
	}
	public get hasCandidates(): boolean {
		return ((this.leftgroupes !== undefined) && (this.leftgroupes !== null) && (this.leftgroupes.length > 0));
	}
	public get hasChildren(): boolean {
		return ((this.rightgroupes !== undefined) && (this.rightgroupes !== null) && (this.rightgroupes.length > 0));
	}
	public get allGenres(): IElementDesc[] {
		return this._genres;
	}
	public get xgenre(): IElementDesc {
		return (this._xgenre !== undefined) ? this._xgenre : null;
	}
	public set xgenre(s: IElementDesc) {
		this._xgenre = s;
		if (this.currentItem !== null) {
			this.currentItem.genre = ((this._xgenre !== undefined) && (this._xgenre !== null)) ? this._xgenre.id : null;
			this.check_groupes();
		}
	}
	public get canAddChildren(): boolean {
		return ((this.selectedLeft !== undefined) && (this.selectedLeft !== null) && (this.selectedLeft.length > 0));
	}
	public get canRemoveChildren(): boolean {
		return ((this.selectedRight !== undefined) && (this.selectedRight !== null) && (this.selectedRight.length > 0));
	}
	public add_children(): any {
		if (!this.canAddChildren) {
			return;
		}
		let p: IGroupe = this.currentItem;
		if (p === null) {
			return;
		}
		for (let xp of this.selectedLeft) {
			this.currentItem.add_child(xp);
		}
		this.check_groupes();
		return this.dataService.save_item(this.currentItem).then((r)=>{
			return this.dataService.maintains_items(this.rightgroupes);
		});
	}// addGroupe
	public remove_children(): any {
		if (!this.canRemoveChildren) {
			return;
		}
		let p: IGroupe = this.currentItem;
		if (p === null) {
			return;
		}
		for (let x of this.selectedRight) {
			this.currentItem.remove_child(x);
		}
		this.check_groupes();
		return this.dataService.save_item(this.currentItem).then((r)=>{
			return this.dataService.maintains_items(this.rightgroupes);
		});
	}// addGroupe
	protected create_item(): IGroupe {
		return this.itemFactory.create_groupe({
			departementid: this.departementid, genre: GENRE_TP
		});
	}
	private get_departement_groupes(): Promise<IGroupe[]> {
		let oRet:IGroupe[] = [];
		if (this.departementid == null){
			return Promise.resolve(oRet);
		}
		let m = this.itemFactory.create_groupe();
		let sel:any = {departementid:this.departementid};
		return this.dataService.query_items(m.type(),sel).then((gg:IGroupe[])=>{
			oRet = ((gg !== undefined) && (gg !== null)) ? gg : [];
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_departement_groupes
	protected post_update_departement(): Promise<boolean> {
		return super.post_update_departement().then((b) => {
			return this.get_departement_groupes();
		}).then((gg: IGroupe[]) => {
			this.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			this.check_groupes();
			return true;
		});
    }
	public save(): Promise<any> {
		let self = this;
		let service = this.dataService;
		let gitems: IGroupe[] = [];
		for (let x of this.all_children) {
			if (x.selected) {
				gitems.push(x);
			}
		}// x
		return super.save().then((b) => {
			if (gitems.length > 0) {
				return service.maintains_items(gitems);
			} else {
				let bx: boolean[] = [];
				return Promise.resolve(bx);
			}
		}).then((xx) => {
			return this.get_departement_groupes();
		}).then((gg: IGroupe[]) => {
			self.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			self.check_groupes();
			return true;
		});
	}// save
	public remove(): Promise<any> {
		let self = this;
		let service = this.dataService;
		return super.remove().then((b) => {
			return this.get_departement_groupes();
		}).then((gg: IGroupe[]) => {
			self.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			self.check_groupes();
			return true;
		});
	}// save
	private check_groupes(): void {
		this.selectedLeft = [];
		this.selectedRight = [];
		this.rightgroupes = [];
		this.leftgroupes = [];
		let g: IGroupe = this.currentItem;
		if (g == null) {
			return;
		}
		let genre: string = g.genre;
		if (genre == null) {
			return;
		}
		if (genre == GENRE_TP) {
			return;
		}
		let ids = g.childrenids;
		for (let gx of this.all_children) {
			let id = gx.id;
			let bFound: boolean = false;
			for (let xid of ids) {
				if (xid == id) {
					bFound = true;
					break;
				}
			}// xid
			if (bFound) {
				this.rightgroupes.push(gx);
			} else {
				if (genre == GENRE_TD) {
					if ((gx.genre == GENRE_TP) && (gx.parentid == null)) {
						this.leftgroupes.push(gx);
					}
				} else if (genre == GENRE_PROMO) {
					if ((gx.genre == GENRE_TD) && (gx.parentid == null)) {
						this.leftgroupes.push(gx);
					}
				}
			}
		}// gx
	}// check_groupes
	protected post_change_item(): Promise<any> {
		let self = this;
		return super.post_change_item().then((b) => {
			self.check_groupes();
			self._xgenre = null;
			let p = self.currentItem;
			if (p !== null) {
				let xs: string = p.genre;
				if (xs !== null) {
					for (let x of self.allGenres) {
						if (x.id == xs) {
							self._xgenre = x;
							break;
						}
					}// x
				}// xs
			}// p
			return true;
		});
	}// post_change_item
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			return this.get_departement_groupes();
		}).then((gg: IGroupe[]) => {
			this.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			this.check_groupes();
			return true;
		});
	}// perform_activate
}// class Unites