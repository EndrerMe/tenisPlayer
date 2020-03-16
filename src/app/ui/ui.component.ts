// vendors
import { Component, OnInit } from '@angular/core';

// Services
import { TextureService, ModelService } from 'src/app/shared/services';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  public clothes;
  public color = 'rgb(1, 1, 1)';
  public currentHairColor = '#f15c13';
  public isShowHairPicker = false;

  constructor(
    private textureService: TextureService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.textureService.clothes.subscribe((res) => {
      this.clothes = res;
    })
  }

  public changeShirt(texture): void {
    this.modelService.changedThing.next({type: 'Girl_Shirt_01', data: texture});
  }

  public changeHairColor(): void {
    this.modelService.changedThing.next({type: 'Girl_Hair_Cut_01', data: this.color});
  }

  public changeShort(texture): void {
    this.modelService.changedThing.next({type: 'Girl_Shorts_01', data: texture})
  }

  public toggleHairPicker(): void {
    this.isShowHairPicker = !this.isShowHairPicker;
  }

  public changeHair(data): void {
    this.currentHairColor = data.color;
    this.modelService.changedThing.next({type: 'Girl_Hair_Cut_01', data: data.hair})
  }

}
