import React, { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { glowFragmentShader, glowVertexShader } from "./shaders"
import { BoxGeometryProps, MeshProps } from "@react-three/fiber"
import { Mesh } from "three"

interface GlowBoxThreeProps {
  meshProps: MeshProps
  geometryProps: BoxGeometryProps
}
const GlowBoxThree = ({ meshProps, geometryProps }: GlowBoxThreeProps) => {
  const mesh = useRef<null | Mesh>(null)
  const [active, setActive] = useState(false)
  const boxTexture = useTexture("shaderTexture.png")
  useEffect(() => {
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        vTexture: { value: boxTexture },
        color: { value: new THREE.Color("#1FAE9A") },
        isActive: { value: active },
      },
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      side: active ? THREE.FrontSide : THREE.DoubleSide,
      blending: THREE.NormalBlending,
      transparent: true,
      depthTest: false,
    })
    if (mesh && mesh.current) mesh.current.material = customMaterial
  }, [active, boxTexture])

  return (
    <mesh {...meshProps} ref={mesh} scale={1} onClick={e => setActive(!active)}>
      <boxGeometry {...geometryProps} />
    </mesh>
  )
}
export default GlowBoxThree
