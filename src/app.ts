import '@src/../styles/bootstrap-theme.css';
import '@src/../styles/app.less';

import * as angular from 'angular';
import 'script-loader!../node_modules/jquery/dist/jquery.min.js';
import 'script-loader!../node_modules/popper.js/dist/umd/popper.min.js';
import 'script-loader!../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'script-loader!../node_modules/angular-sanitize/angular-sanitize.min.js';
import 'script-loader!../node_modules/angular-ui-router/release/angular-ui-router.min.js';
import 'script-loader!../node_modules/angular-cookies/angular-cookies.min.js';
import 'script-loader!../node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js';
import {AppModule} from '@src/Module/AppModule';

new AppModule(angular.module('app', ['ui.bootstrap', 'ui.router', 'ngSanitize', 'ngCookies'])).register();
