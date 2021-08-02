import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"

const vertexShader = `
varying vec3 vVertexWorldPosition;
varying vec3 vVertexNormal;
varying vec2 vUv;
void main() {
  vUv=uv;

  vVertexNormal	= normalize(normalMatrix * normal);
  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const fragmentShader = `
uniform vec3 color;
uniform sampler2D vTexture;
uniform bool isActive;
varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;
varying vec2 vUv;

void main() {
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 1.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  float intensity	= 1.0-pow(dot(vVertexNormal, viewCameraToVertex),2.0);
  intensity =clamp(intensity,0.2,1.0);

  vec4 textureColor = texture2D(vTexture, vUv);
  if(isActive != true)
  {
    intensity=textureColor.r * intensity;
  }
 gl_FragColor=vec4(color.r, color.g, color.b, intensity);
}`

export class GlowMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        color: {
          value: new THREE.Color("#1FAE9A"),
        },
        vTexture: {
          value: null,
        },
        isActive: {
          value: true,
        },
      },
      depthTest: false,
      transparent: true,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
      vertexShader,
      fragmentShader,
    })
  }

  get color() {
    return this.uniforms.color.value
  }
  set color(v) {
    this.uniforms.color.value = v
  }
  get isActive() {
    return this.uniforms.isActive.value
  }
  set isActive(v) {
    this.uniforms.isActive.value = v
  }
  get vSide() {
    return this.side
  }
  set vSide(v: THREE.Side) {
    this.side = v
  }
  get vTexture() {
    return this.uniforms.vTexture.value
  }
  set vTexture(v) {
    this.uniforms.vTexture.value = v
  }
}

extend({ GlowMaterial })
