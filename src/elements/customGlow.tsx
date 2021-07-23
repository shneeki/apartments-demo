import {
  BackSide,
  FrontSide,
  Color,
  Mesh,
  ShaderMaterial,
  BufferGeometry,
  AdditiveBlending,
  DoubleSide,
  NormalBlending,
  MultiplyBlending,
} from "three"

// Based off : http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
// written with threejs version 0.130.1
// use http://stemkoski.github.io/Three.js/Shader-Glow.html for Options

export interface Options {
  backside: boolean
  coefficient: number
  color: Color | string | number
  size: number
  power: number
}

const vertexShader = `
varying vec3 vVertexWorldPosition;
varying vec3 vVertexNormal;
void main() {
  vVertexNormal	= normalize(normalMatrix * normal);
  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// modelMatrix-global transform of the object
//normal- vertex normal
//  vec3 viewCameraToVertex	= vec3(viewMatrix * vec4(worldCameraToVertex, 0.0));
//cameraPosition is global camera coordinate vec3
// vec3 normalWorldPosition = modelMatrix * vec4(normal, 0.0);
//     vec3 viewCameraToNormal	= vec3(viewMatrix * normalWorldPosition);
//     viewCameraToNormal=normalize(viewCameraToNormal);
const vertexShader1 = `
uniform float power;
varying float opacity;
void main()
{
    vec3 worldVertexPosition = vec3(modelMatrix * vec4(position, 0.0));
    vec3 worldVertexToCamera = cameraPosition-worldVertexPosition ;
    vec3 viewCameraToVertex	= vec3(viewMatrix * vec4(worldVertexToCamera, 0.0));
    viewCameraToVertex = normalize(viewCameraToVertex);

    vec3 vNormal = vec3(viewMatrix * vec4(normalMatrix * normal,0 ));
    vNormal=normalize(vNormal);
    opacity = 1.0 - dot(vNormal, viewCameraToVertex);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`
// const fragmentShader = `
// varying float opacity;
// uniform vec3 color;
// void main() {

// gl_FragColor = vec4( color, opacity);
// }
// `
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

// vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
//   intensity = pow( dot(normalize(viewVector), actual_normal), 6.0 );
export const defaultOptions = {
  backside: false,
  coefficient: 0.2,
  color: "gold",
  size: 1.2,
  power: 6,
}

export const createGlowMaterial = (
  coefficient: number,
  color: Color | string | number,
  power: number
) => {
  return new ShaderMaterial({
    depthTest: false,
    transparent: true,
    side: FrontSide,
    uniforms: {
      coefficient: {
        value: coefficient,
      },
      color: {
        value: new Color(color),
      },
      power: {
        value: power,
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  })
}

const createGlowGeometry = (
  geometry: BufferGeometry,
  scalingFactor: number
) => {
  const glowGeometry = geometry.clone()
  const scaledGlowGeometry = glowGeometry.scale(
    scalingFactor,
    scalingFactor,
    scalingFactor
  )
  return scaledGlowGeometry
}

export const createGlowMesh = (
  geometry: BufferGeometry,
  options: Options = defaultOptions
) => {
  const { backside, coefficient, color, size, power } = options

  const glowGeometry = createGlowGeometry(geometry, size)
  const glowMaterial = createGlowMaterial(coefficient, color, power)

  glowMaterial.side = DoubleSide

  return new Mesh(glowGeometry, glowMaterial)
}
