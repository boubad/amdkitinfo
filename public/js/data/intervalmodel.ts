// intervalmodel.ts
import {UserInfo} from './userinfo';
import {SigleNamedViewModel} from './siglenamedmodel';
import {IIntervalledSigleItem} from 'infodata';
//
export class IntervalledViewModel<T extends IIntervalledSigleItem> extends SigleNamedViewModel<T> {
	//
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get startDate(): string {
      return (this.currentItem !== null) ?
      this.date_to_string(this.currentItem.startDate) : null;
    }
    public set startDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.startDate=this.string_to_date(s);
        }
    }
    public get endDate(): string {
      return (this.currentItem !== null) ?
      this.date_to_string(this.currentItem.endDate) : null;
    }
    public set endDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.endDate=this.string_to_date(s);
        }
    }
	protected get_min_date(): string {
		return this.semestreMinDate;
	}
	protected get_max_date(): string {
		return this.semestreMaxDate;
	}
    public get minDate(): string {
		return this.get_min_date();
    }
    public get maxDate(): string {
		return this.get_max_date();
    }
}