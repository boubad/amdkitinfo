// main.ts
///
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
	.feature('js/views/resources');
  aurelia.start().then(a => a.setRoot('js/views/app'));
}
