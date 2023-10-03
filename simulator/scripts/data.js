import Component from "./component.js"

let components = [
    new Component({
        type: 'pcCase',
        name: 'Nanoxia Deep Silence 3',
        size: {
            formFactor: 'mid-tower',
            width: 520,
            height: 456
        },
        states: {
            default: {imageSrc: './assets/PC Case/Nanoxia Deep Silence 3/Side.png'},
            attached: {imageSrc: './assets/PC Case/Nanoxia Deep Silence 3/Side.png'},
            front: {imageSrc: './assets/PC Case/Nanoxia Deep Silence 3/Front.png'}
        },
        slots: [{
            name: 'MoBo', 
            offset: {
                x: 37, 
                y: 49, 
                w: 197, 
                h: 275}
            }, {
            name: 'psu', 
            offset: {
                x: 18, 
                y: 337, 
                w: 129, 
                h: 70}
            }
        ]
    }),

    new Component({
        type: 'MoBo',
        name: 'ASUS P8P67',
        size: {
            formFactor: 'ATX',
            width: 244, 
            height: 305
        },
        states: {
            default: {imageSrc: './assets/MotherBoard/ASUS P8P67/Default.png'},
            attached: {imageSrc: './assets/MotherBoard/ASUS P8P67/Default.png'}
        },
        slots: [{
            name: 'cpu', 
            offset: {
                x:0, 
                y:0, 
                w:0, 
                h:0}
            }
        ]
    }),

    new Component({
        type: 'psu',
        name: 'Thermaltake Smart 500w',
        size: {
            formFactor: 'ATX',
            height: 86,
            width: 140
        },
        states: {
            default: {imageSrc: './assets/Power Supply/Thermaltake Smart 500w/default.png'},
            attached: {imageSrc: './assets/Power Supply/Thermaltake Smart 500w/attached.png'}
        },
        slots: [{
            name: 'none', 
            offset: {
                x:0, 
                y:0, 
                w:0, 
                h:0}
            }
        ]
    })
]

export default components