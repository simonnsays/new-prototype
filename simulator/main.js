import UI from "./scripts/ui.js"
import Shop from "./scripts/shop.js"
import Inventory from "./scripts/inventory.js"
import components from "./scripts/data.js"
import DomElements from "./scripts/domElements.js"
import PCSet from "./scripts/pcSet.js"
import Assistant from "./assistant/assistant.js"

// MAIN GAME LOOP
class Game {
    constructor() {
        this.domElements = new DomElements()
        this.ui = new UI(this.domElements)
        this.shop = new Shop(this.domElements, this.ui)
        this.inventory = new Inventory(this.domElements, this.ui)
        this.assistant = new Assistant(this.domElements)


        // COMPONENTS SHELF
        this.pcToBuild = new PCSet()
        this.componentsShelf = []
    }

    // HANDLE MOUSE DOWN
    handleMouseDown(e) {
        const mouse = this.ui.getMousePosition(e) 
        this.selectedComponent = this.ui.getPiece(mouse, this.componentsShelf) 
    
        if(this.selectedComponent) {
            const box = this.selectedComponent.size.box
            // SET ORIGIN 
            box.origin = {
                x: box.x,
                y: box.y
            }
            // SET IMAGE TO MOUSE OFFSET
            box.offset = {
                x: mouse.x - box.x,
                y: mouse.y - box.y
            }
        }
        
        // CHECK FOR AVAILABLE SLOTS
        if (this.selectedComponent && Object.keys(this.pcToBuild.item).length !== 0) {
            this.pcToBuild.getSlots(this.pcToBuild.item, this.selectedComponent)
            this.pcToBuild.availableSlots.forEach(slot => {
                if(slot.occupied && Object.keys(slot.occupied).length === 0) {
                    slot.occupied = {}
                }
                this.ui.drawSlot(slot)
            })
        }

    }

    // HANDLE MOUSE MOVE
    handleMouseMove(e) {
        const mouse = this.ui.getMousePosition(e)
        if(this.selectedComponent && Object.keys(this.selectedComponent).length !== 0) {
            const box = this.selectedComponent.size.box
            box.x = mouse.x - box.offset.x
            box.y = mouse.y - box.offset.y
        }
    }

    // HANDLE MOUSE UP
    handleMouseUp() {
        if(this.selectedComponent && Object.keys(this.selectedComponent).length !== 0) {

            // CHECK IF SELECTED COMPONENT IS NEAR THE SLOT, THEN ATTACH
            if(this.pcToBuild.availableSlots) {
                this.pcToBuild.availableSlots.forEach(slot => {
                    if (this.ui.partsAreClose(this.selectedComponent, slot)) {
                        // DON'T ATTACH IF SLOT ALREADY OCCUPIED
                        if(slot.occupied && Object.keys(slot.occupied).length !== 0 ) {
                            return
                        }

                        // PLACE SELECTED COMPONENT IN SLOT CASE
                        slot.occupied = JSON.parse(JSON.stringify(this.selectedComponent))

                        for(let key in this.selectedComponent.states) {
                            slot.occupied.states[key].image = new Image()
                            slot.occupied.states[key].image.src = this.selectedComponent.states[key].image.src
                        }

                        // CHANGE THE ITEM BOUNDING BOX
                        const itemBox = slot.occupied.size.box
                        itemBox.x = slot.box.x
                        itemBox.y = slot.box.y
                        itemBox.width = slot.box.width
                        itemBox.height = slot.box.height
                        
                        // IDENTIFY AS ATTACHED
                        slot.occupied.isAttached = true

                        // REMOVE ITEM IN COMPONENT SHELF FOR LOGIC
                        this.componentsShelf.splice(this.selectedComponent.i, 1) 
                    }
                })
            }

            // BACK TO SHELF IF NOT NEAR
            const box = this.selectedComponent.size.box
            box.x = box.origin.x
            box.y = box.origin.y

            this.pcToBuild.availableSlots.length = 0
            this.selectedComponent = {}
        }
        
    }

    shopInit() {
        this.shop.fillShop(components)

        // CREATE ELEMENT PER ITEM IN THE SHOP
        this.shop.items.forEach(item => {
            const element = this.ui.makeItemElement(item)
            this.shop.itemsArea.appendChild(element)

            this.shopItemBuyOnclick(element, item)
            
        })

        // BUTTON HANDLING
        this.shop.shopBtns.forEach(button => {
            button.addEventListener('click', () => {
                this.shop.handleModalButtons(button)
            })
        })

        // MODAL HANDLING
        this.shop.modal.addEventListener('click', (e) => {
            let shopArea = this.shop.modal
            let isOutOfModal = this.ui.listenOutOfModal(shopArea, e)

            // CLEAR FILTERS
            if(isOutOfModal) {
                this.shop.resetFilter()
                this.updateShop(this.shop.sortedItems)
                shopArea.close()
            }
        })

        // FILTER BY CATEGORY
        this.shop.categories.forEach(category  => {
            category.addEventListener('click', () => {
                this.updateShop(this.shop.sortedItems)
            })
        })
        // FILTER BY NAME 
        this.shop.searchBar.element.addEventListener('input', () => {
            this.updateShop(this.shop.sortedItems)
        })
    }

    updateShop(items) {
        const shopItems = items
        const shopArea = this.shop.getItemsArea()

        while(shopArea.firstChild) {
            shopArea.removeChild(shopArea.firstChild)
        }

        if(shopItems.length == 0) {
            return
        }
        shopItems.forEach(item => {
            const element = this.ui.makeItemElement(item)
            shopArea.appendChild(element)

            this.shopItemBuyOnclick(element, item)
        })
    }

    shopItemBuyOnclick(element, item) {
        // UPDATE INFO MODAL TO SHOW ITEM INFO/SPECS
        element.addEventListener('click', () => {
            //QUICK BUY FEATURE
            const quickBuy = this.domElements.getQuickBuyBox()
            if(quickBuy.checked) {
                this.shop.buyItem(item, this.inventory)
                return
            }

            // ITEM INFORMATION MODAL
            const infoContainer = this.domElements.getInfoModal()
            const itemInfo = this.ui.makeInfoDialog(item)
            const buyButton = this.ui.makeButton('BUY')
            itemInfo.appendChild(buyButton)

            buyButton.addEventListener ('click', () => {
                this.shop.buyItem(item, this.inventory)
                infoContainer.close()   
            
            })

            this.ui.updateInfoDialog(itemInfo, infoContainer)
            infoContainer.showModal()
            this.ui.handleOutofModal(infoContainer)
        })
    }

    inventoryInit() {
        // BUTTON HANDLING
        this.inventory.invBtns.forEach(button => {
            button.addEventListener('click', () => {
                this.inventory.handleModalButtons(button)
                this.updateInv(this.inventory.items)
            })
        })

        // MODAL HANDLING
        this.inventory.modal.addEventListener('click', (e) => {
            let invArea = this.inventory.modal
            let isOutOfModal = this.ui.listenOutOfModal(invArea, e)

            // CLEAR FILTERS
            if(isOutOfModal) {
                this.inventory.resetFilter()
                this.updateInv(this.inventory.items)
                invArea.close()
            }
        })

        // FILTER BY CATEGORY
        this.inventory.categories.forEach(category => {
            category.addEventListener('click', () => {
                this.updateInv(this.inventory.sortedItems)
            })
        })
        // FILTER BY NAME
        this.inventory.searchBar.element.addEventListener('input', () => {
            this.updateInv(this.inventory.sortedItems)
        })
    }

    updateInv(items) {
        const invItems = items
        const invArea = this.inventory.getItemsArea()

        // REFRESH DIVS
        while(invArea.firstChild) {
            invArea.removeChild(invArea.firstChild)
        }

        invItems.forEach(item => {
            const element = this.ui.makeItemElement(item)
            invArea.appendChild(element)

            // COMPONENT SELECT
            element.addEventListener('click', () => {
                const selectedItem = item
                // CLONE ITEM FOR DISPLAY MANIPULATION
                const newItem = JSON.parse(JSON.stringify(selectedItem))
                for(let key in item.states) {
                    newItem.states[key].image = new Image()
                    newItem.states[key].image.src = item.states[key].image.src
                }

                // IF QUICK PLACE IS CHECKED
                const quickPlace = this.domElements.getQuickPlace()
                if(quickPlace.checked) {
                    // skip information modal display
                    this.inventory.deleteItem(selectedItem)
                    this.displayComponent(newItem) // main function onclick
                    this.inventory.sortItems()
                    this.updateInv(this.inventory.sortedItems)

                    return
                }

                // DISPLAY ITEM INFORMATION MODAL
                const infoContainer = this.domElements.getInfoModal()
                const itemInfo = this.ui.makeInfoDialog(selectedItem)
                const placeButton = this.ui.makeButton('PLACE')
                itemInfo.appendChild(placeButton)

                // UPDATE DISPLAY UPON PLACE BUTTON CLICK
                placeButton.addEventListener('click', () => {
                    this.inventory.deleteItem(selectedItem)
                    this.displayComponent(newItem) // main function onclick
                    this.inventory.sortItems()
                    this.updateInv(this.inventory.sortedItems)
                    infoContainer.close()
                })

                this.ui.updateInfoDialog(itemInfo, infoContainer)
                infoContainer.showModal()
                this.ui.handleOutofModal(infoContainer)
            })
        })
    }

    displayComponent(component) {
        // SEPARATE PC CASE FROM OTHER COMPONENTS
        if(component.type == 'case') {
            // create box for element manipulation
            component.size.box = {
                x: this.ui.pcCaseArea.width / 2 - component.size.width / 2,
                y: this.ui.pcCaseArea.height / 2 - component.size.height / 2,
                width: component.size.width,
                height: component.size.height
            }
            // create slots
            this.ui.createSlotBox(component)

            // if case area is already occupied
            if(Object.keys(this.pcToBuild.item).length > 0) {
                // replace already diplayed case
                this.inventory.push(this.pcToBuild.item)
                this.pcToBuild.item = component
                return
            }

            // if case area isn't full
            this.pcToBuild.item = component
        } else {
            // if shelf is full
            if(this.componentsShelf.length >= this.ui.componentsArea.length) {
                // put last item back to inventory
                this.inventory.items.push(this.componentsShelf.pop())
                // display new item
                this.componentsShelf.unshift(component) 
            } else {
                // if shelf is not full
                this.componentsShelf.unshift(component)
            }
        }

        this.componentsShelf.forEach((item, index) => {
            const area = this.ui.componentsArea[index]
            item.size.box = {
                x: (area.x + area.width /2) - 95,
                y: (area.y + area.height /2) - 95,
                width: 190,
                height: 190
            }
            // CREATE SLOTS
            this.ui.createSlotBox(item)
        })
    }
   

    start() {
        // INITIALIZE GAME
        this.shopInit() 
        this.inventoryInit()
        this.ui.animate(this.pcToBuild, this.componentsShelf)
        this.assistant.asstInit()


        // MOUSE HANDLING
        this.selectedComponent = {}
        this.ui.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e)) 
        this.ui.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e)) 
        this.ui.canvas.addEventListener('mouseup', () => this.handleMouseUp()) 

        
    }
}

const pcSim = new Game()
pcSim.start()