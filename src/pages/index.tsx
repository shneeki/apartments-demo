import React, { Suspense, useState, useRef } from "react"
import * as THREE from "three"
import "./viewer.css"
import { Canvas } from "@react-three/fiber"
// import Model from "./../components/modelLoader"
// import ThreeLoader from "../components/ThreeLoader"
import { OrbitControls, Loader } from "@react-three/drei"
import Model from "../components/model"

import GlowBox from "../elements/GlowBox"
import ApartmentSelection from "../components/ApartmentSelection"

//kadekeith.me/2017/09/12/three-glow.html

const IndexPage = () => {
  const modelRef = useRef(null)

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
              position: [0, 400, 400],
            }}
          >
            <Suspense fallback={null}>
              <Model ref={modelRef} path="complex_apartment.glb" />
              {/* <ApartmentSelection modelRef={modelRef} /> */}
            </Suspense>
            <ambientLight intensity={1} />
            <pointLight color={0xffffff} position={[0, 250, 0]} />
            <OrbitControls />
          </Canvas>
          <Loader />
        </div>
      </>
    </section>
  )
}

export default IndexPage
