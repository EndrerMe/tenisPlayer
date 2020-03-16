// Vendors
import * as THREE from 'three';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MeshService {

    public addFloor(scene): void {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('./../../../assets/2D/char_platform.png')
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 1,
            shininess: 0,
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
        floor.receiveShadow = true;
        floor.position.y = -11.5;
        scene.add(floor);
    }

}