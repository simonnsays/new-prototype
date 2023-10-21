class Platform {
    constructor(domElements) {
        this.domElements = domElements
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
        console.log(Object.keys(this.sortCategory).length)

        // IF NO CATEGORY SELECTED
        if(Object.keys(this.sortCategory).length == 0) {
            // SEARCH RESULTS
            if(this.searchResults.length > 0) {
                this.sortedItems = this.searchResults
                return
            }

            this.sortedItems = [...this.items]
            
        }

        // IF A CATEGORY IS SELECTED
        if(Object.keys(this.sortCategory).length > 0) {
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
        console.log(this.searchResults)
    }
}

export default Platform