import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
})
export class AppModule {
  constructor(private injector : Injector){
    const el = createCustomElement(GalleryComponent, {injector : this.injector});
    customElements.define('widget-viveusa', el);
  }

  ngDoBootstrap(){}
}
