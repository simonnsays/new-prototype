class Inventory {
    constructor(DomElements) {
        this.itemsArea = DomElements.getInvItemsContainer()
        this.items = []
    }

    getItems() {
        return this.items
    }

    getInvArea() {
        return this.itemsArea
    }
}

export default Inventory