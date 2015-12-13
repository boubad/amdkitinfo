//admin-router.ts
///
import {Router} from 'aurelia-router';
import {BaseView} from '../../data/baseview';
import {InfoUserInfo} from '../common/infouserinfo';
//
export class AdminRouter extends BaseView {
	//
	public static inject() { return [InfoUserInfo]; }
	//
	public heading: string = 'Administration';
	public router: Router;
	//
	constructor(info: InfoUserInfo) {
		super(info);
		this.title = 'Administration';
	}// constructor
	//
	public configureRouter(config, router: Router) {
		config.map([
			{ route: ['', 'home'], moduleId: '../common/home', nav: true, title: 'Accueil' },
			{ route: 'etudaffectations', moduleId: './etudaffectations', nav: true, title: 'Affectations Etudiants' },
			{ route: 'profaffectations', moduleId: './enseignantaffectations', nav: true, title: 'Affectations Enseignants' },
			{ route: 'importetuds', moduleId: './import-etuds', nav: true, title: 'Import Etudiants' },
			{ route: 'semestres', moduleId: './semestres', nav: true, title: 'Semestres' },
			{ route: 'annees', moduleId: './annees', nav: true, title: 'Années' },
			{ route: 'etudiants', moduleId: './etudiants', nav: true, title: 'Etudiants' },
			{ route: 'enseignants', moduleId: './enseignants', nav: true, title: 'Enseignants' },
			{ route: 'matieres', moduleId: './matieres', nav: true, title: 'Matières' },
			{ route: 'unites', moduleId: './unites', nav: true, title: 'Unités' },
			{ route: 'groupes', moduleId: './groupes', nav: true, title: 'Groupes' },
			{ route: 'administrators', moduleId: './administrators', nav: true, title: 'Opérateurs' },
			{ route: 'departements', moduleId: './departements', nav: true, title: 'Départements' }
		]);
		this.router = router;
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		if (this.is_connected) {
			bRet = this.is_admin || this.is_super;
		}
		return bRet;
	}// activate
}
