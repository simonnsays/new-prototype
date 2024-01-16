class Assistant {
    constructor(domElements) {
        // DOM ELEMENTS
        this.container = domElements.getAsstContainer()
        this.imageContainer = domElements.getAsstImgContianer()
        this.pulse = domElements.getAsstPulse()
        this.image = domElements.getAsstImage()
        this.infoContainer = domElements.getAsstInfo()
        this.modal = domElements.getAsstModal()

        // TUTORIAL STEP BY STEPS
        this.tasks = [{title: '', description: ''}]

        this.notifCount = 1
    }

    isInArea (area, mouse) {
        let point = {x: mouse.clientX, y: mouse.clientY}
        let rect = area.getBoundingClientRect()
    
        if(point.x > rect.x &&
            point.x < rect.x + rect.width &&
            point.y > rect.y &&
            point.y < rect.y + rect.height) {
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
            this.container.addEventListener('transitionend', () => {
                setTimeout(() => {
                    this.infoContainer.classList.remove('hidden');
                }, 0);
            })
            
        } else {
            this.notifCount = 1
            this.container.classList.remove('extended')
            this.infoContainer.classList.add('hidden')
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
            if(!this.isInArea(this.modal, e) ) {
                this.modal.close()
            }
        })

        
        
    }
}


export default Assistant