//attacheddoc.ts
import {ElementDesc} from './elementdesc';
import {IAttachedDoc} from 'infodata';
//
export class AttachedDoc extends ElementDesc implements IAttachedDoc {
	private _content_type: string;
	private _title: string;
	private _digest: string;
	private _stub: boolean;
	private _data: any;
	private _length: number;
	private _revpos: number;
	private _keywords: string[];
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.content_type !== undefined) {
				this.content_type = oMap.content_type;
			}
			if (oMap.title !== undefined) {
				this.title = oMap.title;
			}
			if (oMap.digest !== undefined) {
				this.digest = oMap.digest;
			}
			if (oMap.stub !== undefined) {
				this.stub = oMap.stub;
			}
			if (oMap.data !== undefined) {
				this.data = oMap.data;
			}
			if (oMap.length !== undefined) {
				this.length = oMap.length;
			}
			if (oMap.revpos !== undefined) {
				this.revpos = oMap.revpos;
			}
			if (oMap.keywords !== undefined) {
				this.keywords = oMap.keywords;
			}
		}// oMap
	}
	//
	public to_map(): any {
		let oMap: any = {};
		if (this.id !== null) {
			oMap.id = this.id;
		}
		if (this.content_type !== null) {
			oMap.content_type = this.content_type;
		}
		if (this.title !== null) {
			oMap.title = this.title;
		}
		if (this.description !== null) {
			oMap.description = this.description;
		}
		if (this.keywords.length > 0) {
			oMap.keywords = this.keywords;
		}
		return oMap;
	}// to_map
	//
	public get keywords(): string[] {
		return ((this._keywords !== undefined) && (this._keywords !== null)) ? this._keywords : [];
	}
	public set keywords(s: string[]) {
		this._keywords = s;
	}
	public get revpos(): number {
		return ((this._revpos !== undefined) && (this._revpos !== null)) ? this._revpos : 0;
	}
	public set revpos(s: number) {
		this._revpos = s;
	}
	public get length(): number {
		return ((this._length !== undefined) && (this._length !== null)) ? this._length : 0;
	}
	public set length(s: number) {
		this._length = s;
	}
	public get stub(): boolean {
		return ((this._stub !== undefined) && (this._stub !== null)) ? this._stub : false;
	}
	public set stub(s: boolean) {
		this._stub = s;
	}
	public get data(): any {
		return (this._data !== undefined) ? this._data : null;
	}
	public set data(s: any) {
		this._data = s;
	}
	public get digest(): string {
		return (this._digest !== undefined) ? this._digest : null;
	}
	public set digest(s: string) {
		this._digest = this.check_string(s);
	}
	public get content_type(): string {
		return (this._content_type !== undefined) ? this._content_type : null;
	}
	public set content_type(s: string) {
		this._content_type = this.check_string(s);
	}
	public get title(): string {
		return (this._title !== undefined) ? this._title : null;
	}
	public set title(s: string) {
		this._title = this.check_string(s);
	}
}// class AttachedDoc
