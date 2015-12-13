//docpersist.d.ts
//
declare module 'infodata' {
	export interface IDocPersist {
        name: string;
		//
        exists_doc: (docid: string) => Promise<string>;
        read_doc: (docid: string, bAttachments?: boolean, bMeta?: Boolean) => Promise<any>;
        insert_doc: (doc: any) => Promise<any>;
        update_doc: (doc: any) => Promise<any>;
        remove_doc: (doc: any) => Promise<any>;
        bulk_maintains: (docs: any[]) => Promise<any>;
        docs_ids_range: (startkey: string, endkey: string,skip?: number, limit?: number) => Promise<string[]>;
        docs_read_range: (startkey: string, endkey: string, skip?: number, limit?: number) => Promise<any[]>;
        docs_array: (ids: string[]) => Promise<any[]>;
        remove_all_items: (startKey: string, endKey: string) => Promise<any>;
		//
        isOnline: () => Promise<boolean>;
		//
        find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        maintains_attachment: (docid: string, attachmentId: string,
            attachmentData: Blob, attachmentType: string) => Promise<any>;
        remove_attachment: (docid: string, attachmentId: string) => Promise<any>;
        //
        replicate: (from: string, to: string, ids?: string[]) => Promise<boolean>;
        //
        create_one_index: (field: string) => Promise<boolean>;
        create_multi_index: (fields: string[]) => Promise<boolean>;
        create_indexes: (fields: string[]) => Promise<boolean[]>;
        query_docs: (selector: any,  skip?: number, limit?: number,fields?: string[]) => Promise<any[]>;
    }// interface IIDocPersist
    //
}// module infodata
