// vendors
import * as THREE from 'three';
import { Injectable, NgZone } from '@angular/core';

// Services
import { ModelService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root' })
export class AnimateService {
    private mixer: THREE.AnimationMixer;
    private clock = new THREE.Clock();

    constructor(
        private ngZone: NgZone,
        private modelService: ModelService
        ) {}

    public animate(renderer, scene, camera): void {
        this.modelService.mixer.subscribe((res) => {
            this.mixer = res;
        })

        this.ngZone.runOutsideAngular(() => {
            if (document.readyState !== 'loading') {
                this.render(renderer, scene, camera);
            } else {
            window.addEventListener('DOMContentLoaded', () => {
                this.render(renderer, scene, camera);
            });
            }

            window.addEventListener('resize', () => {
                this.resize(renderer, camera);
            });
        });
    }
    
    private render(renderer, scene, camera): void {
        requestAnimationFrame(() => {
            this.render(renderer, scene, camera);
        });

        if (this.mixer) {
            this.mixer.update(this.clock.getDelta());
        }

        renderer.render(scene, camera);
    }

    public resize(renderer, camera): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
    
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    
        renderer.setSize( width, height );
    }

}