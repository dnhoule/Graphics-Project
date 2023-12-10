/* pass interpolated variables to from the vertex */
precision highp float;

varying float vAmount;
varying vec3 vNormal;
varying vec3 vecPos;
const vec3 lightDir1 = vec3(0,1,0);
const vec3 lightDir2 = vec3(1,1,1);
const vec3 lightDir3 = vec3(1,1,0);
const vec3 lightDir4 = vec3(0,1,1);



// struct PointLight {
//   vec3 color;
//   vec3 position; // light position, in camera coordinates
//   float distance; // used for attenuation purposes. Since
//                   // we're writing our own shader, it can
//                   // really be anything we want (as long as
//                   // we assign it to our light in its
//                   // "distance" field
// };
// uniform PointLight pointLights[];

void main()
{

     vec3 nhat = normalize(vNormal);


    float light = dot(nhat, normalize(lightDir1 + lightDir2 + lightDir3 + lightDir4));


    vec3 snow = smoothstep(.8,1.,vAmount) * vec3(1.,1.,1.);
    vec3 dirt = smoothstep(.3,.8, vAmount) * vec3(.588, .294, 0.);
    vec3 grass = (smoothstep(0., .5, vAmount) - smoothstep(.4,.5,vAmount)) * vec3(0., .5, 0.);

    gl_FragColor = vec4((snow + dirt + grass) * light, 1.);
}
