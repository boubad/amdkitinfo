//basebar.ts
//
import {BaseModel} from '../../data/basemodel'
import {UserInfo} from '../../data/userinfo';
import {IDepartement,IUnite,IAnnee,IMatiere,ISemestre,IGroupe} from 'infodata';
//
export class BaseBar<T extends BaseModel> {
	//
	private _model: T;
	//
	constructor() {
	}
	public bind(s: T) {
		this._model = s;
	}
	protected get parent():T {
      return (this._model !== undefined) ? this._model : null;
  }
	protected get info(): UserInfo {
		return ((this._model !== undefined) && (this !== null)) ? this._model.userInfo : null;
	}
	public get is_connected(): boolean {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.is_connected : false;
	}
	public get is_notconnected(): boolean {
		return (!this.is_connected);
	}
	public get fullname(): string {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.fullname : null;
	}
	public get has_url(): boolean {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.has_url : false;
	}
	public get url(): string {
		return ((this.info !== undefined) && (this.info !== null)) ? this.info.url : null;
	}
	public logout(): void {
		if ((this.info !== undefined) && (this.info !== null)) {
			this.info.logout();
			this.info.navigate_to('home');
		}
	}
	//
	public get is_busy():boolean {
		return (this.parent !== null) ? this.parent.is_busy : false;
	}
	public get is_not_busy():boolean {
		return (this.parent !== null) ? this.parent.is_not_busy : false;
	}
	//
	public get departements(): IDepartement[] {
        return (this.parent !== null) ? this.parent.departements : [];
    }
    public get departement(): IDepartement {
        return (this.parent !== null) ? this.parent.departement : null;
    }
    public set departement(s: IDepartement) {
        if (this.parent !== null) {
            this.parent.departement = s;
        }
    }
	//
	public get annees(): IAnnee[] {
        return (this.parent !== null) ? this.parent.annees : [];
    }
    public get annee(): IAnnee {
        return (this.parent !== null) ? this.parent.annee : null;
    }
    public set annee(s: IAnnee) {
        if (this.parent !== null) {
            this.parent.annee = s;
        }
    }
	//
	public get semestres(): ISemestre[] {
        return (this.parent !== null) ? this.parent.semestres : [];
    }
    public get semestre(): ISemestre {
        return (this.parent !== null) ? this.parent.semestre : null;
    }
    public set semestre(s: ISemestre) {
        if (this.parent !== null) {
            this.parent.semestre = s;
        }
    }
	//
	public get unites(): IUnite[] {
        return (this.parent !== null) ? this.parent.unites : [];
    }
    public get unite(): IUnite {
        return (this.parent !== null) ? this.parent.unite : null;
    }
    public set unite(s: IUnite) {
        if (this.parent !== null) {
            this.parent.unite = s;
        }
    }
	//
	public get matieres(): IMatiere[] {
        return (this.parent !== null) ? this.parent.matieres : [];
    }
    public get matiere(): IMatiere {
        return (this.parent !== null) ? this.parent.matiere : null;
    }
    public set matiere(s: IMatiere) {
        if (this.parent !== null) {
            this.parent.matiere = s;
        }
    }
	//
	public get groupes(): IGroupe[] {
        return (this.parent !== null) ? this.parent.groupes : [];
    }
    public get groupe(): IGroupe {
        return (this.parent !== null) ? this.parent.groupe : null;
    }
    public set groupe(s: IGroupe) {
        if (this.parent !== null) {
            this.parent.groupe = s;
        }
    }
}// class BaseBar
