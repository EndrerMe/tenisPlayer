// Vendors
import * as THREE from 'three';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MusicService {

    public initMusic(camera): void {
        const listener = new THREE.AudioListener();
        camera.add(listener);
    
        const sound = new THREE.Audio(listener);
    
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load('./../../assets/sounds/Main_menu_musics_1.ogg', (buffer) => {
          sound.setBuffer( buffer );
          sound.setLoop( true );
          sound.setVolume(1);
          sound.play();
        })
    }

}