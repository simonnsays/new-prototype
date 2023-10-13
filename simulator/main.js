import UI from "./scripts/ui.js"
import Shop from "./scripts/shop.js"
import Inventory from "./scripts/inventory.js"
import components from "./scripts/data.js"
import DomElements from "./scripts/domElements.js"
import PCSet from "./scripts/pcSet.js"

// MAIN GAME LOOP
class Game {
    constructor() {
        this.domElements = new DomElements()
        this.inventory = new Inventory(this.domElements)
        this.shop = new Shop(this.domElements)
        this.ui = new UI(this.domElements)

        // COMPONENTS SHELF
        this.pcToBuild = new PCSet()
        this.componentsShelf = []

        // MOUSE HANDLING
        this.selectedComponent = {}
        this.ui.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e)) 
        this.ui.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e)) 
        this.ui.canvas.addEventListener('mouseup', () => this.handleMouseUp())
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
                slot.occupied = {}
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

    handleMouseUp() {
        if(this.selectedComponent && Object.keys(this.selectedComponent).length !== 0) {                 /////////// FINISH ATTACHMENT OF COMPONENTS//////////

            // CHECK IF SELECTED COMPONENT IS NEAR THE SLOT, THEN ATTACH
            if(this.pcToBuild.availableSlots) {
                this.pcToBuild.availableSlots.forEach(slot => {
                    if (this.ui.partsAreClose(this.selectedComponent, slot)) {
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

            // UPDATE INFO MODAL TO SHOW ITEM INFO/SPECS
            element.addEventListener('click', () => {
                //QUICK BUY FEATURE
                const quickBuy = this.domElements.getQuickBuyBox()
                if(quickBuy.checked) {
                    this.shop.buyItem(item, this.inventory)
                    this.updateInv()
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
                    this.updateInv()    
                
                })

                this.ui.updateInfoDialog(itemInfo, infoContainer)
                infoContainer.showModal()
                this.ui.handleOutOfModal(infoContainer)
            })
        })
    }

    updateInv() {
        const invItems = this.inventory.getItems()
        const invArea = this.inventory.getInvArea()
        
        while(invArea.firstChild) {
            invArea.removeChild(invArea.firstChild)
        }

        invItems.forEach((item, index) => {
            const element = this.ui.makeItemElement(item)
            invArea.appendChild(element)

            // UPDATE INFO MODAL TO SHOW ITEM INFO/SPECS
            element.addEventListener('click', () => {
                // ABSTRACTED FUNCTION
                const invToCanvas = () => {
                    // CLONE ITEM AND RECREATE IMAGE ELEMENT SO THAT IT WONT REFERENCE THE SAME ITEM IN BOX CREATION
                    const newItem = JSON.parse(JSON.stringify(item))

                    for(let key in item.states) {
                        newItem.states[key].image = new Image()
                        newItem.states[key].image.src = item.states[key].image.src
                    }

                    // SEPARATE THE CASE AND COMPONENTS
                    if(newItem.type == 'pcCase') {
                        this.pcToBuild.item = newItem
                    } else {
                        this.componentsShelf.unshift(newItem)
                    }

                    // CREATE BOX FOR COMPONENTS FOR INTERACTIONS
                    if (Object.keys(this.pcToBuild.item).length > 0) {
                        const pcItem = this.pcToBuild.item
                        pcItem.size.box = {
                            x: this.ui.pcCaseArea.width/ 2 - pcItem.size.width/2,
                            y: this.ui.pcCaseArea.height/2 - pcItem.size.height/2,
                            width: pcItem.size.width,
                            height: pcItem.size.height
                        }
                        // CREATE SLOT
                        this.ui.createSlotBox(pcItem)
                    }
                   

                    this.componentsShelf.forEach((item, index) => {
                        const area = this.ui.componentsArea[index]

                        item.size.box = {
                            x: (area.x + area.width/2) - 95,
                            y: (area.y + area.height/2) - 95,
                            width: 190,
                            height: 190
                        }
                        // CREATE SLOT
                        this.ui.createSlotBox(item)
                    })

                    this.updateInv()
                }

                //QUICK PLACE FEATURE
                const quickPlace = this.domElements.getQuickPlace()
                if(quickPlace.checked) {
                    invItems.splice(index, 1)
                    invToCanvas()
                    return
                } 

                // ITEM INFORMATION MODAL
                const infoContainer = this.domElements.getInfoModal()
                const itemInfo = this.ui.makeInfoDialog(item)
                const placeButton = this.ui.makeButton('PLACE')
                itemInfo.appendChild(placeButton)

                // UPDATE CANVAS UPON PLACE BUTTON CLICK & QUICK PLACE
                placeButton.addEventListener ('click', () => {
                    invItems.splice(index, 1)
                    invToCanvas()
                    infoContainer.close()
                
                })

                this.ui.updateInfoDialog(itemInfo, infoContainer)
                infoContainer.showModal()
                this.ui.handleOutOfModal(infoContainer)
            })

        })
    }

    start() {
        this.shopInit() 

        this.ui.animate(this.pcToBuild, this.componentsShelf)
    }
}

const pcSim = new Game()
pcSim.start()