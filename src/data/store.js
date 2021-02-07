import create from "zustand"

const store = create(() => ({
    wireframe: false,
    waves: [
        {
            id: 0,
            direction: [1, 1],
            steepness: .25,
            wavelength: 60
        },
        {
            id: 1,
            direction: [1, 0],
            steepness: .25,
            wavelength: 30
        },
        {
            id: 2,
            direction: [0, 0],
            steepness: 0,
            wavelength: 0
        },
        {
            id: 3,
            direction: [0, 0],
            steepness: 0,
            wavelength: 0
        },
        {
            id: 4,
            direction: [0, 0],
            steepness: 0,
            wavelength: 0
        }
    ]
}))

export function update({ id, ...props }) {
    store.setState({
        waves: [
            ...store.getState().waves.filter(i => i.id !== id),
            {
                ...store.getState().waves.find(i => i.id === id),
                ...props
            }
        ]
    })
}

export function setWireframe(value) {
    store.setState({
        wireframe: value
    })
}

export default store