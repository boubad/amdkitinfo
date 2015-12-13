// app.ts
///
import {IInfoRouter} from 'infodata';	
import {Router, RouterConfiguration} from 'aurelia-router';
//
import {InfoUserInfo} from './common/infouserinfo';
import {BaseView} from '../data/baseview';
import {ETUDDETAIL_ROUTE, GRPEVTDETAIL_ROUTE, ETUDEVTDETAIL_ROUTE,
ETUDNOTES_ROUTE} from '../data/infoconstants';
//
class AureliaInfoRouter implements IInfoRouter {
	private router: Router = null;
	constructor(rt: Router) {
		this.router = rt;
	}
	public navigate_to(xroute: string, opts?: any): any {
		if ((this.router !== undefined) && (this.router !== null)) {
			if ((xroute !== undefined) && (xroute !== null)) {
				let args: any = ((opts !== undefined) && (opts !== null)) ? opts : {};
				this.router.navigateToRoute(xroute, opts);
			}
		}
	}// navigate_to
}// class AureliaInfoRouter
//
export class App  extends BaseView {
    public router: Router;
	//
	static inject() { return [InfoUserInfo]; }
    //
    constructor(user: InfoUserInfo) {
		super(user);
		this.router = null;
    }
    //
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: './common/home', nav: true, title: 'Accueil' },
			{ route: 'consult', name: 'consult', moduleId: './consult/consult-router', nav: true, title: 'Consultation' },
			{ route: 'profil', name: 'profil', moduleId: './common/profil', nav: true, title: 'Profil' },
			{ route: 'synchro', name: 'synchro', moduleId: './common/synchro-view', nav: true, title: 'Synchro' },
			{ route: 'admin', name: 'admin', moduleId: './admin/admin-router', nav: true, title: 'Admin' },
			{ route: 'etud/:id', name: ETUDDETAIL_ROUTE, moduleId: './consult/etudiant-summary', nav: false },
			{ route: 'etudevt/:id', name: ETUDEVTDETAIL_ROUTE, moduleId: './consult/etudevent-detail', nav: false },
			{ route: 'attacheddoc/:id', name: 'attacheddoc', moduleId: './consult/attacheddocs', nav: false },
			{ route: 'grpevt/:id', name: 'grpevt', moduleId: './consult/groupeevent-detail', nav: false }
        ]);
        this.router = router;
		let userinfo = this.userInfo;
		if ((userinfo !== undefined) && (userinfo !== null)) {
			userinfo.router = new AureliaInfoRouter(router);
		}
    }
}
