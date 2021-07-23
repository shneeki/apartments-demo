import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useThree, useFrame } from "@react-three/fiber"

const vertexShader = `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
`

const Glow = () => {
  const { camera } = useThree()
  const glowMesh = useRef<THREE.Mesh>(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: { value: 1.0 },
      p: { value: 1.4 },
      glowColor: { value: new THREE.Color(0xffff00) },
      viewVector: { value: camera.position },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.FrontSide,
    // blending: THREE.AdditiveBlending,
    transparent: true,
  })
  const sphereGeom = new THREE.SphereGeometry(100, 32, 16)
  const moonGlow = new THREE.Mesh(sphereGeom.clone(), glowMaterial.clone())

  useFrame(() => {
    // let viewVector = new THREE.Vector3().subVectors(
    //   camera.position,
    //   object.glow.getWorldPosition()
    // )

    // object.glow.material.uniforms.viewVector.value = viewVector

    if (glowMesh && glowMesh.current) {
      moonGlow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
        camera.position,
        glowMesh.current.position
      )
    }
  })
  return (
    <primitive
      ref={glowMesh}
      position={[0, 0, 0]}
      object={moonGlow}
      scale={active ? 2 : 1}
    />
  )
}

export default Glow
