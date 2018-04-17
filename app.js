var storageKey = 'FrontendDeveloperAssignment';

var tableStorage = {
    fetch: function () {
        var dataStorage = JSON.parse(localStorage.getItem(storageKey) || '[]');
        return dataStorage;
    },
    save: function (dataStorage) {
        localStorage.setItem(storageKey, JSON.stringify(dataStorage));
    },
    del: function () {
        localStorage.removeItem(storageKey);
    },
}

var vm = new Vue({
    el: '#app',
    data: {
        tableData: tableStorage.fetch(),
        tableHeader: [
            "Task name",
            "Done",
            "Date"
        ],
        inputValOne: '',
        inputValTwo: false,
        inputValThree: '',
        footerLenght: 3,
        selected: 5,
        options: [
            { value: 5 },
            { value: 10 },
            { value: 15 }
        ],
        tableHeaderLenght: 10,
        currentPage: 1,
        startRow: 0,
        endRow: 5,
        dataTableLenght: 0,
        currentSort: "header1",
        currentSortDir: 'asc',

    },
    created: function () {
        this.dataTableLenght = this.tableData.length;
    },
    methods: {
        setStorage: function () {
            localStorage.setItem('tableData', this.tableData);
        },
        addData: function (e) {
            e.preventDefault();
            if (this.inputValOne) {
                this.tableData.push({
                    one: this.inputValOne,
                    two: this.inputValTwo,
                    three: this.inputValThree
                });
            }
            this.inputValOne = '';
            this.inputValTwo = false;
            this.inputValThree = '';
        },
        toggleCheckbox: function (data, index) {
            this.tableData[index].two = !this.tableData[index].two;
            tableStorage.del();
            tableStorage.save(this.tableData);
        },

        numPages: function () {
            return Math.ceil(this.tableData.length / this.selected);
        },

        prevPage: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.startRow = this.startRow - this.selected;
                this.endRow = this.currentPage * this.selected;
            }
        },
        nextPage: function () {
            if (this.currentPage < this.numPages()) {
                this.currentPage++;
                this.startRow = this.startRow + this.selected;
                this.endRow = this.currentPage * this.selected;
                if (this.endRow > this.dataTableLenght) {
                    this.endRow = this.tableData.length;

                }
            }
        },
        selectedUpdate: function () {
            this.startRow = 0;
            this.endRow = this.currentPage * this.selected;
        },
        sort: function (s) {
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        }
    },
    computed: {
        sortedTable: function () {
            return this.tableData.sort((a, b) => {
                var modifier = 1;
                if (this.currentSortDir === 'desc') {
                    modifier = -1;
                }
                if (a.one < b.one) {
                    return -1 * modifier;
                }
                if (a.one > b.one) {
                    return 1 * modifier;
                }
                return 0;
            });
        }
    },
    watch: {
        tableData: {
            handler: function (tableData) {
                tableStorage.save(tableData);
            }
        }
    }
});
