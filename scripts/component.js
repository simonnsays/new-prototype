class Component {
    constructor ({type, name, states, size, slotsOffset, isAttached = 'false'}) {
        this.type = type
        this.name = name
        this.size = size
        this.states = states
        this.slotsOffset = slotsOffset
        this.isAttached = isAttached

        for (let state in this.states) {
            this.states[state].image = new Image()
            this.states[state].image.src = this.states[state].imageSrc
        }
    }
}

export default Component