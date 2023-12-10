// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";

import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";
import { Light } from "../../libs/CS559-Three/build/three.module.js";

export class Mountains extends GrObject {


constructor() {


    const mountTexture = new T.TextureLoader().load('../../tarrazu/textures/m.png');
    

    const planeGeometry = new T.PlaneGeometry(40,40,1000,1000);
    planeGeometry.computeVertexNormals();


    let shaderMat = shaderMaterial("../../tarrazu/shaders/mount.vs", "../../tarrazu/shaders/mount.fs", {
            side: T.DoubleSide,
            //lights: true,
            uniforms:/* T.UniformsUtils.merge([T.UniformsLib['lights'],*/ {
                bumpTexture: {value: mountTexture},
                bumpScale: {value: 10}
            } //])
    });


    // const mountMaterial = new T.MeshStandardMaterial({
    //     color: 0x5C4033, // gray
    //     displacementMap: mountTexture,
    //     bumpMap: mountTexture,
    //     displacementScale: 12,
    //     bumpScale: 5
    // });

    
    
    const mountMesh = new T.Mesh(planeGeometry, shaderMat)
    mountMesh.rotateX(-Math.PI/2)

    mountMesh.translateZ(-3)
   
    


    super("Mountain", mountMesh)
}




}

