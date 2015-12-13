//intervalbar.ts
//
//
import {BaseBar} from './basebar';
import {IntervalledViewModel} from '../../data/intervalmodel';
import {IIntervalledSigleItem} from 'infodata';
import {customElement} from 'aurelia-framework';
//
@customElement('interval-bar')
export class IntervalBar  extends BaseBar<IntervalledViewModel<IIntervalledSigleItem>>  {
    //
    constructor() {
        super();
    }
	public get isEditable(): boolean {
        return (this.parent !== null) ? this.parent.isEditable : false;
    }
    public get isReadOnly(): boolean {
        return (this.parent !== null) ? this.parent.isReadOnly : true;
    }
    public get minDate(): string {
		return (this.parent !== null) ? this.parent.minDate : null;
    }
    public get maxDate(): string {
		return (this.parent !== null) ? this.parent.maxDate : null;
    }
    public get startDate(): string {
		return (this.parent !== null) ? this.parent.startDate : null;
    }
    public set startDate(s: string) {
		if (this.parent !== null) {
			this.parent.startDate = s;
		}
    }
    public get endDate(): string {
		return (this.parent !== null) ? this.parent.endDate : null;
    }
    public set endDate(s: string) {
		if (this.parent !== null) {
			this.parent.endDate = s;
		}
    }
}// IntervalBar
