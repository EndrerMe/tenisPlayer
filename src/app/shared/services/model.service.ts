// Vendors
import * as THREE from 'three';
import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Subject } from 'rxjs';

// Services
import { EventService, TextureService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root' })
export class ModelService {

    public mixer = new Subject<THREE.AnimationMixer>();
    private currentAnimNumber: number = 0;
    private animations: string[] = [
        'main_menu_idle_type_1',
        'main_menu_idle_type_2',
        'main_menu_idle_type_3',
        'gameplay_idle',
        'steps_side_to_side',
    ]
    private model;
    public changedThing = new Subject();

    constructor(
        private eventService: EventService,
        private textureService: TextureService
    ) {}

    public loadModel(scene, renderer): void {
        const modelPath = './../../../assets/3D/GLTF_Tennis_Player/Main_characters_all_anims.gltf';
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            this.model = gltf.scene;
            const animation = gltf.animations;            
            this.model.children.forEach((element, index) => {
                if (element.name === 'by') {
                    element.visible = false;
                }
            });
            this.model.traverse((o: any) => {
                if (o.name.match(/.*Hat.*/)) {
                    o.visible = false;
                }

                if (o.name.match(/.*Hair.*/) && o.name !== 'Girl_Hair_Cut_01') {
                    o.visible = false;
                }

                if (o.name.match(/.*Skirt.*/) && o.name !== 'Girl_Skirt_01') {
                    o.visible = false;
                }

                if (o.name.match(/.*Shirt.*/) && o.name !== 'Girl_Shirt_01') {
                    o.visible = false;
                }

                if (o.name.match(/.*Socks.*/) && o.name !== 'Girl_Socks') {
                    o.visible = false;
                }

                if (o.name.match(/.*Shorts.*/) && o.name !== 'Girl_Shorts_01') {
                    o.visible = false;
                }

                if (o.name.match(/.*Shoes.*/) && o.name !== 'Girl_Shoes_02') {
                    o.visible = false;
                }

            });

            this.model.scale.set(.1, .1, .1);
            this.model.position.y = -11;

            scene.add(this.model);

            const mixer = new THREE.AnimationMixer(this.model);
            let idleAnim = THREE.AnimationClip.findByName(animation, this.animations[this.currentAnimNumber]);
            let idle = mixer.clipAction(idleAnim);
            idle.play();
            this.mixer.next(mixer);
            this.textureService.getTextureShirt();
            this.eventService.initEvents(renderer);

            this.eventService.eventData.subscribe((res: {type: string, data?: THREE.Quaternion}) => {

                switch(res.type) {
                    case 'rotate':
                        this.model.quaternion.multiplyQuaternions(res.data, this.model.quaternion);
                        break
                    case 'newAnim':
                        this.currentAnimNumber = Math.floor(Math.random() * (this.animations.length - 0) + 0);
                        idle.stop()
                        idleAnim = THREE.AnimationClip.findByName(animation, this.animations[this.currentAnimNumber]);
                        idle = mixer.clipAction(idleAnim);
                        idle.play();
                        this.mixer.next(mixer);
                        break
                    case 'defaultPosition':
                        this.model.quaternion.set(0, 0, 0, 1);
                        break
                }
            })

            this.changedThing.subscribe((res: {type: string, data: any}) => {
                this.model.traverse((o: any) => {
                    if (o.name === res.type && res.type === 'Girl_Shirt_01') {
                        o.material.map = res.data;
                    }

                    if (res.type === 'Girl_Shorts_01' && o.name === 'Girl_Skirt_01') {
                        o.visible = false;
                    }

                    if (o.name === res.type && res.type === 'Girl_Shorts_01') {
                        o.material.map = res.data;
                    }

                    if (res.type === 'Girl_Hair_Cut_01' && o.name === res.type) {
                        o.material.map = res.data;
                    }
                })
            })
        },
        undefined,
        (error) => {
            console.log(error)
        })

    }
}