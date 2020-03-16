// Vendors
import * as THREE from 'three';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LightService {

    public initLight(scene): void {
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(0, 0, 8);
        scene.add(dirLight);
    }

}