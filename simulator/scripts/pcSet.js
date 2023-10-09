class PCSet {
    constructor() {
        this.item = {}
    }

    getSlots(pcSetItem, selectedComponentItem) {
        const availableSlots = []
        if (pcSetItem.slots) {
            pcSetItem.slots.forEach(slotItem => {
                if(slotItem.name === selectedComponentItem.type) {
                    availableSlots.push(slotItem)
                }

                if(slotItem.occupied) {
                    this.getSlots(slotItem.occupied, selectedComponentItem)
                }
            })
        }
        return availableSlots
    }

}

export default PCSet