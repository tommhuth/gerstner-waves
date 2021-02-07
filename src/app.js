import "../assets/styles/app.scss"
 
import ReactDOM from "react-dom" 
import { Vector3 } from "three"
import { Canvas } from "react-three-fiber"
import Wave from "./Wave"
import useStore, { update, setWireframe } from "./data/store"

function App() {
    let waves = useStore(i => i.waves)
    let wireframe = useStore(i => i.wireframe)

    return (
        <>
            <fieldset
            >
                <label>
                    <input type="checkbox" checked={wireframe} onChange={({ target }) => setWireframe(target.checked)} /> Wireframe
                </label>
                <ul>
                    {waves.sort((a, b) => a.id - b.id).map(({ id, direction, steepness, wavelength }) => {
                        return (
                            <li key={id}>
                                <p>Wave {id + 1}</p>
                                (
                                <label>
                                    <span className="visually-hidden">X</span>
                                    <input
                                        type="text"
                                        defaultValue={direction[0] || 0}
                                        onChange={({ target }) => {
                                            update({ id, direction: [parseFloat(target.value), direction[1]] })
                                        }}
                                    />
                                </label>,
                                <label>
                                    <span className="visually-hidden">Y</span>
                                    <input
                                        type="text"
                                        defaultValue={direction[1] || 0}
                                        onChange={({ target }) => {
                                            update({ id, direction: [direction[0], parseFloat(target.value)] })
                                        }}
                                    />
                                </label>
                                ){" "}&mdash;{" "}
                                <label>
                                    s=
                                    <input
                                        type="text"
                                        defaultValue={steepness || 0}
                                        onChange={({ target }) => {
                                            update({ id, steepness: parseFloat(target.value) })
                                        }}
                                    />
                                </label> 
                                <label>
                                    w=
                                    <input
                                        type="text"
                                        defaultValue={wavelength || 0}
                                        onChange={({ target }) => {
                                            update({ id, wavelength: parseFloat(target.value) })
                                        }}
                                    />
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </fieldset>
            <Canvas
                style={{
                    width: "100%",
                    height: "100%"
                }}
                camera={{
                    position: new Vector3(0, 35, 65),
                    near: .01,
                    far: 200
                }}
            >
                <directionalLight position={[-8, 11, -11]} />
                <ambientLight color={0xffffff} intensity={.35} />
                <Wave />
            </Canvas>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))