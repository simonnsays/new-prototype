const modeButton = document.querySelectorAll('.carousel-item__btn')
const modePage = document.querySelector('.mode-select-modal')
const modes = document.querySelectorAll('.mode')
const overlay = document.querySelector('.overlay')

modeButton.forEach(button => {
    button.addEventListener('click', () => {
        if(modePage.style.display !== 'flex') {
            modePage.style.display = 'flex'
            overlay.style.display = 'flex'    
        }  
    })
})

modes.forEach(mode => {
    modePage.addEventListener('click', (e) => {
        if (isOutOfModal(mode, e)) {
            modePage.style.display = 'none'
            overlay.style.display = 'none'
        } 
    })
})


function isOutOfModal(area, point) { 
    const mouse = {x: point.clientX, y: point.clientY}
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
            return true
        }

        return false
}