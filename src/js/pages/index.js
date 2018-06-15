import './home';
import './header';
import './footer';
import './loading-data';
import './flights';
import './404';
let appPages = angular.module('app.pages', [
    'app.home',
    'app.header',
    'app.footer',
    'app.loading-data',
    'app.flight',
    'app.404'
]);

export default appPages;