//elementdesc.ts
import {InfoElement} from './infoelement';
import {IElementDesc} from 'infodata';
//
export class ElementDesc extends InfoElement implements IElementDesc {
	private _selected: boolean;
	private _avatarid: string;
	private _url: string;
	private _display: string;
	private _description: string;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.avatarid !== undefined) {
				this.avatarid = oMap.avatarid;
			}
			if (oMap.description !== undefined) {
				this.description = oMap.description;
			}
			if (oMap.display !== undefined) {
				this.display = oMap.display;
			}
			if (oMap.url !== undefined) {
				this.url = oMap.url;
			}
			if (oMap.selected !== undefined) {
				this.selected = oMap.selected;
			}
		}
	}
	//
	public get selected(): boolean {
		return ((this._selected !== undefined) && (this._selected !== null)) ?
			this._selected : false;
	}
	public set selected(s: boolean) {
		this._selected = s;
	}
	public get avatarid(): string {
		return (this._avatarid !== undefined) ? this._avatarid : null;
	}
	public set avatarid(s: string) {
		this._avatarid = this.check_string(s);
	}
	public get url(): string {
		return (this._url !== undefined) ? this._url : null;
	}
	public set url(s: string) {
		this._url = this.check_string(s);
	}
	public get has_url(): boolean {
		return (this.url !== null);
	}
	public get display(): string {
		return (this._display !== undefined) ? this._display : null;
	}
	public set display(s: string) {
		this._display = this.check_string(s);
	}
	public get description(): string {
		return (this._description !== undefined) ? this._description : null;
	}
	public set description(s: string) {
		this._description = this.check_string(s);
	}
	public toString(): string {
		let s = this.display;
		return (s !== null) ? s : '';
	}
}// class ElementDesc