import Config from '../../config';

class CityCtrl {
    constructor($http, $stateParams) {
        this.pageLoaded = true;
        this.$http = $http;
        this.$stateParams = $stateParams;
        if(this.$stateParams.cityName) {
            this.searchValue = this.$stateParams.cityName;
        } else {
            this.searchValue = 'Rome';
        }
        //this.apiKey = 'rAUaDVZaWnhz9RQP6dZ20xMWvBIFgW08'; expirat
        //this.apiKey = 'kSKOaNrWDJQeHsGqf8EkugivKlZ5AAB3'; expirat
        //this.apiKey = 'Fvpd0beyaBWZBPElB9mCPau0LGRao6Ws'; expirat
        this.apiKey = '2nMwIGAlC2A0X22rWkprzUeAYuR7bKjK';
        //this.apiKey = '27AcAq2KTUQEjg7oeA3MxX2ACZgC6bF';
        //this.apiKey = 'oO824Hjvlkq2cTOmIGmYoa2gYfOGuspC';
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
        }, (res) => {
            this.cities = null;
            if(res.status === 500) {
                this.submitSearch();
            } else {
                this.message = "No records found"; 
            }
            this.pageLoaded = true;
        });
    }
    openModal(city) {
        this.main_image = city.main_image;
        this.link = city.details.wiki_page_link;
        this.title = city.title;
        this.description = city.details.description;
    }
}

/* @ngInject */
export default CityCtrl;