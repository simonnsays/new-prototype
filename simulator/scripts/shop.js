class Shop {
    constructor(domElements) {
        this.domElements = domElements
        this.area = domElements.getShop()
        this.itemsArea = domElements.getShopItemsContainer()
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

    updateCategoryDisplay(category) {
        let categoryType = category.dataset.id

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