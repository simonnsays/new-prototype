const container = document.querySelector('.assistant-container')
const image = container.querySelector('.assistant-image-container')
const infoContainer = document.querySelector('.assistant-info-container')

window.addEventListener('mousemove', (e) => {
    if(isInArea(container, e)) {
        
        container.classList.add('extended')
        container.addEventListener('transitionend', () => {
        })

    } else {
        console.log('false')
        container.classList.remove('extended')
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
