//dataservice.d.ts
/// <reference path='./infodata.d.ts' />
/// <reference path='./docpersist.d.ts' />
//
declare module 'infodata' {
	//
	export interface IDataService {
        service: IDocPersist;
        itemFactory: IItemFactory;
        name: string;
        is_valid: boolean;
		//
		is_online: () => Promise<boolean>;
        find_item_by_id: (id: string, bAttach?: boolean,bMeta?:boolean) => Promise<IBaseItem>;
        save_item: (p: IBaseItem) => Promise<boolean>;
        remove_item: (p: IBaseItem) => Promise<boolean>;
        maintains_items: (pp: IBaseItem[]) => Promise<boolean[]>;
        get_ids: (startkey: string, endkey?: string, skip?: number, limit?: number) => Promise<string[]>;
        get_items_range: (startkey: string, endkey: string, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        get_items_array: (ids: string[]) => Promise<IBaseItem[]>;
        remove_all_items: (startKey: string, endKey: string) => Promise<boolean>;
        //
        find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        maintains_attachment: (docid: string, attachmentId: string,
            attachmentData: Blob, attachmentType: string) => Promise<boolean>;
        remove_attachment: (docid: string, attachmentId: string) => Promise<boolean>;
        //
        replicate_all: (from: string, to: string) => Promise<any>;
        replicate_person: (pPers: IPerson, from: string, to: string) => Promise<any>;
        replicate_to: (to: string) => Promise<any>;
        replicate_person_to: (pPers: IPerson, to: string) => Promise<any>;
        replicate_from: (from: string) => Promise<any>;
        replicate_person_from: (pPers: IPerson, from: string) => Promise<any>;
        //
        query_items: (type: string, selector?: any, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        query_by_template: (temp: IBaseItem, skip?: number, limit?: number) => Promise<IBaseItem[]>;
        query_ids: (selector?: any, skip?: number, limit?: number) => Promise<string[]>;
    }// interface IDataService
}
//