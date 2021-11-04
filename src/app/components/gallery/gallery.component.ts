import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DrupalNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-gallery',
  template: `
<section class="viveusa-feed">
  <div class="main-title"><h4>ViveUSA Feed</h4></div>
  <div class="content">
    <div *ngFor="let node of nodes;" class="item">
      <div class="title">
        <h3><a href="{{node.url}}" target="_blank">{{node.title}}</a></h3>
      </div>
      <div class="picture">
        <a href="{{node.url}}" target="_blank">
          <picture *ngIf="node.images">
            <source media="(max-width:576px)"  srcset="{{node.images.mobile}}">
            <source media="(max-width:768px)"  srcset="{{node.images.ipad}}">
            <source media="(max-width:1100px)" srcset="{{node.images.desktop}}">
            <img class="image"
              src="{{node.images.desktop}}"
              alt="{{node.images.alt}}"
              loading="lazy">
          </picture>
        </a>
      </div>
    </div>
  </div>
</section>
  `,
  styles: []
})
export class GalleryComponent implements OnInit {

  _nodes: DrupalNode[] = [];

  get nodes(): DrupalNode[] {
    return this._nodes;
  }

  constructor(private nodeService: ApiService) { }

  ngOnInit(): void {
    this.nodeService.loadNodes().subscribe(nodes => this._nodes = nodes);
  }

}
