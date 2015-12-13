//intervalledsigleitem.ts
import {SigleNamedItem} from'./siglenameditem';
import {IIntervalledSigleItem} from 'infodata';
//
export class IntervalledSigleItem extends SigleNamedItem implements IIntervalledSigleItem {
    private _start: Date;
    private _end: Date;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
		if (this.startDate !== null) {
			oMap.startDate = this.startDate;
		}
		if (this.endDate !== null) {
			oMap.endDate = this.endDate;
		}
    }// toMap
    public get startDate(): Date {
        return (this._start !== undefined) ? this._start : null;
    }
    public set startDate(d: Date) {
        this._start = this.check_date(d);
    }
    public get endDate(): Date {
        return (this._end !== undefined) ? this._end : null;
    }
    public set endDate(d: Date) {
        this._end = this.check_date(d);
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.startDate !== null)) {
            s = s + '-' + this.create_date_key(this.startDate);
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        if ((!super.is_storeable()) || (this.startDate === null)
            || (this.endDate === null)) {
            return false;
        }
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }

    public sort_func(p1: IntervalledSigleItem, p2: IntervalledSigleItem): number {
        let d1 = p1.startDate;
        let d2 = p2.startDate;
        if ((d1 !== null) && (d2 !== null)) {
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if (t1 > t2) {
                return -1;
            } else if (t1 < t2) {
                return 1;
            } else {
                return 0;
            }
        } else if ((d1 === null) && (d2 !== null)) {
            return 1;
        } else if ((d1 !== null) && (d2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
} // class IntervalledSigleItem
