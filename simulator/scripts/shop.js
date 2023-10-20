import SearchBar from "./search.js"

class Shop {
    constructor(domElements) {
        this.domElements = domElements
        this.area = domElements.getShop() // modal area
        this.itemsArea = domElements.getShopItemsContainer() // shop items area
        // FOR COMPONENTS AVAILABLE
        this.items = []
        this.sortedItems = []

        // FOR SORTING
        this.tmpItems = []
        this.searchResults = this.items

        // SEARCH BAR
        this.searchBar = new SearchBar(domElements.getShopSearch())
        this.searchBar.element.addEventListener('input', (e) => this.handleSearchInput(e))

        // CATEGORY SORT
        this.categories = domElements.getShopCategories() 
        this.categories.forEach(category => {
            category.active = false
            category.addEventListener('click', () => this.categorySort(category))
        })
    }

    getShopArea() {
        return this.itemsArea
    }

    fillShop(components) {
        components.forEach(component => {
            this.items.push(component)  
        })
    }

    buyItem(item, container) {
        container.items.push(item)
    }

    sortItems() {
        // CLEAR SORTED ITEMS ARRAY
        this.sortedItems = []
        
        // CHECK THE SELECTED CATEGORY
        let sortCategory = {}
        this.categories.forEach(category => {
            if(category.active) {
                sortCategory = category
            }
        })

        // IF NO CATEGORY SELECTED
        if(Object.keys(sortCategory).length == 0) {
            // SEARCH RESULTS
            this.sortedItems = this.searchResults
            return
        }

        // IF A CATEGORY IS SELECTED
        if(Object.keys(sortCategory).length > 0) {
            // CHECK IF SEARCH HAS A RESULT
            if(this.searchResults.length > 0) {
                // CHECK FOR MATCH IN SEARCH INPUT AND CATEGORY
                this.searchResults.forEach(result => {
                    if(sortCategory.dataset.id == result.type) {
                        this.sortedItems.push(result)
                    }
                })
            }
        }

    }

    categorySort(category) {
        // CHECK IF ALREADY PRESSED/ACTIVE
        if(category.active) {
            category.active = false
            this.updateCategoryDisplay()
            this.sortedItems = this.items
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

        if(pattern.length == 0) {
            this.searchResults = this.items
            this.sortItems()
            return
        }

        this.searchResults = []
        this.searchResults = this.items.filter(item => this.searchBar.kmpSearch(item.name.toLowerCase(), pattern.toLowerCase()).length > 0)

        this.sortItems()
        console.log(this.searchResults)
    }
}

export default Shop