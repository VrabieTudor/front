import Config from '../../config';

class FlightCtrl {
    constructor(Search, Place, City, $timeout, $state, moment, $scope, $stateParams) {
        this.Search = Search;
        this.City = City;
        this.Place = Place;
        this.pageLoaded = false;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$scope.duration = 200;
        this.$scope.price = 5000;
        this.$state = $state;

        this.popover = (lat, lng, keyword = "coffee") => {
            const param = {
                lat,
                lng,
                keyword,
            };
            this.Place.list(param).$promise.then(res => {
                this.places = res.data;
            });
        };

        this.model = {
            sortBy: 'asc'
        };

        this.shut = {};
        const a = Object.keys(this.$stateParams).splice(1);
        a.map(item => {
           this.shut[item] = this.$stateParams[item];
        });

        // this.model.fromDate = this.$stateParams.fromDate;
        // this.model.to = this.$stateParams.to;
        // this.model.toDate = this.$stateParams["toDate"];
        // this.model.from = this.$stateParams.from;
        // this.model.typeFlight = this.$stateParams.typeFlight;
        // this.model.adults = this.$stateParams.adults;
        // this.model.children = this.$stateParams.children;

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
            console.log(this.response, this.model);
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
}

/* @ngInject */
export default FlightCtrl;