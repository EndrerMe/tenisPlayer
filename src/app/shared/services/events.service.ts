// Vendors
import * as THREE from 'three';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {

    private isDraging: boolean;
    public eventData = new Subject();
    private previousMousePosition: {x:number, y:number} = {
        x: 0,
        y: 0,
    }

    public initEvents(renderer: THREE.WebGLRenderer): void {
        renderer.domElement.addEventListener('dblclick', (e) => {
            this.eventData.next(
                {
                    type: 'newAnim'
                }
            )
        })

        renderer.domElement.addEventListener('mousedown', (e) => {
            this.isDraging = true;
        })

        renderer.domElement.addEventListener('mousemove', (e) => {
            let deltaMove = {
                x: e.offsetX - this.previousMousePosition.x,
                y: 0
            };

            if (this.isDraging) {
                this.eventData.next(
                    {
                        type: 'rotate',
                        data: new THREE.Quaternion()
                        .setFromEuler(new THREE.Euler(
                            this.toRadians(deltaMove.y * 1),
                            this.toRadians(deltaMove.x * 1),
                            0,
                            'XYZ'
                        ))
                    }
                )
            }

            this.previousMousePosition = {
                x: e.offsetX,
                y: e.offsetY
            };
        })

        renderer.domElement.addEventListener('mouseup', (e) => {
            this.isDraging = false;
            this.eventData.next({
                type: 'defaultPosition'
            });
        })
    }

    public toRadians(angle): number {
        return angle * (Math.PI / 180);
    }
    
    public toDegrees(angle): number {
        return angle * (180 / Math.PI);
    }

}