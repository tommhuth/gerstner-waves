import "../assets/styles/app.scss"

import { Workbox } from "workbox-window"
import ReactDOM from "react-dom"
import Config from "./data/Config"
import useStore from "./data/store"
import { Heading } from "./utils" 

function App() {
    let message = useStore(i => i.message)

    return (
        <>
            <Heading>Hello, world</Heading>
            <p>{message}</p> 
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))

if (Config.REGISTER_SERVICEWORKER) {
    let worker = new Workbox("/serviceworker.js")

    worker.addEventListener("installed", e => {
        console.info(`Service worker ${e.isUpdate ? "updated" : "installed"}`)
    })
    worker.register()
}