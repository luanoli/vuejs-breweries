new Vue({

    el: '#app',

    data: {
        columnsToFilter: [],
        filterTerm: '',
        all: [],
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
        doFilter: function() {

            var self = this,
                filtered = _.filter(self.all, function(cervejaria) {

                });

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

            if (self.openDetails.length > 0) {
                self.openDetails = [];
            } else {
                // Preenche o array com todos os ids de cervejaria
                self.openDetails = _.map(self.all, 'id');
            }
        },
        iconOrder: function() {
            if (this.sortColumn === 'name') {
                return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
            } else if (this.sortColumn === 'city') {
                return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
            } else if (this.sortColumn === 'state') {
                return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
            } else if (this.sortColumn === 'country') {
                return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
            } else if (this.sortColumn === 'last_mod') {
                return this.sortInverse === 'asc' ? 'fa-sort-amount-asc' : 'fa-sort-amount-asc';
            }
        }
    },

    computed: {
        cervejarias: function() {

            var self = this;
            
            var list = _.orderBy(self.all, self.sortColumn, self.sortInverse),
                filter = self.filterTerm;

            if (_.isEmpty(filter) || self.columnsToFilter.length === 0) {
                return list;
            }

            return _.filter(list, function(li) {
                // .some quebra o loop na primeira verificaç~ao que retornar true
                return self.columnsToFilter.some(function(column) {
                    return li[column].toLowerCase().indexOf(filter.toLowerCase()) >= 0;
                });
            });
        }
    },

    created: function() {
        
        var self = this;
        
        self.$http.get('http://localhost:3000/breweries').then(function(response) {
            self.all = response.data;
        });

        console.log(self.$refs);

    },

    filters: {
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        json: function(value) {
            return JSON.stringify(value, null, 2);
        },
        dateFormat: function(value) {
            return moment(value).format('DD/MM/YYYY HH:mm:ss');
        }
    }

});

/* Outra forma de criar filtros */
// Vue.filter('dateFormat', function(value){
//     return moment(value).format('DD/MM/YYYY HH:mm:ss');
// });