// main.ts
///
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
	.plugin('aurelia-animator-css')
	.feature('js/views/resources');
  aurelia.start().then(a => a.setRoot('js/views/app'));
}
