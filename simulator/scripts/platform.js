class Platform {
    constructor(domElements, ui) {
        this.domElements = domElements
        this.ui = ui
        this.itemsArea = {}

        // FOR COMPONENTS AVAILABLE
        this.items = []
        this.sortedItems = [...this.items]

        // FOR SORTING
        this.tmpItems = []
        this.searchResults = [...this.items]
        this.sortCategory = {}
    }

    getItems() {
        return this.items
    }

    getItemsArea() {
        return this.itemsArea
    }

    sortItems() {
        // CLEAR SORTED ITEMS ARRAY
        this.sortedItems = []
        // CHECK THE SELECTED CATEGORY
        this.sortCategory = Array.from(this.categories).find(category => category.active) || {}

        // IF CATEGORY IS SELECTED
        if(Object.keys(this.sortCategory).length !== 0) {
            // if searchbar is used
            if (this.searchBar.element.value.length > 0) {
                this.sortedItems = this.searchResults.filter(result => result.type === this.sortCategory.dataset.id)
            } else {
                // filter by category 
                this.sortedItems = this.items.filter(item => item.type === this.sortCategory.dataset.id)
            }
        // IF CATEGORY IS NOT SELECTED 
        } else {
            // if searchbar is used
            if(this.searchBar.element.value.length > 0) {
                this.sortedItems = this.searchResults
            } else {
                this.sortedItems = [...this.items]
            }
        }
    }

    categorySort(category) {
        // CHECK IF ALREADY PRESSED/ACTIVE
        if(category.active) {
            category.active = false
            this.updateCategoryDisplay()
            this.sortedItems = [...this.items]
            this.sortItems()
            return
        }

        // ONLY ONE ACTIVE CATEGORY PER TIME
        this.categories.forEach(category2 => {
            category2.active = false
        })

        category.active = true
        this.updateCategoryDisplay()
        this.sortItems()
    }

    updateCategoryDisplay() {
        this.categories.forEach(inCategory => {
            inCategory.active ? inCategory.style.backgroundColor = this.domElements.mint :inCategory.style.backgroundColor = ''
        })
    }

    handleSearchInput(e) {
        const pattern = e.target.value

        this.searchResults = []
        this.searchResults = this.items.filter(item => this.searchBar.kmpSearch(item.name.toLowerCase(), pattern.toLowerCase()).length > 0)

        this.sortItems()
    }

    resetFilter() {
        this.categories.forEach(category => {
            category.active = false
            this.updateCategoryDisplay()
        })

        this.searchBar.element.value = ''
        this.searchResults = []
        this.sortItems()
    }
}

export default Platform