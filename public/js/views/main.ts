// main.ts
///
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
		.globalResources(['js/views/resources/nav-bar', 'js/views/resources/connect-bar', 'js/views/resources/person-bar',
			'js/views/resources/sheader-bar', 'js/views/resources/work-bar', 'js/views/resources/pagination-bar', 'js/views/resources/avatar-bar',
			'js/views/resources/command-bar', 'js/views/resources/elements-bar', 'js/views/resources/siglename-bar',
			'js/views/resources/interval-bar','js/views/resources/depart-bar','js/views/resources/depannee-bar',
			'js/views/resources/depunite-bar','js/views/resources/import-bar']);
  aurelia.start().then(a => a.setRoot('js/views/app'));
}
