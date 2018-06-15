import Config from '../../config';

class FlightCtrl {
    constructor(Search, City, $timeout, $state, moment, $scope) {
        this.Search = Search;
        this.City = City;
        this.pageLoaded = false;
        this.$scope = $scope;
        this.$scope.duration = 200;
        this.$scope.price = 5000;
        this.$state = $state;

        console.log(this.$state.params);

        this.model = {
            sortBy: 'asc'
        };
        this.model.fromDate = this.$state.params.fromDate;
        this.model.to = this.$state.params.to;
        this.model.toDate = this.$state.params["toDate"];
        this.model.from = this.$state.params.from;
        this.model.typeFlight = this.$state.params.typeFlight;
        this.model.adults = this.$state.params.adults;
        this.model.children = this.$state.params.children;

        console.log(this.model, 2);

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
        this.submitSearch(this.model);
    }
    submitSearch(model) {
        this.Search.search(model).$promise.then(res => {
            this.model = res.data; 
            if(this.model.flights.length === 0) {
                this.$state.go('404');
            }
            this.height = this.model.maxRoutes * 262;
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