const container = document.querySelector('.assistant-container')
const imageContainer = document.querySelector('.assistant-image-container')
const pulse = document.querySelector('#pulse')
const image = document.querySelector('.assistant-image')
const infoContainer = document.querySelector('.assistant-info-container')
const asstModal = document.querySelector('.assistant-modal')

let notifCount = 0

window.addEventListener('mousemove', (e) => {
    if (notifCount > 0) {
        pulse.classList.add('pulse')
        image.classList.add('img-rltv')
    } else {
        pulse.classList.remove('pulse')
        image.classList.remove('img-rltv')
    }

    if(isInArea(container, e)) {
        notifCount = 0
        container.classList.add('extended')
        container.addEventListener('transitionend', () => {
        })
    } else {
        notifCount = 0
        container.classList.remove('extended')
    }
})

container.addEventListener('click', () => {
    asstModal.showModal()
})

window.addEventListener('click', (e) => {
    if(!isInArea(container, e)) {
        asstModal.close()
    }
})

function isInArea(area, mouse) {
    point = {x: mouse.clientX, y: mouse.clientY}
    rect = area.getBoundingClientRect()

    if(mouse.x > rect.x &&
        mouse.x < rect.x + rect.width &&
        mouse.y > rect.y &&
        mouse.y < rect.y + rect.height) {
            return true
        }
    return false
}