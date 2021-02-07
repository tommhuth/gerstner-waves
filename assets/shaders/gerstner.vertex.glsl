#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
  
varying vec3 vNormal; 
varying vec3 vViewPosition;
uniform float uTime;
uniform vec3 mvPosition;
uniform vec3 diffuse;
const float PI = 3.14159265;
uniform vec4[5] uWaves;

// taken from https://catlikecoding.com/unity/tutorials/flow/waves/
vec3 gerstnerWave(vec4 wave, vec3 p, inout vec3 tangent, inout vec3 binormal) {
    float steepness = wave.z;
    float wavelength = wave.w;
    float k = 2. * PI / wavelength;
    float c = sqrt(9.8 / k);
    vec2 d = normalize(wave.xy);
    float f = k * (dot(d, p.xz) - c * uTime);
    float a = steepness / k;

    tangent += vec3(
        -d.x * d.x * (steepness * sin(f)),
        d.x * (steepness * cos(f)),
        -d.x * d.y * (steepness * sin(f))
    );
    binormal += vec3(
        -d.x * d.y * (steepness * sin(f)),
        d.y * (steepness * cos(f)),
        -d.y * d.y * (steepness * sin(f))
    );

    return vec3(
        d.x * (a * cos(f)),
        a * sin(f),
        d.y * (a * cos(f)));
}

void main() { 
    vec3 tangent = vec3(1., 0., 0.);
    vec3 binormal = vec3(0., 0., 1.); 
    vec3 p = vec3(position.xyz);

    for(int i = 0; i < uWaves.length(); i++) {
        // dir x, dir z, steepness, wavelength 
        vec4 wave = uWaves[i];

        if (wave.w > 0.) {
            p += gerstnerWave(wave, position, tangent, binormal);
        }
    } 

    vNormal = normalize(cross(binormal, tangent));
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
}