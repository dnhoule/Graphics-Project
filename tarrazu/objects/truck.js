

// @ts-check

import * as T from "../../libs/CS559-THREE/build/THREE.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { Curve } from "../../libs/CS559-THREE/build/THREE.module.js";


let truckobjsctr = 0;
export class Truck extends GrObject {
  constructor(road, uStart) {
    //entire truck
    const group = new T.Group();
    

    //body of truck
    const bodyGroup = new T.Group();

   const bodyGeo = new T.BoxGeometry(1, 0.5, 2.5);

    const bodyMesh = new T.Mesh(
      bodyGeo,
      new T.MeshStandardMaterial({ color: 0x317185 })
    );
    bodyMesh.position.y = 0.5;

    const backGeo = new T.BoxGeometry(1.1, 1, 2.5);
    const backMesh = new T.Mesh(
        backGeo,
      new T.MeshStandardMaterial({ color: 0x42cbf5 })
    );
    backMesh.position.set(0,1.25,0)


    //head of truck
    const headGroup = new T.Group();


    let frontGeo = new T.BoxGeometry(.9,.7,1.5)
    let frontMesh = new T.Mesh(frontGeo, new T.MeshStandardMaterial({color: 0x42cbf5}))
    frontMesh.translateY(.1)
    bodyMesh.add(frontMesh)


    let topGeo = new T.BufferGeometry();
    let windowTexture = new T.TextureLoader().load( "../../tarrazu/textures/window.png" );

    let verts = new Float32Array([

        //left 
        0,0,0,  .1,1,-.2, 0,0,-1,
        0,0,-1, .1,1,-.2, .1,1,-1,

        //front
        0,0,0,     1,0,0,  .1,1,-.2,
        .1,1,-.2,  1,0,0,  .9,1,-.2,

        //right
        1,0,0, 1,0,-1,  .9,1,-.2,
        1,0,-1, .9,1,-1, .9,1,-.2,

        //top
        .1,1,-.2,   .9,1,-.2,  .1,1,-1,
        .1,1,-1,   .9,1,-.2,   .9,1,-1,

    ])

    let uvs = new Float32Array([


        1,0, 1,1, 0,0,
        0,0, 1,1, 0,1,

        0,0, 1,0, 0,1,
        0,1, 1,0, 1,1,

        0,0, 1,0, 0,1,
        1,0, 1,1, 0,1,

        0,0, 0,0, 0,0,
        0,0, 0,0, 0,0


    ])

    topGeo.setAttribute("position",new T.BufferAttribute(verts,3));
    topGeo.computeVertexNormals();

    topGeo.setAttribute('uv',new T.BufferAttribute(uvs, 2))

    let topMesh = new T.Mesh(topGeo, new T.MeshStandardMaterial({color: "white", map:windowTexture}))
    topMesh.translateX(-.45)
    topMesh.translateY(.45)
    topMesh.translateZ(.15)
    topMesh.scale.set(.9,.7,.6)
 

    // add tires

    let tireGeometry = new T.CylinderGeometry( 20, 20, 10, 32 );


    let tireMaterial = new T.MeshStandardMaterial( {color: "black"} );

    let rimGeometry = new T.TorusGeometry( 10, 6, 16, 32 );

    let rimMaterial = new T.MeshStandardMaterial( { color: 0xaaaaaa } );


    let treadGeometry = new T.CylinderGeometry( 20, 20, 10, 32, 1, true );
   
    let treadTexture = new T.TextureLoader().load( "../../tarrazu/textures/tread.jpg" );
    treadTexture.wrapS = T.RepeatWrapping;
    treadTexture.wrapT = T.RepeatWrapping;
    treadTexture.repeat.set( 4, 1 );
    let treadMaterial = new T.MeshStandardMaterial( {  map: treadTexture} );

    let positions = [{x: -.8, z: -1}, {x: -.7, z: .75}, {x: .8, z: -1}, {x: .7, z: .75}]
    let tireMeshes = [];
    let rimMeshes = [];
    let treadMeshes = [];

    for (let i = 0; i < 4; ++i) {

        rimMeshes[i] = new T.Mesh( rimGeometry, rimMaterial );
        rimMeshes[i].rotateX(Math.PI/2)

        treadMeshes[i] = new T.Mesh( treadGeometry, treadMaterial );

        tireMeshes[i] = new T.Mesh( tireGeometry, tireMaterial );
        tireMeshes[i].position.x = positions[i].x;
        tireMeshes[i].position.y = .25;
        tireMeshes[i].position.z = positions[i].z;

        tireMeshes[i].add( rimMeshes[i] );
        tireMeshes[i].add( treadMeshes[i] );
        tireMeshes[i].rotateZ(Math.PI/2)
        tireMeshes[i].scale.set(.015,.035,.015)

        group.add(tireMeshes[i]);

    }

    group.add(bodyGroup);
    group.add(headGroup)
    
    

    headGroup.add(frontMesh);
    headGroup.add(topMesh)
    headGroup.translateZ(.8)
    headGroup.translateY(.7)
    headGroup.scale.set(1.8,1,1)

    bodyGroup.add(bodyMesh)
    bodyGroup.add(backMesh)
    bodyGroup.scale.set(1,1,.8)
    bodyGroup.translateZ(-.9)
    bodyGroup.translateY(.2)
    bodyGroup.scale.set(1.8,1,1)
    let rotateGroup = new T.Group();
    
    group.add(rotateGroup);
    rotateGroup.add(backMesh);
    rotateGroup.position.set(0,.2,-1.8)
    backMesh.translateZ(1)
    backMesh.translateY(0)
    backMesh.scale.set(1.8,1,1)

    group.scale.set(.8,.8,.8)
    
    

    let pos = road.eval(0);
    group.position.set(pos[0], pos[1], pos[2]);

    super(`Truck-${truckobjsctr++}`, group);

    this.group = group;
    this.u = uStart;
    this.road = road;
    this.direction = new T.Vector3();
    this.rotateGroup = rotateGroup;
    this.t = 0.0;
    this.sign = 1;
  }


  update(paramValues) {
    this.group.position.x = paramValues[0];
    this.group.position.y = paramValues[1];
    this.group.position.z = paramValues[2];
    this.group.rotation.y = paramValues[3];
    
  }
  stepWorld(delta, timeOfDay) {

    if (Math.abs(this.u - 0.235) < .001) {
      
      
      
      if (this.t > .14) {

       this.sign = -1;
      }

      this.t += (delta / 9000) * this.sign;
      
      //console.log(this.t)
      if (this.t < 0.0) {
        this.t = 0.0;
        this.sign = 1;
      }
      else {
        this.rotateBack(this.u);
        return;
      }
      
    }
    this.u += (delta / 9000);
    if (this.u > 1) this.u = 0;

    this.road.curve.getTangentAt(this.u, this.direction);

    let pos = this.road.eval(this.u);

  
    this.update([pos.x,pos.y + .1,pos.z, Math.atan2(this.direction.x, this.direction.z)])
  

  }
  rotateBack(t) {
    
    this.rotateGroup.rotateX(this.sign * -.01 * Math.PI/2)

  }
}
