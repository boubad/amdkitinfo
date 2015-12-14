//baseconsultbar.ts
import {BaseConsultViewModel} from '../../data/baseconsultmodel';
import {BaseBar} from './basebar';
import {IBaseItem} from 'infodata';
import {BaseModel} from '../../data/basemodel';
//
export class BaseConsultBar<T extends IBaseItem> extends BaseBar<BaseConsultViewModel<T>> {
	constructor() {
		super();
	}
	public get canShowForm(): boolean {
        return (this.parent !== null) ? this.parent.canShowForm : false;
    }
    public refreshAll(): any {
        if (this.parent !== null) {
            return this.parent.refreshAll();
        } else {
            return Promise.resolve(false);
        }
    }
    public get items(): T[] {
        return (this.parent !== null) ? this.parent.items : [];
    }
    public get currentItem(): T {
        return (this.parent !== null) ? this.parent.currentItem : null;
    }
    public set currentItem(s: T) {
        if (this.parent !== null) {
            this.parent.currentItem = s;
        }
    }
    public get hasItems(): boolean {
        return (this.parent !== null) ? this.parent.hasItems : false;
    }
    public get hasPages(): boolean {
        return (this.parent !== null) ? this.parent.hasPages : false;
    }
    public get pageStatus(): string {
        return (this.parent !== null) ? this.parent.pageStatus : null;
    }
    public get pagesCount(): number {
        return (this.parent !== null) ? this.parent.pagesCount : 0;
    }
    public get itemsPerPage(): number {
        return (this.parent !== null) ? this.parent.itemsPerPage : 16;
    }
    public set itemsPerPage(s: number) {
        if (this.parent !== null) {
            this.parent.itemsPerPage = s;
        }
    }
    public get canPrevPage(): boolean {
        return (this.parent !== null) ? this.parent.canPrevPage : false;
    }
    public get canNextPage(): boolean {
        return (this.parent !== null) ? this.parent.canNextPage : false;
    }
    public firstPage(): void {
        if (this.parent !== null) {
            this.parent.firstPage();
        }
    }
    public prevPage(): void {
        if (this.parent !== null) {
            this.parent.prevPage();
        }
    }
    public nextPage(): void {
        if (this.parent !== null) {
            this.parent.nextPage();
        }
    }
    public lastPage(): void {
        if (this.parent !== null) {
            this.parent.lastPage();
        }
    }
}