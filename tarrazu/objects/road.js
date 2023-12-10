/*jshint esversion: 6 */
// @ts-check

import * as T from "../../libs/CS559-THREE/build/THREE.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";


const mountTexture = new T.TextureLoader().load('../../tarrazu/textures/m.png');
    
export class Road extends GrObject {


    constructor() {


      const heightMap = new T.TextureLoader().load("../../tarrazu/textures/m.png");
      const dirtTexture = new T.TextureLoader().load("../../tarrazu/textures/dirt.jpg");
      
      

    const curve = new T.CatmullRomCurve3([
      new T.Vector3(-13, 0, -8),
      new T.Vector3(-16, .1, -5),
      new T.Vector3(-9, .6, 8),
      new T.Vector3(-9, .6, 14),
      new T.Vector3(13, .7, 14),
      new T.Vector3(13, 1.2, 8),
      new T.Vector3(16, .9, -3),
      new T.Vector3(10,1.7,-5)
    ], true, "chordal");

    const roadWidth = 2;
    const extrudeSettings = {
      steps: 100,
      bevelEnabled: false,
      extrudePath: curve
    };
    
    const roadShape = new T.Shape();
    roadShape.moveTo(0,-roadWidth / 2 );
    roadShape.lineTo(0, -roadWidth / 2);
    roadShape.lineTo(0, roadWidth / 2);
    roadShape.lineTo(0, roadWidth / 2);
    roadShape.lineTo(0, -roadWidth / 2);
    
    const geometry = new T.ExtrudeGeometry(roadShape, extrudeSettings);
    geometry.computeVertexNormals();

    const material = new T.MeshStandardMaterial({
      color: 0x964B00,
      bumpScale: 1000,
      map: dirtTexture
    });



    const mesh = new T.Mesh(geometry, material);


    
    mesh.translateY(.1)
      super("Road", mesh)
      this.curve = curve;

        
    }

    eval(u) {
      return this.curve.getPointAt(u);
    }


}

