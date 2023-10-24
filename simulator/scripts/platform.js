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
        this.sortCategory = {}
        this.categories.forEach(category => {
            if(category.active) {
                this.sortCategory = category
            }
        })

        // IF NO CATEGORY SELECTED
        if(Object.keys(this.sortCategory).length == 0) {
            // IF SEARCH BAR IS BEING USED BUT NO RESULT
            if(this.searchBar.element.value.length > 0 && this.searchResults == 0) {
                this.sortedItems = []
                return
            }
            // IF THERE ARE RESULTS WHILE USING SEARCH BAR
            if(this.searchResults.length > 0) {
                this.sortedItems = this.searchResults
                return
            }

            // IF SEARCH BAR WAS NOT USED
            this.sortedItems = [...this.items]
            return
        }

        // IF A CATEGORY IS SELECTED
        if(Object.keys(this.sortCategory).length > 0) {
            if(this.searchBar.element.value.length > 0 && this.searchResults == 0) {
                this.sortedItems = []
                return
            }

            // CHECK IF SEARCH HAS A RESULT
            if(this.searchResults.length > 0) {
                
                // CHECK FOR MATCH IN SEARCH INPUT AND CATEGORY
                this.searchResults.forEach(result => {
                    if(this.sortCategory.dataset.id == result.type) {
                        this.sortedItems.push(result)
                    }
                })
                return
            }

            // IF SEARCH HAS NO RESULT
            this.items.forEach(item => { 
                if(item.type == this.sortCategory.dataset.id) {
                    this.sortedItems.push(item)
                }
            })
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
        console.log('reached')
        this.sortItems()
    }
}

export default Platform