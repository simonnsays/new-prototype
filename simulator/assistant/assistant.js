class Assistant {
    constructor(domElements) {
        this.container = domElements.getAsstContainer()
        this.imageContainer = domElements.getAsstImgContianer()
        this.pulse = domElements.getAsstPulse()
        this.image = domElements.getAsstImage()
        this.infoContainer = domElements.getAsstInfo()
        this.modal = domElements.getAsstModal()

        this.notifCount = 1
    }

    isInArea (area, mouse) {
        let point = {x: mouse.clientX, y: mouse.clientY}
        let rect = area.getBoundingClientRect()
    
        if(mouse.x > rect.x &&
            mouse.x < rect.x + rect.width &&
            mouse.y > rect.y &&
            mouse.y < rect.y + rect.height) {
                return true
            }
        return false
    }

    handlePulseEvent() {
        if (this.notifCount > 0) {
            this.pulse.classList.add('pulse')
            this.image.classList.add('img-rltv')
        } else {
            this.pulse.classList.remove('pulse')
            this.image.classList.remove('img-rltv')
        }
    }

    handleMouseHover(e) {
        if(this.isInArea(this.container, e)) { 
            this.notifCount = 0
            this.container.classList.add('extended')
        } else {
            this.notifCount = 1
            this.container.classList.remove('extended')
        }
    }

    asstInit() {
        window.addEventListener('mousemove', (e) => {
            this.handlePulseEvent()

            this.handleMouseHover(e)
        })

        this.container.addEventListener('click', () => {
            this.modal.showModal()
        })

        window.addEventListener('click', (e) => {
            if(!this.isInArea(this.container, e)) {
                this.modal.close()
            }
        })
        
    }
}



// const container = document.querySelector('.assistant-container')
// const imageContainer = document.querySelector('.assistant-image-container')
// const pulse = document.querySelector('#pulse')
// const image = document.querySelector('.assistant-image')
// const infoContainer = document.querySelector('.assistant-info-container')
// const asstModal = document.querySelector('.assistant-modal')

// let notifCount = 1

// window.addEventListener('mousemove', (e) => {
//     if (notifCount > 0) {
//         pulse.classList.add('pulse')
//         image.classList.add('img-rltv')
//     } else {
//         pulse.classList.remove('pulse')
//         image.classList.remove('img-rltv')
//     }

//     if(isInArea(container, e)) {
//         notifCount = 0
//         container.classList.add('extended')
//         container.addEventListener('transitionend', () => {
//         })
//     } else {
//         notifCount = 1
//         container.classList.remove('extended')
//     }
// })

// container.addEventListener('click', () => {
//     asstModal.showModal()
// })

// window.addEventListener('click', (e) => {
//     if(!isInArea(container, e)) {
//         asstModal.close()
//     }
// })

// function isInArea(area, mouse) {
//     point = {x: mouse.clientX, y: mouse.clientY}
//     rect = area.getBoundingClientRect()

//     if(mouse.x > rect.x &&
//         mouse.x < rect.x + rect.width &&
//         mouse.y > rect.y &&
//         mouse.y < rect.y + rect.height) {
//             return true
//         }
//     return false
// }

export default Assistant