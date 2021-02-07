import create from "zustand"

const store = create(() => ({
    message: "Hello",
}))

export function speak() {
    store.setState({ message: `Hello ${new Date().toLocaleTimeString()}` })
}

export default store