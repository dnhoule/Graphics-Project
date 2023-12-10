// @ts-check

import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-THREE/build/three.module.js";

let leafTexture = new T.TextureLoader().load("../../tarrazu/textures/leaf.png");
leafTexture.flipY = false;
let plantobjsctr = 0;
export class Coffee extends GrObject{


    constructor(pos)  {




        // Define stem vertices
const stemRadiusTop = 0.01;
const stemRadiusBottom = 0.02;
const stemHeight = 1;
const stemRadialSegments = 8;
const stemGeometry = new T.CylinderGeometry(
  stemRadiusTop,
  stemRadiusBottom,
  stemHeight,
  stemRadialSegments
);

// Define leaf vertices
const leafGeometry = new T.BufferGeometry();
const leafVertices = new Float32Array([
  0.0, 0.00, 0.0,
  0.05, -0.01, 0.15,
  0.0, -0.02, 0.3,

  0.0, 0.00, 0.0,
 -0.05, -0.01, 0.15,
  0.0, -0.02, 0.3,
]);

let leafWidth = 180/415;
const uvs = new Float32Array([
    leafWidth,1,
    0,1,
    leafWidth, 0,

    leafWidth,1,
    0,1,
    leafWidth, 0
  ]);
leafGeometry.setAttribute('position', new T.BufferAttribute(leafVertices, 3));
leafGeometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));

// Define stem material and mesh
const stemMaterial = new T.MeshBasicMaterial({ color: 0x8B4513 });
const stemMesh = new T.Mesh(stemGeometry, stemMaterial);
stemMesh.position.set(0, 0.5, 0);

// Define leaf material and meshes
let leaves = [];
const leafMaterial = new T.MeshBasicMaterial({ color: 0x18A558 , side: T.DoubleSide, map: leafTexture});

for (let i = 0; i < 100; ++i) {
    leaves[i] = new T.Mesh(leafGeometry, leafMaterial);
    
    stemMesh.add(leaves[i]);
    leaves[i].position.y = Math.random() - .5;
    leaves[i].rotateY(Math.random() * 2 * Math.PI)
}

//leafMesh.position.set();


// Create plant object and add stem and leaves
const plant = new T.Group();


plant.add(stemMesh);
plant.scale.set(2,2,2)

plant.position.set(pos[0],pos[1], pos[2])

super(`Plant-${plantobjsctr++}`,plant);



    }

}