import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents :  [
    GalleryComponent
 ]
})
export class AppModule {
  constructor(private injector : Injector){
    const el = createCustomElement(GalleryComponent, {injector : this.injector});
    customElements.define('gallery-feed', el);
  }

  ngDoBootstrap(){}
}
