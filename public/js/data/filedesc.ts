//filedesc.ts
//
import {IFileDesc, IUIManager} from 'infodata';
import {UIManager} from  './uimanager';
//
interface MyEvent extends EventTarget {
  target: { files: any, result: any };
}
interface MyProgressEvent extends ProgressEvent {
  result: any;
}
//
export class FileDesc implements IFileDesc {
  //
  private _filename: string;
  private _filetype: string;
  private _filedata: Blob;
  private _dataurl: string;
  private _uimanager: IUIManager;
  //
  constructor(man?: IUIManager) {
		if ((man !== undefined) && (man !== null)) {
			this._uimanager = man;
		}
  }// constructor
  private get uimanager(): IUIManager {
    if ((this._uimanager === undefined) || (this._uimanager === null)) {
      this._uimanager = new UIManager();
    }
    return (this._uimanager !== undefined) ? this._uimanager : null;
  }
  public get name(): string {
    return (this._filename !== undefined) ? this._filename : null;
  }
  public get type(): string {
    return (this._filetype !== undefined) ? this._filetype : null;
  }
  public get data(): Blob {
    return (this._filedata !== undefined) ? this._filedata : null;
  }
  public get url(): string {
    return (this._dataurl !== undefined) ? this._dataurl : null;
  }
  public get has_url(): boolean {
    return (this.url !== null);
  }
  public get is_storeable(): boolean {
    return (this.name !== null) && (this.type !== null) && (this.data !== null);
  }
	public clear_url(): void{
		this._dataurl = null;
	}
  public clear(): void {
    this._filename = null;
    this._filetype = null;
    this._filedata = null;
    this._dataurl = null;
  }
  public changed(event: MyEvent, bUrl?: boolean): any {
    let files = event.target.files;
    if ((files !== undefined) && (files !== null) && (files.length > 0)) {
      let file = files[0];
      let fr = new FileReader();
      fr.onloadend = (e: any) => {
        let data = e.target.result;
        let dd = new Uint8Array(data);
        let blob = new Blob([dd]);
        this._filedata = blob;
        this._filename = file.name;
        this._filetype = file.type;
				if (this._dataurl !== null) {
					this.uimanager.revokeUrl(this._dataurl);
					this._dataurl = null;
				}
        if (this._filedata !== null) {
          if ((bUrl !== undefined) && (bUrl !== null) && (bUrl == true)) {
						this._dataurl = this.uimanager.createUrl(this._filedata);
					}
        }
      };
      fr.readAsArrayBuffer(file);
    }// files
  }// fileChanged
}// class FileDesc
