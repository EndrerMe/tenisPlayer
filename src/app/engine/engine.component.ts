// vendors
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// Services
import { EngineService } from 'src/app/engine/engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) { }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
  }

}
