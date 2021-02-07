
import { useMemo, useRef } from "react"
import { Vector3, PlaneBufferGeometry, ShaderLib, UniformsUtils } from "three"
import { useFrame } from "react-three-fiber"
import vertexShader from "../assets/shaders/gerstner.vertex.glsl"
import useStore from "./data/store"

export default function Wave() {
    const ref = useRef(null)
    const waves = useStore(i => i.waves)
    const wireframe = useStore(i => i.wireframe)
    const geometry = useMemo(() => {
        const geometry = new PlaneBufferGeometry(160, 100, 70, 30)

        geometry.rotateX(-Math.PI / 2)

        return geometry
    }, [])
    const uniforms = useMemo(() => {
        let v = []

        waves.forEach(i => v.push(...i.direction, i.steepness, i.wavelength))

        return UniformsUtils.merge([
            UniformsUtils.clone(ShaderLib.phong.uniforms),
            {
                uTime: { value: 0, type: "f" },
                diffuse: { value: new Vector3(.1, .4, .7) },
                uWaves: {
                    value: waves.reduce((accu, curr) => [...accu, ...curr.direction, curr.steepness, curr.wavelength], []),
                }
            },
        ])
    }, [waves])

    useFrame(() => {
        uniforms.uTime.value += .01
    })

    return (
        <mesh
            position={[0, 0, 0]}
            ref={ref}
            geometry={geometry}
        >
            <shaderMaterial
                attach="material"
                args={[{
                    vertexShader,
                    fragmentShader: ShaderLib.phong.fragmentShader,
                    uniforms,
                    wireframe,
                    lights: true,
                }]}
            />
        </mesh>
    )
}