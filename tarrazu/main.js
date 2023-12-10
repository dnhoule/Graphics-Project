/*jshint esversion: 6 */
// @ts-check



import { House } from "./objects/house.js";
import { Mountains } from "./objects/mountains.js";
import { Road } from "./objects/road.js";
import { Truck } from "./objects/truck.js";
import { Coffee } from "./objects/coffee.js";
import { Roaster } from "./objects/roaster.js";
import {SkyBox} from "./objects/skybox.js"

export function main(world) {

    let mountains = new Mountains();
    let house1 = new House(2,1,2, [-10,.5,-15, -Math.PI/2]);
    let house2 = new House(1,1,1, [17,.5,11, Math.PI ]);
    let house3 = new House(1,1,1, [17,1,7, Math.PI ]);
    let road = new Road();
    let truck = new Truck(road, 0.0);

    let roaster = new Roaster(-12,.5,13);

    let skybox = new SkyBox(world);
    let plants = [];
    plants[0] = new Coffee([0,1,-10]);
    plants[1] = new Coffee([1,1,-10]);
    plants[2] = new Coffee([2,1,-10]);
    plants[3] = new Coffee([0,1,-12]);
    plants[4] = new Coffee([1,1,-12]);
    plants[5] = new Coffee([2,1,-12]);
    plants[6] = new Coffee([3,1,-12]);


    world.add(mountains);
    world.add(house1)
    world.add(house2)
    world.add(house3)
   world.add(road)
   world.add(truck)
   for (let i = 0; i < plants.length; ++i) {

      world.add(plants[i])

   }
      
    world.add(roaster)

    world.add(skybox)
    

}