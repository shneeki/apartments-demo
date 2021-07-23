import { useFrame } from "@react-three/fiber"
import React, { useRef, useState } from "react"

const Box = React.forwardRef((props: any, ref) => {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.x += 0.01
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={event => setActive(!active)}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}
    >
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "blue"} />
    </mesh>
  )
})
export default Box
