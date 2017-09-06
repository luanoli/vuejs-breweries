new Vue({

    el: '#app',

    data: {
        cervejarias: [],
        openDetails: [],
        sortColumn: 'name',
        sortInverse: 'asc'
    },

    methods: {
        doSort: function(column) {

            var self = this;

            self.sortColumn = column;
            self.sortInverse = self.sortInverse == 'asc' ? 'desc' : 'asc';

        },
        doOpenDetails: function(id) {

            var self = this,
                index = self.openDetails.indexOf(id);

            if (index > -1) {
                self.openDetails.splice(index, 1);
            } else {
                self.openDetails.push(id);
            }

        },
        openAllDetails: function() {

            var self = this;
            console.log(_);

            if (self.openDetails.length > 0) {
                self.openDetails = [];
            } else {
                // Preenche o array com todos os ids de cervejaria
                self.openDetails = _.map(self.cervejarias, 'id');
            }
        },
        iconOrder: function() {
        	if(this.sortColumn === 'name'){        	
    			return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
        	}else if(this.sortColumn === 'city'){
        		return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
        	}else if(this.sortColumn === 'state'){
        		return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
        	}else if(this.sortColumn === 'country'){
        		return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
        	}else if(this.sortColumn === 'last_mod'){
        		return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
        	}        
        }
    },

    computed: {
        orderCervejarias: function(col, inv) {
            return _.orderBy(this.cervejarias, this.sortColumn, this.sortInverse);
        }
    },

    created: function() {
        var self = this;
        self.$http.get('http://localhost:3000/breweries').then(function(response) {
            self.cervejarias = response.data;
        });
    },

    filters: {
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        json: function(value) {
            return JSON.stringify(value, null, 2);
        }
    }

});