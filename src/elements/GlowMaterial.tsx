import * as THREE from "three"
import { extend } from "@react-three/fiber"

const vertexShader = `
varying vec3 vVertexWorldPosition;
varying vec3 vVertexNormal;
void main() {
  vVertexNormal	= normalize(normalMatrix * normal);
  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const fragmentShader = `
uniform vec3 color;
uniform float coefficient;
uniform float power;
varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;
void main() {
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  float intensity	= pow(
    coefficient + dot(vVertexNormal, viewCameraToVertex),
    power
  );
  gl_FragColor = vec4(color, intensity);
}`

export class GlowMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        coefficient: {
          value: 0.2,
        },
        color: {
          value: new THREE.Color("gold"),
        },
        power: {
          value: 6,
        },
      },
      depthTest: false,
      transparent: true,
      side: THREE.FrontSide,
      vertexShader,
      fragmentShader,
    })
  }

  get coefficient() {
    return this.uniforms.coefficient.value
  }
  set coefficient(v) {
    this.uniforms.coefficient.value = v
  }
  get color() {
    return this.uniforms.color.value
  }
  set color(v) {
    this.uniforms.color.value = v
  }
  get power() {
    return this.uniforms.power.value
  }
  set power(v) {
    this.uniforms.power.value = v
  }
}

extend({ GlowMaterial })
