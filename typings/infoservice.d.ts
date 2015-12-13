// infoservice.d.ts
//
declare module 'infodata' {
    //
    export interface IUIManager {
        createUrl: (data: Blob) => string;
        revokeUrl: (s: string) => void;
        confirm: (question: string) =>Promise<boolean>;
		info: (text: string) =>Promise<any>;
    }// interface IUIManager
    export interface IObjectStore {
        get_value: (key: string) => string;
        store_value: (key: string, value: string) => any;
        remove_value: (key: string) => any;
        clear: () => any;
    }// interface IObjectStore
    export interface IFileDesc {
        name: string;
        type: string;
        data: Blob;
        url: string;
        //
        has_url: boolean;
        is_storeable: boolean;
        clear: () => void;
		clear_url: ()=> void;
        changed: (evt: any,bUrl?:boolean) => any;
    }// interface IFileDesc
	export interface IInfoRouter {
		navigate_to : (route:string,args?:any) => any;
	}// interface IInfoRouter
}// module infodaya