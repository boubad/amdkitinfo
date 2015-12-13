//geninfo.d.ts
//
declare module 'infodata' {
   
    //
    export interface IInfoElement {
		id: string;
		has_id?: boolean;
		text?: string;
		toString?: () => string;
		sort_func?: (p1: IInfoElement, p2: IInfoElement) => number;
    } // interface IInfoElement
    //
    export interface IElementDesc extends IInfoElement {
		display?: string;
		selected?: boolean;
        avatarid?: string;
        url?: string;
        description?: string;
        has_url?: boolean;
    }// interface IElementDesc
    //
	export interface IAttachedDoc extends IElementDesc {
		content_type: string;
		title?: string;
		digest?: string;
		stub?: boolean;
		data?: any;
		length?: number;
		revpos?: number;
		keywords?: string[];
		to_map: () => any;
    } // interface IAttachedDoc
    export interface IBaseItem extends IElementDesc {
		rev: string;
		has_rev: boolean;
		deleted: boolean;
		status?: string;
		avatardocid?: () => string;
		is_storeable: () => boolean;
        type: () => string;
        store_prefix: () => string;
        start_key: () => string;
        end_key: () => string;
        create_id: () => string;
        check_id: () => void;
		to_map: (oMap: any) => void;
		get_person_id?: () => string;
		check_person?: (oPers: IPerson) => boolean;
        //
        attachments?: IAttachedDoc[];
    }// interface IBaseItem
	
    export interface ISigleNamedItem extends IBaseItem {
        sigle: string;
        name: string;
    }
    export interface IDepartement extends ISigleNamedItem {

    }
    export interface IDepartementSigleNamedItem extends ISigleNamedItem {
        departementid: string;
    }
    export interface IUnite extends IDepartementSigleNamedItem {
        order: number;
        coefficient: number;
    }
    export interface IGroupe extends IDepartementSigleNamedItem {
        genre: string;
        parentid: string;
        childrenids: string[];
        has_children: boolean;
        has_parent: boolean;
		is_leaf:boolean;
        //
        add_child: (g: IGroupe) => void;
        remove_child: (g: IGroupe) => boolean;
    }
    export interface IMatiere extends ISigleNamedItem {
        uniteid: string;
        genre: string;
        matmodule?: string;
        order?: number;
        ecs?: number;
        coefficient?: number;
    }
    export interface IIntervalledSigleItem extends ISigleNamedItem {
        startDate: Date;
        endDate: Date;
    }
    export interface IAnnee extends IIntervalledSigleItem {
        departementid: string;
    }
    export interface ISemestre extends IIntervalledSigleItem {
        anneeid: string;
    }
    export interface IPerson extends IBaseItem {
        username: string;
        password: string;
        firstname: string;
        lastname: string;
        email?: string;
        phone?: string;
		//
		is_super: boolean;
        //
        departementids?: string[];
        groupeids?: string[];
        anneeids?: string[];
        semestreids?: string[];
        uniteids?: string[];
        matiereids?: string[];
        affectationids?: string[];
        eventids?: string[];
        etudiantids?: string[];
        enseignantids?: string[];
        administratorids?: string[];
        //
        dossier?: string;
        sexe?: string;
        birthDate?: Date;
		birthYear?:number;
        ville?: string;
        etablissement?: string;
        serieBac?: string;
        optionBac?: string;
        mentionBac?: string;
        etudesSuperieures: string;
        apb?: string;
        //
        fullname: string;
        reset_password: () => void;
        change_password: (ct: string) => void;
        check_password: (ct: string) => boolean;
        //
        get_all_ids?: () => string[];
		//
		groupeSigle?: string;
		groupeid?: string;
    }
    interface IPersonItem extends IBaseItem {
		departementid: string;
		departementName?: string;
        personid: string;
        firstname?: string;
        lastname?: string;
        fullname?: string;
    }
    interface IDepartementPerson extends IPersonItem {
    }
    export interface IEtudiant extends IDepartementPerson {

    }
    export interface IEnseignant extends IDepartementPerson {

    }
    export interface IAdministrator extends IDepartementPerson {

    }
    export interface IAffectation extends IPersonItem {
        anneeid: string;
        semestreid: string;
        groupeid: string;
        startDate: Date;
        endDate: Date;
		anneeName?: string;
		semestreName?: string;
        groupeName?: string;
		semestreMinDate?: Date;
		semestreMaxDate?: Date;
    }
    export interface IEtudiantAffectation extends IAffectation {
        etudiantid: string;
    }
    export interface IEnseignantAffectation extends IAffectation {
        enseignantid: string;
        uniteid: string;
        matiereid: string;
		uniteName?: string;
		matiereName?: string;
    }
    export interface IInfoEvent extends IPersonItem {
        semestreid: string;
        matiereid: string;
        groupeid: string;
        genre: string;
        matiereName?: string;
        groupeName?: string;
        eventDate: Date;
        coefficient: number;
        semestreName?: string;
        anneeid: string;
        anneeName: string;
        matiereCoefficient: number;
        uniteid: string;
        uniteCoefficient: number;
        uniteName?: string;
		semestreMinDate?: Date;
		semestreMaxDate?: Date;
		dateString?:string;
    }
    export interface IGroupeEvent extends IInfoEvent {
        profaffectationid: string;
        name: string;
        location: string;
        eventDate: Date;
        minnote: number;
        maxnote: number;
        startTime: string;
        endTime: string;
    }
    export interface IEtudiantEvent extends IInfoEvent {
        groupeeventid: string;
        groupeEventName: string;
        etudiantid: string;
        etudiantaffectationid: string;
        note: number;
    }
	//
	export interface IItemFactory {
        create_item: (oMap?: any) => IBaseItem;
        create_etudiantevent: (oMap?: any) => IEtudiantEvent;
        create_groupeevent: (oMap?: any) => IGroupeEvent;
        create_etudiantaffectation: (oMap?: any) => IEtudiantAffectation;
        create_enseignantaffectation: (oMap?: any) => IEnseignantAffectation;
        create_semestre: (oMap?: any) => ISemestre;
        create_matiere: (oMap?: any) => IMatiere;
        create_groupe: (oMap?: any) => IGroupe;
        create_unite: (oMap?: any) => IUnite;
        create_annee: (oMap?: any) => IAnnee;
        create_departement: (oMap?: any) => IDepartement;
        create_person: (oMap?: any) => IPerson;
        create_etudiant: (oMap?: any) => IEtudiant;
        create_enseignant: (oMap?: any) => IEnseignant;
        create_administrator: (oMap?: any) => IAdministrator;
		create_super_administrator: () => IPerson;
    }
	//
	export interface IDisplayEtudiant extends IBaseItem {
		departementid?: string;
		uniteid?: string;
        matiereid?: string;
        groupeid?: string;
		anneeid?: string;
		semestreid?: string;
        personid?: string;
        etudiantid?: string;
        //
        firstname?: string;
        lastname?: string;
		fullname?: string;
		departementName?: string;
		uniteName?: string;
		matiereName?: string;
		groupeName?: string;
		anneeName?: string;
		semestreName?: string;
		//
        coefficient?: number;
		matiereCoefficient?: number;
		uniteCoefficient?: number;
        note?: number;
        absencesCount?: number;
        retardsCount?: number;
        miscCount?: number;
        notesCount?: number;
        sortCriteria?: number;
        observations?: string[];
        order?: number;
        //
        count?: number;
        sumcoefs?: number;
        sumdata?: number;
    }// interface IDisplayEtudiant
    //
	export interface ITransformArray {
		read_file: (file: File) => Promise<any[]>;
        transform_map: (oMap: any) => IBaseItem;
        transform_file: (file: File, stype: string) => Promise<any>;
    }
	//
}// module infodata
