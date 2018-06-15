import 'angular-resource';

let resourceModule = angular.module('app.resources', [
   'ngResource'
]);

import Search from './search';
import City from './city';

resourceModule.factory('Search', Search);
resourceModule.factory('City', City);

export default resourceModule;