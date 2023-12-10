// @ts-check

import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";



export class Roaster extends GrObject {



    constructor(x,y,z) {

        let group = new T.Group;

        let geometry = new T.BufferGeometry();
        const vertices = new Float32Array([
    
            // left
                0,0,0,  0,1.2,0,  0,0,-1,  
                0,0,-1, 0,1.2,0,  0,1,-1,

            // top

                0,1.2,0,  1,1.2,0,  0,1,-1,
                0,1,-1, 1,1.2,0,  1,1,-1,

            //right

                1,0,0,  1,1.2,0,  1,0,-1,  
                1,0,-1, 1,1.2,0,  1,1,-1,

            //back

            0,0,-1, 0,1,-1, 1,0,-1,
            1,0,-1, 0,1,-1, 1,1,-1


        ])
        

        geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
        

        const uvs = new Float32Array([
            0,0,  0,0,  0,0, 
            0,0,  0,0,  0,0, 

            0,0,  0,0,  0,0, 
            0,0,  0,0,  0,0, 
        ])

        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        geometry.computeVertexNormals();
       

        let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0,
        side: T.DoubleSide 
        });

        let tinMesh = new T.Mesh(geometry, material)
        tinMesh.scale.set(3,1,1)


        let cylinderGeo1 = new T.CylinderGeometry(.05, .05, 1.1, 4, 1)

        let cylMat = new T.MeshStandardMaterial({color: "gray"});

        let cylMesh1 = new T.Mesh(cylinderGeo1, cylMat)
        cylMesh1.translateX(.2)
        cylMesh1.translateZ(-.2)
        cylMesh1.translateY(.55)
        let cylMesh2 = new T.Mesh(cylinderGeo1, cylMat)
        cylMesh2.translateX(2.8)
        cylMesh2.translateZ(-.2)
        cylMesh2.translateY(.55)


        let cylinderGeo2 = new T.CylinderGeometry(1,1,1.5,50,10)
        let bigCylMat = new T.MeshStandardMaterial({color: "gray"})

        let bigCylMesh1 = new T.Mesh(cylinderGeo2, bigCylMat)
        group.add(bigCylMesh1)
        bigCylMesh1.translateZ(-2.01)
        bigCylMesh1.translateX(.5)
        bigCylMesh1.translateY(.75)

        let bigCylMesh2 = new T.Mesh(cylinderGeo2, bigCylMat)
        group.add(bigCylMesh2)
        bigCylMesh2.translateZ(-2.01)
        bigCylMesh2.translateX(2.5)
        bigCylMesh2.translateY(.75)

        let topGeo = new T.CylinderGeometry(0,1,.3,10,10)
        let topMat = new T.MeshStandardMaterial({color:"gray"})

        let topMesh1 = new T.Mesh(topGeo, topMat)
        bigCylMesh1.add(topMesh1)
        topMesh1.translateY(.9)

        let topMesh2 = new T.Mesh(topGeo, topMat)
        bigCylMesh2.add(topMesh2)
        topMesh2.translateY(.9)

        group.add(tinMesh)

        group.add(cylMesh1)
        group.add(cylMesh2)

        group.position.set(x,y,z)
        group.scale.set(1.5,1.5,1.5)
        group.rotateY(Math.PI/2)
        
        

        super("Roaster", group)
    }




    



}