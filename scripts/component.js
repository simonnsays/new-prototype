class Component {
    constructor ({type, name, states, size, slots, isAttached = 'false'}) {
        this.type = type
        this.name = name
        this.size = size
        this.states = states
        this.slots = slots
        this.isAttached = isAttached

        for (let state in this.states) {
            this.states[state].image = new Image()
            this.states[state].image.src = this.states[state].imageSrc
        }
    }
}

export default Component