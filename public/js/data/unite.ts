//unite.ts
import {IUnite} from 'infodata';
import {DepartementSigleNamedItem} from './departementsiglenameditem';
import {UNITE_TYPE, UNITE_PREFIX} from './infoconstants';
//
export class Unite extends DepartementSigleNamedItem {
    private _order: number;
    private _coefficient: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.order !== undefined) {
                this.order = oMap.order;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((this.order !== undefined) && (this.order !== null)) {
			oMap.order = this.order;
		}
		if ((this.coefficient !== undefined) && (this.coefficient !== null)) {
			oMap.coefficient = this.coefficient;
		}
    }// toMap
    public get order(): number {
        return ((this._order !== undefined) && (this._order !== null)) ? this._order : 0;
    }
    public set order(n: number) {
        this._order = this.check_number(n);
    }
    public get coefficient(): number {
        return ((this._coefficient !== undefined) && (this._coefficient !== null) &&
            (this._coefficient > 0.0)) ? this._coefficient : 1.0;
    }
    public set coefficient(n: number) {
        this._coefficient = this.check_number(n);
    }
    public type(): string {
        return UNITE_TYPE;
    }
    public store_prefix(): string {
        return UNITE_PREFIX;
    }
}// class Unite
