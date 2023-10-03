class Shop {
    constructor(domElements) {
        this.area = domElements.getShop()
        this.itemsArea = domElements.getShopItemsContainer()
        this.items = []
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