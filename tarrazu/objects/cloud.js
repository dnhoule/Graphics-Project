// @ts-check

import * as Loaders from "../../libs/CS559-Framework/loaders.js";


import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-THREE/build/three.module.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";


let cloudMesh;
const gltfLoader = new GLTFLoader();
    
/**
 * A Less Simple Object to go around the track
 */
export class Cloud extends GrObject {
    constructor() {

    gltfLoader.load("../../tarrazu/assets/scene.gltf", function(gltf) {
        cloudMesh = gltf.asset;

        cloudMesh.position.set(0,10,0);
       cloudMesh.scale.set(5,5,5)
    })


     super("Cloud", cloudMesh);
    
    }
    // stepWorld(delta, timeOfDay) {
    //   this.u += delta / 2000;
    //   let pos = this.track.eval(this.u);
    //   this.objects[0].position.set(pos[0], pos[1], pos[2]);
    //   let dir = this.track.tangent(this.u);
    //   // since we can't easily construct the matrix, figure out the rotation
    //   // easy since this is 2D!
    //   let zAngle = Math.atan2(dir[2], dir[0]);
    //   // turn the object so the Z axis is facing in that direction
    //   this.objects[0].rotation.y = -zAngle - Math.PI / 2;
    // }
  }