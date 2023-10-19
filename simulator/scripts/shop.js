import SearchBar from "./search.js"

class Shop {
    constructor(domElements) {
        this.domElements = domElements
        this.area = domElements.getShop()
        this.itemsArea = domElements.getShopItemsContainer()

        // SEARCH BAR
        this.searchBar = new SearchBar(domElements.getShopSearch())

        // FOR COMPONENTS AVAILABLE
        this.items = []
        this.sortedItems = []

        this.categories = domElements.getShopCategories() 
        this.categories.forEach(category => {
                category.active = false
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

    updateCategoryDisplay() {
        this.categories.forEach(inCategory => {
            if (inCategory.active) {
                inCategory.style.backgroundColor = this.domElements.mint
            } else {
                inCategory.style.backgroundColor = ''
            }
        })
    }
}

export default Shop