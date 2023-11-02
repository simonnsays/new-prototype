const element = document.querySelector('.assistant-container')
const image = element.querySelector('.assistant-image-container')
const info = document.querySelector('.assistant-info-container')

element.addEventListener('click', () => {
    
    
    
    console.log(image)

    if(info.style.display !== 'block') {
        info.style.display = 'block'
        image.classList.add('update')
        element.style.width = '30vw'
    } else {
        info.style.display = 'none'
        image.classList.remove('update')
        element.style.width = '7vw'
    }
    
})