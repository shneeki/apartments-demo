import React, { Suspense, useState, useRef } from "react"
import * as THREE from "three"
import "./viewer.css"
import { Canvas } from "@react-three/fiber"
// import Model from "./../components/modelLoader"
// import ThreeLoader from "../components/ThreeLoader"
import { OrbitControls } from "@react-three/drei"

import GlowBox from "../elements/GlowBox"

//kadekeith.me/2017/09/12/three-glow.html

const IndexPage = () => {
  return (
    <section className="pageContainer">
      <>
        <div className="canvasContainer">
          <Canvas
            gl={{ antialias: true }}
            className="canvas"
            onCreated={({ gl }) => {
              // gl.setClearColor("lightgreen")
            }}
            camera={{
              fov: 75,
              near: 0.1,
              far: 30000,
              position: [0, 10, 10],
            }}
          >
            <Suspense fallback={null}>
              <GlowBox />
            </Suspense>
            {/* <ambientLight intensity={1} /> */}
            <pointLight color={0xffffff} position={[0, 250, 0]} />
            <OrbitControls />
          </Canvas>
        </div>
      </>
    </section>
  )
}

export default IndexPage
