import React from "react"

import { Mesh, Color, FrontSide } from "three"
import { useGLTF, useTexture } from "@react-three/drei"

import * as THREE from "three"
import { glowFragmentShader, glowVertexShader } from "../elements/shaders"

const dummyApartments = {
  apartments: [
    { id: 0, available: true, label: "Cool apartment" },
    { id: 1, available: false, label: "Grey apartment" },
    { id: 2, available: true, label: "Top apartment" },
    { id: 3, available: false, label: "Bright apartment" },
    { id: 4, available: false, label: "Dark apartment" },
    { id: 5, available: true, label: "Hot apartment" },
    { id: 6, available: true, label: "Light apartment" },
  ],
}
const colorAvailable = "#1FAE9A"
const colorUnavailable = "red"
type modelProps = {
  path: string
}

const Model = React.forwardRef(({ path }: modelProps, ref) => {
  const glb = useGLTF(path, true)
  const boxTexture = useTexture("shaderTexture.png")

  const apartments = dummyApartments.apartments
  glb.scene.children
    .filter(child => child.type === "Mesh")
    .forEach(child => {
      const mesh = (child as unknown) as Mesh
      const meshId = mesh.userData.id
      const apartmentsIndex = apartments.findIndex(
        apartment => apartment.id === meshId
      )
      if (apartmentsIndex !== -1) {
        const customMaterial = new THREE.ShaderMaterial({
          uniforms: {
            vTexture: { value: boxTexture },
            color: {
              value: apartments[apartmentsIndex].available
                ? new THREE.Color(colorAvailable)
                : new THREE.Color(colorUnavailable),
            },
            isActive: { value: true },
          },
          vertexShader: glowVertexShader,
          fragmentShader: glowFragmentShader,
          side: THREE.FrontSide,
          blending: THREE.NormalBlending,
          transparent: true,
          depthTest: true,
        })
        mesh.material = customMaterial
      }
    })

  // apartments.forEach(({ id, available, label }) => {
  //   glb.scene.children
  //   // console.log(modelRef.current.children)
  // })
  // useEffect(() => {
  //   console.log("GLB", glb)
  //   const apartments = dummyApartments.apartments
  //   // apartments.forEach(({ id, available, label }) => {
  //   //   // console.log(modelRef.current.children)
  //   // })
  // }, [glb])

  return <primitive ref={ref} object={glb.scene} />
})
export default React.memo(Model)
