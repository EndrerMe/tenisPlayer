// Vendors
import * as THREE from 'three';
import { Injectable, ElementRef } from '@angular/core';

// Services
import { ModelService, LightService, MusicService, MeshService, AnimateService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root' })
export class EngineService {
  public canvas: HTMLCanvasElement;
  public scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private listener: THREE.AudioListener;

  constructor(
    private animateService: AnimateService,
    private modelService: ModelService,
    private lightService: LightService,
    private musicService: MusicService,
    private meshService: MeshService
    ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.scene = new THREE.Scene();
    this.initCamera();
    this.initRenderer();
    this.loadBackground();
    this.meshService.addFloor(this.scene);
    this.musicService.initMusic(this.camera);
    this.modelService.loadModel(this.scene, this.renderer);
    this.lightService.initLight(this.scene)

    this.animateService.animate(this.renderer, this.scene, this.camera);
  }

  private initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30 
    this.camera.position.x = 0;
    this.camera.position.y = -3;
  }

  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }


  private loadBackground(): void {
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load('./../../assets/2D/main_bg.png');
    this.scene.background = bgTexture;
  }
}
