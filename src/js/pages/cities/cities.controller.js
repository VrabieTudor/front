import Config from '../../config';

class CityCtrl {
    constructor($http) {
        this.pageLoaded = true;
        this.$http = $http;
        //this.apiKey = 'rAUaDVZaWnhz9RQP6dZ20xMWvBIFgW08';
        this.apiKey = 'kSKOaNrWDJQeHsGqf8EkugivKlZ5AAB3';
        this.searchValue = 'Rome';
        this.cities = null;
        this.selectedCity = null;
        this.submitSearch();
    }
    submitSearch() {
        this.pageLoaded = false;
        this.$http({
            method: 'GET',
            url: 'https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text',
            params: {
                'apikey': this.apiKey,
                'city_name': this.searchValue,
                'lang': 'EN',
                'category': 'landmark',
                'image_size': 'large',
                'geonames': false,
                'number_of_results': 20
            }
        }).then((response) => {
            this.pageLoaded = true;
            this.cities = response.data.points_of_interest;
            this.selectedCity = response.data.current_city.name;
            console.log(this.cities);
        }, () => {
            this.cities = null;
            this.message = "No records found";
            this.pageLoaded = true;
        });
    }
}

/* @ngInject */
export default CityCtrl;