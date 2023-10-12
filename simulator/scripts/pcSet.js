class PCSet {
    constructor() {
        this.item = {}
        this.availableSlots = []
    }

    getSlots(pcSetItem, selectedComponentItem) {
        const availableSlots = []
        if (pcSetItem.slots) {
            pcSetItem.slots.forEach(slotItem => {
                if(slotItem.name === selectedComponentItem.type) {
                    this.availableSlots.push(slotItem)
                }

                if(slotItem.occupied) {
                    this.getSlots(slotItem.occupied, selectedComponentItem)
                }
            })
        }
    }

}

export default PCSet