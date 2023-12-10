/* pass interpolated variables to the fragment */

varying float vAmount;
varying vec3 vNormal;
varying vec3 totalLight;
varying vec3 vecPos;

uniform sampler2D bumpTexture;
uniform float bumpScale;




/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    

    vec4 bumpData = texture2D( bumpTexture, uv);

    vAmount = bumpData.r;
    //vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

    vNormal = normalMatrix * normal;

    // the main output of the shader (the vertex position)

    vec3 newPos = position + normal * bumpScale * vAmount;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}