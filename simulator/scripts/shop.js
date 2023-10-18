class Shop {
    constructor(domElements) {
        this.domElements = domElements
        this.area = domElements.getShop()
        this.itemsArea = domElements.getShopItemsContainer()
        this.items = []
        this.activeButton = {}

        this.categories = domElements.getShopCategories() 
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
        if(this.activeButton && Object.keys(this.activeButton).length == 0) {
            this.activeButton = category
            this.activeButton.style.backgroundColor = this.domElements.mint

            this.categories.forEach(category => {
                if(category !== this.activeButton) {
                    category.style.backgroundColor = ''
                }
            })
        }
    }
}

export default Shop