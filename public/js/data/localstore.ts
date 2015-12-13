//localstore.ts
import {IObjectStore} from 'infodata';
//
declare var window;
//
const ISLOCAL: boolean = (window !== undefined) && (window !== null) &&
    (window.localStorage !== undefined) && (window.localStorage !== null);
//
export class LocalStore implements IObjectStore {
    constructor() {
    }
    public get_value(key: string): string {
        if (ISLOCAL) {
            return window.localStorage.getItem(key);
        } else {
			return null;
        }
    }
    public store_value(key: string, val: string): any {
        if (ISLOCAL) {
            window.localStorage.setItem(key, val);
        } 
    }
    public remove_value(key: string): any {
        if (ISLOCAL) {
            window.localStorage.removeItem(key);
        } 
    }
    public clear(): any {
    }// clear
}
