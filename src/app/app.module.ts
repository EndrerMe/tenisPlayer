// Vendors
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from 'src/app/app.component';
import { EngineComponent } from 'src/app/engine/engine.component';
import { UiComponent } from 'src/app/ui/ui.component';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    UiComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }