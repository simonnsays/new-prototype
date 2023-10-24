import SearchBar from "./search.js"
import Platform from "./platform.js"

class Shop extends Platform{
    constructor(domElements, ui) {
        super(domElements, ui)
        this.itemsArea = domElements.getShopItemsContainer() // shop items area

        // MODAL AREA
        this.modal =  domElements.getShop() // shop modal area
        this.modal.isOpen = false
        this.shopBtns = domElements.getShopButtons()

        this.shopBtns.forEach(button => {
            button.addEventListener('click', () => {
                this.handleModalButtons(button)
            })
        })
        // this.ui.handleOutOfModal(this.modal)

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

    fillShop(components) {
        components.forEach(component => {
            this.items.push(component)  
        })
    }

    buyItem(item, container) {
        container.items.push(item)
    }

    handleModalButtons(button) {
        switch(button.id) {
            case 'openShop':
                this.modal.isOpen = true
                this.modal.showModal()
                break
            case 'closeShop':
                this.modal.isOpen = false
                this.modal.close()
        }
    }

    handleSearchInput(e) {
        // const pattern = e.target.value

        // if(pattern.length == 0) {
        //     this.searchResults = [...this.items]
        //     this.sortItems()
        //     return
        // }

        super.handleSearchInput(e)
    }
}

export default Shop