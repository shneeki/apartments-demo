1: #version 300 es
2: #define attribute in
3: #define varying out
4: #define texture2D texture
5: precision highp float;
6: precision highp int;
7: #define HIGH_PRECISION
8: #define SHADER_NAME ShaderMaterial
9: #define VERTEX_TEXTURES
10: #define GAMMA_FACTOR 2
11: #define MAX_BONES 0
12: #define BONE_TEXTURE
13: uniform mat4 modelMatrix;
14: uniform mat4 modelViewMatrix;
15: uniform mat4 projectionMatrix;
16: uniform mat4 viewMatrix;
17: uniform mat3 normalMatrix;
18: uniform vec3 cameraPosition;
19: uniform bool isOrthographic;
20: #ifdef USE_INSTANCING
21: 	attribute mat4 instanceMatrix;
22: #endif
23: #ifdef USE_INSTANCING_COLOR
24: 	attribute vec3 instanceColor;
25: #endif
26: attribute vec3 position;
27: attribute vec3 normal;
28: attribute vec2 uv;
29: #ifdef USE_TANGENT
30: 	attribute vec4 tangent;
31: #endif
32: #if defined( USE_COLOR_ALPHA )
33: 	attribute vec4 color;
34: #elif defined( USE_COLOR )
35: 	attribute vec3 color;
36: #endif
37: #ifdef USE_MORPHTARGETS
38: 	attribute vec3 morphTarget0;
39: 	attribute vec3 morphTarget1;
40: 	attribute vec3 morphTarget2;
41: 	attribute vec3 morphTarget3;
42: 	#ifdef USE_MORPHNORMALS
43: 		attribute vec3 morphNormal0;
44: 		attribute vec3 morphNormal1;
45: 		attribute vec3 morphNormal2;
46: 		attribute vec3 morphNormal3;
47: 	#else
48: 		attribute vec3 morphTarget4;
49: 		attribute vec3 morphTarget5;
50: 		attribute vec3 morphTarget6;
51: 		attribute vec3 morphTarget7;
52: 	#endif
53: #endif
54: #ifdef USE_SKINNING
55: 	attribute vec4 skinIndex;
56: 	attribute vec4 skinWeight;
57: #endif
58: 
59: 
60: varying vec3 vVertexWorldPosition;
61: varying vec3 vVertexNormal;
62: void main() {
63:   vVertexNormal	= normalize(normalMatrix * normal);
64:   vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
65:   gl_Positiong	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
66: }
67:  