import React from "react"
import { useEffect } from "react"
import Box from "./Box"
import { createGlowMesh, defaultOptions } from "./customGlow"

// We can optionally import and overwrite the defaultOptions
const options = {
  ...defaultOptions,
  backside: false,
  coefficient: 0.3,
  color: "gold",
  size: 1.2,
  power: 2,
}
interface GlowLibProps {}
const GlowBox = ({}: GlowLibProps) => {
  const ref = React.createRef<THREE.Mesh>()
  useEffect(() => {
    if (ref && ref.current) {
      console.log("CREATING GLOW EFECT")
      const glowMesh = createGlowMesh(ref.current.geometry, options)
      ref.current.add(glowMesh)
    }
  }, [])

  return <Box ref={ref} />
}

export default GlowBox
