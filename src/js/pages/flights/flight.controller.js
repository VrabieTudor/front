import Config from '../../config';

class FlightCtrl {
    constructor(Search, Place, City, $timeout, $state, moment, $scope, $stateParams, $uibModal) {
        this.Search = Search;
        this.City = City;
        this.Place = Place;
        this.pageLoaded = false;
        this.modalLoaded = true;
        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.$stateParams = $stateParams;
        this.$scope.duration = 200;
        this.$scope.price = 5000;
        this.$state = $state;
        this.$timeout = $timeout;

        this.popover = (lat, lng, keyword = "hotel") => {
            const param = {
                lat,
                lng,
                keyword,
            };
            this.Place.list(param).$promise.then(res => {
                this.places = res.data;
                this.modalLoaded = true;
            });
        };
        this.openPlacesModal = (lat, lng) => {
            this.lat = lat;
            this.lng = lng;
            this.modalLoaded = false;
            this.popover(lat, lng);
        };
        this.model = {
            sortBy: 'asc'
        };

        this.shut = {};
        const a = Object.keys(this.$stateParams).splice(1);
        a.map(item => {
           this.shut[item] = this.$stateParams[item];
        });

        this.$scope.flightOptions = {
            onChange: (sliderId, modelValue, highValue, pointerType) => {
                this.model.flightDuration = modelValue;
            }
        };
        this.$scope.priceOptions = {
            onChange: (sliderId, modelValue, highValue, pointerType) => {
                this.model.maxPrice = modelValue;
            }
        };
        this.submitSearch(this.shut);
    }
    submitSearch(model) {
        this.Search.search(model).$promise.then(res => {
            this.response = res.data;
            console.log(this.response);
            if(this.response.flights.length === 0) {
                this.$state.go('404');
            }
            this.height = this.response.maxRoutes * 262;
            this.pageLoaded = true;
        });
    }

    buy(link) {
        window.open(
            link,
            '_blank'
        );
    }
    searchModal() {
        this.modalLoaded = false;
        this.popover(this.lat, this.lng, this.searchModalValue);
    }
}

/* @ngInject */
export default FlightCtrl;