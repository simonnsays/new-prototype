import SearchBar from "./search.js"
import Platform from "./platform.js"

class Inventory extends Platform{
    constructor(domElements) {
        super(domElements)
        this.itemsArea = domElements.getInvItemsContainer() // inv items area

        this.items = []
        this.sortedItems = [...this.items]

        // SEARCH BAR
        this.searchBar = new SearchBar(domElements.getInvSearch())
        this.searchBar.element.addEventListener('input', (e) => this.handleSearchInput(e))

        // CATEGORY SORT
        this.categories = domElements.getInvCategories()
        this.categories.forEach(category => {
            category.active = false
            category.addEventListener('click', () => this.categorySort(category))
        })
    }
}

export default Inventory