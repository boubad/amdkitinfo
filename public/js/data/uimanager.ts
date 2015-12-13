//uimanager.ts
import {IUIManager} from 'infodata';
//
declare var window: any;
const HAS_WINDOW: boolean = (window !== undefined) && (window !== null);
const HAS_URL: boolean = HAS_WINDOW && (window.URL !== undefined) && (window.URL !== null);
//
export class UIManager implements IUIManager {
    constructor() {
    }
    public createUrl(blob: Blob): string {
        let sRet: string = null;
        if (HAS_URL && (blob !== undefined) && (blob !== null)) {
            try {
                sRet = window.URL.createObjectURL(blob);
            } catch (e) {
				console.log(e.toString());
			}
        }
        return sRet;
    }
    public revokeUrl(url: string): void {
        if (HAS_URL && (url !== undefined) && (url !== null)) {
            try {
                window.URL.revokeObjectURL(url);
            } catch (e) { }
        }
    }// revokeUrl
    public confirm(s: string): Promise<boolean> {
        if (HAS_WINDOW) {
            return Promise.resolve(window.confirm(s));
        } else {
            return Promise.resolve(true);
        }
    }// confirm
	public info(s: string): Promise<any> {
        if (HAS_WINDOW) {
			window.alert(s);
        }
		return Promise.resolve(true);
    }// confirm
}// class UIManager
