class UI {
    constructor(domElements) {
        // CANVAS
        this.canvas = domElements.getCanvas()
        this.c = this.canvas.getContext('2d')

        // COLOR PALETTE
        this.teal = getComputedStyle(document.documentElement).getPropertyValue('--teal')
        this.mint = getComputedStyle(document.documentElement).getPropertyValue('--mint')
        this.navy = getComputedStyle(document.documentElement).getPropertyValue('--navy')
        this.blue = getComputedStyle(document.documentElement).getPropertyValue('--blue')
        this.lightLime = getComputedStyle(document.documentElement).getPropertyValue('--light-lime')
        this.freshLemon = getComputedStyle(document.documentElement).getPropertyValue('--fresh-lemon')
        this.pastelYellow = getComputedStyle(document.documentElement).getPropertyValue('--pastel-yellow')

        // AREAS TO PLACE
        this.pcCaseArea = {x: 10, y: 10, width: 650, height: 660}

        // this.componentsArea = [
        //     {x: 670, y: 10, width: 620, height: 210},
        //     {x: 670, y: 230, width: 620, height: 220},
        //     {x: 670, y: 460, width: 620, height: 210}
        // ]

        this.componentsArea = [
            {x: 670, y: 10, width: 300, height: 210},
            {x: 980, y: 10, width: 310, height: 210},

            {x: 670, y: 230, width: 300, height: 220},
            {x: 980, y: 230, width: 310, height: 220},

            {x: 670, y: 460, width: 300, height: 210},
            {x: 980, y: 460, width: 310, height: 210}  
        ]

        // SHOP 
        this.shop = domElements.getShop()
        this.shopBtns = domElements.getShopButtons()

        this.shopBtns.forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtons(button)
            })
        })
        this.handleOutOfModal(this.shop)

        // INVENTORY
        this.inv = domElements.getInv()
        this.invBtns = domElements.getInvButtons()

        this.invBtns.forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtons(button)
            })
        })
        this.handleOutOfModal(this.inv)
        
        // LOGIC VARIABLES
        this.availableSlots
    }

    handleButtons(button) {
        switch(button.id) {
            case 'openShop':
                this.shop.showModal()
                break
            case 'closeShop':
                this.shop.close()
                break
            case 'openInv':
                this.inv.showModal()
                break
            case 'closeInv':
                this.inv.close()
                break
        }
    }

    handleOutOfModal(area) {
        area.addEventListener('click', (e) => {
            const mouse = {x: e.clientX, y: e.clientY}
            const box = ({
                x: Math.round(area.getBoundingClientRect().x),
                y: Math.round(area.getBoundingClientRect().y),
                width: Math.round(area.getBoundingClientRect().width),
                height: Math.round(area.getBoundingClientRect().height),
            })

            if(mouse.x < box.x ||
                mouse.x > box.x + box.width ||
                mouse.y < box.y ||
                mouse.y > box.y + box.height) {
                area.close()
            }
        })
    }

    canvasInit(){
        // Draw Canvas base
        this.c.fillStyle = this.pastelYellow
        this.c.fillRect(0,0,this.canvas.width, this.canvas.height)

        // Draw areas for PC case and Components
        this.c.fillStyle = this.freshLemon

        this.drawRoundedRect(this.pcCaseArea.x, this.pcCaseArea.y, this.pcCaseArea.width, this.pcCaseArea.height, 30)

        this.componentsArea.forEach(area => {
            this.drawRoundedRect(area.x, area.y, area.width, area.height, 20)
        })
    }

    animate(pcSet, componentsShelf) {
        this.c.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.canvasInit()

        // DRAW PC SET
        if(Object.keys(pcSet.item).length !== 0) {
            const PC = pcSet.item
            this.c.drawImage(
                    PC.states.default.image,
                    PC.size.box.x,
                    PC.size.box.y,
                    PC.size.box.width,
                    PC.size.box.height,
            )

            pcSet.item.slots.forEach(slot => {
                if(slot.occupied) {
                    this.drawComponent(slot.occupied)
                }
            })
        }

        // DRAW COMPONENTS ON SHELF
        componentsShelf.forEach((item) => {
            const image = 
            this.c.drawImage(
                item.states.default.image,
                item.size.box.x, 
                item.size.box.y, 
                item.size.box.width,
                item.size.box.height
            )
        })

        requestAnimationFrame(() => this.animate(pcSet, componentsShelf)) 
    }

    drawComponent(component) {
        if(Object.keys(component).length == 0) {
            return
        }

        const image = component.states.attached.image
        const box = component.size.box

        this.c.drawImage(
            image,
            box.x,
            box.y,
            box.width,
            box.height
        )

        component.slots.forEach(slot => {
            if(slot.occupied) {
                this.drawComponent(slot.occupied)
            }
        })
    }
    
    drawSlot(slot) {
        this.c.fillStyle = 'rgba(0, 225, 0, 0.4)'
        this.c.fillRect(
            slot.box.x,
            slot.box.y,
            slot.box.width,
            slot.box.height
        )

        const drawSlotAnimationId = requestAnimationFrame(() => this.drawSlot(slot))
        this.canvas.addEventListener('mouseup', () => {
            cancelAnimationFrame(drawSlotAnimationId)
        })

    }

    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top),
          }
    }

    getPiece(mouse, pieces) {
        for (let i = 0; i < pieces.length; i++) {
            const piece = pieces[i]
            const box = piece.size.box
            if (mouse.x > box.x &&
                mouse.x < box.x + box.width &&
                mouse.y > box.y &&
                mouse.y < box.y + box.height) {
                    piece.i = i // Keep Track of index
                    return piece
            }
        }
    }

    partsAreClose(component, slot) {
        const box = component.size.box
        return this.distance({x: box.x, y: box.y}, {x: slot.box.x, y: slot.box.y}) < slot.box.width / 2
    }

    distance(point1, point2) {
        const a = parseInt(point1.x - point2.x)
        const b = parseInt(point1.y - point2.y)
        const c = Math.sqrt(a*a + b*b)

        return Math.round(c)
    }

    drawRoundedRect(x, y, width, height, borderRadius) {
        this.c.beginPath();
        this.c.moveTo(x + borderRadius, y);
        this.c.lineTo(x + width - borderRadius, y);
        this.c.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
        this.c.lineTo(x + width, y + height - borderRadius);
        this.c.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
        this.c.lineTo(x + borderRadius, y + height);
        this.c.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
        this.c.lineTo(x, y + borderRadius);
        this.c.arcTo(x, y, x + borderRadius, y, borderRadius);
        this.c.closePath();

        this.c.fillStyle = this.mint; // or any color you want
        this.c.fill();
    }

    makeItemElement(item){
        // CREATE THE DIV
        const element = document.createElement('div')
        element.classList = 'content'
        element.id = item.name

        // CREATE IMAGE FOR THE DIV
        const image = new Image()
        image.src = item.states.default.imageSrc
        image.style.width = '100%'
        image.style.height = '100%'
        image.alt = item.name
        element.appendChild(image)

        // CREATE SLIDER DIV FOR TITLE
        const slider = document.createElement('div')
        slider.classList = 'slider'
        slider.textContent = item.name + ' (' + item.type + ')'
        element.appendChild(slider)
        return element  
    }

    makeInfoDialog(item) {
        const info = document.createElement('Div')
        info.classList = 'info-dialog'
        info.innerHTML = item.name +'<br>'+ item.size + '<br>'

        return info
    }

    updateInfoDialog(item, container) {
        while(container.firstChild) {
            container.removeChild(container.firstChild)
        }

        container.appendChild(item)
    }

    makeButton(name) {
        const button = document.createElement('button')
        button.classList = 'button'
        button.textContent = name

        return button
    }

    createSlotBox(item) {
        item.slots.forEach((slot, index) => {
            slot.box = {
                x: item.size.box.x + slot.offset.x,
                y: item.size.box.y + slot.offset.y,
                width: slot.offset.w,
                height: slot.offset.h
            }
        })
    }
}

export default UI