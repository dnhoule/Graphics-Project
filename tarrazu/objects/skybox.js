// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../../libs/CS559/inputHelpers.js";


export class SkyBox extends GrObject {

    constructor(world) {
        let group = new T.Group();
        
        

        let texture= new T.CubeTextureLoader()
        .setPath( '../../tarrazu/textures/' )
        .load( [
            'px.png',
            'nx.png',
            'py.png',
            'ny.png',
            'pz.png',
            'nz.png'
        ] );

        world.scene.background = texture;


        super("SkyBox", group)

    }

}

