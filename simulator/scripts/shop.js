import SearchBar from "./search.js"
import Platform from "./platform.js"

class Shop extends Platform{
    constructor(domElements) {
        super(domElements)
        this.domElements = domElements
        this.itemsArea = domElements.getShopItemsContainer() // shop items area

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
}

export default Shop