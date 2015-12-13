//import-bar.ts
//
//
import {BaseBar} from './basebar';
import {PersonViewModel} from '../../data/personmodel';
import {IDepartementPerson} from 'infodata';
import {customElement} from 'aurelia-framework';
//
@customElement('import-bar')
export class ImportBar extends BaseBar<PersonViewModel<IDepartementPerson>> {
	//
	constructor() {
		super();
	}
	//
	public get isEditable(): boolean {
		return (this.parent !== null) ? this.parent.isEditable : false;
    }
    public get canImport(): boolean {
        return (this.parent !== null) ? this.parent.canImport : false;
    }
    public importFileChanged(event: any): any {
        if (this.parent !== null) {
			this.parent.importFileChanged(event);
        }
	}
	//
}// class ImportBar