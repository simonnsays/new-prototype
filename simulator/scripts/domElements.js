class DomElements {
    constructor() {
        // CANVAS DOM ELEMENTS
        this.canvas = document.querySelector('canvas')
        this.canvas.width = 1300
        this.canvas.height = 680

        this.gameContainer = document.querySelector('.game-container')

        this.itemInfoContainer = document.querySelector('.item-info')

        // SHOP DOM ELEMENTS
        this.shop = document.querySelector('#shop')
        this.shopItemsContainer = document.querySelector('.items-shop')
        this.shopButtons = document.querySelectorAll('.shop-btn')
        this.quickBuy = document.querySelector('#quickBuy')
        this.shopCategories = document.querySelectorAll('[data-category="shop"]')
        this.shopSearch = document.querySelector('#shopSearch')
    
        // INVENTORY DOM ELEMENTS
        this.inv = document.querySelector('#inventory')
        this.invItemsContainer = document.querySelector('.items-inv')
        this.invButtons = document.querySelectorAll('.inv-btn')
        this.quickPlace = document.querySelector('#quickPlace')

        // COLOR PALETTE
        this.teal = getComputedStyle(document.documentElement).getPropertyValue('--teal')
        this.mint = getComputedStyle(document.documentElement).getPropertyValue('--mint')
        this.navy = getComputedStyle(document.documentElement).getPropertyValue('--navy')
        this.blue = getComputedStyle(document.documentElement).getPropertyValue('--blue')
        this.lightLime = getComputedStyle(document.documentElement).getPropertyValue('--light-lime')
        this.freshLemon = getComputedStyle(document.documentElement).getPropertyValue('--fresh-lemon')
        this.pastelYellow = getComputedStyle(document.documentElement).getPropertyValue('--pastel-yellow')  
    }

    //  CANVAS METHODS
    getGameContainer() {
        return this.gameContainer
    }

    getCanvas() {
        return this.canvas
    }

    //  SHOP METHODS
    getShop() {
        return this.shop
    }

    getShopItemsContainer() {
        return this.shopItemsContainer
    }

    getShopButtons() {
        return this.shopButtons
    }

    getQuickBuyBox() {
        return this.quickBuy
    }

    getShopCategories() {
        return this.shopCategories
    }

    getShopSearch() {
        return this.shopSearch
    }

    //  INV METHODS
    getInv() {
        return this.inv
    }

    getInvItemsContainer() {
        return this.invItemsContainer
    }

    getInvButtons() {
        return this.invButtons
    }

    getQuickPlace() {
        return this.quickPlace
    }
    
    // OTHERS
    getInfoModal() {
        return this.itemInfoContainer
    }

    
}

export default DomElements  