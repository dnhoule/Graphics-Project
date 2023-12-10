// @ts-check

import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

let houseTexture = new T.TextureLoader().load("../../tarrazu/textures/house.png");
houseTexture.flipY = false;

let houseobjsctr = 0;
export class House extends GrObject {

    constructor(houseLength, houseHeight,houseWidth, position) {

            houseWidth = -houseWidth;
            let geometry = new T.BufferGeometry();

            let overhang = .2
    
            const vertices = new Float32Array([
    
                // side 1
                0,0,0, houseLength,0,0, 0,houseHeight,0,    
                0,houseHeight,0, houseLength,0,0, houseLength,houseHeight,0,
                0,houseHeight,0, houseLength,houseHeight,0, houseLength/2,houseHeight + houseHeight/4,0,
                
                // side 2
                houseLength,0,0, houseLength,0,houseWidth, houseLength,houseHeight,0,
                houseLength,houseHeight,0, houseLength,0,houseWidth, houseLength,houseHeight,houseWidth,
    
                // side 3
                0,0,houseWidth, 0,houseHeight,houseWidth, houseLength,0,houseWidth,    
                0,houseHeight,houseWidth, houseLength,houseHeight,houseWidth, houseLength,0,houseWidth, 
                0,houseHeight,houseWidth, houseLength / 2,houseHeight + houseHeight/4,houseWidth, houseLength,houseHeight,houseWidth,
    
                // side 4
                0,0,0, 0,houseHeight,0, 0,0,houseWidth,
                0,houseHeight,0, 0,houseHeight,houseWidth, 0,0,houseWidth,
    
                // roof 1
                -overhang,houseHeight - .04,overhang,   houseLength/2,houseHeight + houseHeight/4,overhang,   houseLength/2,houseHeight + houseHeight/4,houseWidth - overhang,
                houseLength/2,houseHeight + houseHeight/4,houseWidth - overhang,    -overhang,houseHeight - .04,houseWidth - overhang, -overhang,houseHeight - .04,overhang,
    
                // roof 2
                overhang + houseLength,houseHeight - .04,overhang,   houseLength/2,houseHeight + houseHeight/4,houseWidth - overhang,   houseLength/2,houseHeight + houseHeight/4,overhang,
                houseLength/2,houseHeight + houseHeight/4,houseWidth - overhang,  overhang + houseLength,houseHeight - .04,overhang, houseLength +overhang,houseHeight - .04,houseWidth - overhang,
            ])
            
    
            geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
            
    
            let len = 245/ 493
            let wid = 141/ 493
            let hgt = 163/493

            const uvs = new Float32Array([
    
                // side 1
                len,hgt * 2, len + wid,hgt * 2, len,hgt,
                len,hgt, len + wid,hgt * 2, len + wid,hgt,
                len,hgt + .09, len + wid,hgt+ .09, len + wid/2, hgt,
    
                // side 2
                0,hgt*2, len,hgt*2, 0,hgt,
                0,hgt, len,hgt*2, len,hgt,
    
                // side 3
                len,hgt * 2, len,hgt, len + wid,hgt * 2,
                len,hgt, len + wid,hgt, len + wid,hgt * 2,
                len,hgt + .09, len + wid/2, hgt, len + wid,hgt+ .09,
    
                // side 4
                1, hgt, 1,0, len,hgt,
                1,0, len,0, len,hgt,
    
                // roof 1
                len,hgt, len,0, 0,0,
                0,0,  0,hgt, len,hgt,
    
                // roof 2
                0,hgt, len,0, 0,0,
                len,0, 0,hgt, len,hgt
            ])
    
            geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
            geometry.computeVertexNormals();

           
    
            let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0,
            map: houseTexture,
            side: T.DoubleSide 
            });
            let mesh = new T.Mesh(geometry,material);
            mesh.scale.set(2,2,2)
            mesh.position.x = position[0];
            mesh.position.y = position[1];
            mesh.position.z = position[2];
            mesh.rotateY(position[3])

            
            super(`House-${houseobjsctr++}`, mesh);
        }
    
    
    
    }