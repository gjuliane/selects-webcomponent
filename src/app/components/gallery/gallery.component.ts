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
  styles: [`
  .gl-Grid_7nota .widget-viveusa .viveusa-feed .content {
    max-width: 577px;
}
.gl-Grid_9amplia .widget-viveusa .viveusa-feed .content {
    max-width: 760px;
}
.gl-Grid_9 .widget-viveusa .viveusa-feed .content {
    max-width: 805px;
}
.gl-Grid_12 .widget-viveusa .viveusa-feed .content {
    max-width: 1080px;
}
.widget-viveusa {
    margin-bottom: 15px;
    width: 100%;
}
.widget-viveusa .viveusa-feed {
    font-family: "Work Sans", sans-serif;
}
.widget-viveusa .viveusa-feed .main-title {
    background: #ed313b;
    background: -moz-linear-gradient(left, #ed313b 0%, #ef4843 51%, #f05b50 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, #ed313b), color-stop(51%, #ef4843), color-stop(100%, #f05b50));
    background: -webkit-linear-gradient(left, #ed313b 0%, #ef4843 51%, #f05b50 100%);
    background: -o-linear-gradient(left, #ed313b 0%, #ef4843 51%, #f05b50 100%);
    background: -ms-linear-gradient(left, #ed313b 0%, #ef4843 51%, #f05b50 100%);
    background: linear-gradient(to right, #ed313b 0%, #ef4843 51%, #f05b50 100%);
}
.widget-viveusa .viveusa-feed .main-title h4 {
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 15px;
    padding: 5px 10px;
}
.widget-viveusa .viveusa-feed .main-title h4 a {
    color: #fff;
}
.widget-viveusa .viveusa-feed .content {
    display: inline-flex;
    grid-gap: 10px;
    overflow-x: scroll;
    width: 100%;
}
.widget-viveusa .viveusa-feed .content::-webkit-scrollbar {
    height: 9px;
    width: 9px;
}
.widget-viveusa .viveusa-feed .content::-webkit-scrollbar-thumb {
    background: #b9b9b9;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
.widget-viveusa .viveusa-feed .content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-top-right-radius: 9px;
    border-bottom-right-radius: 9px;
}
.widget-viveusa .viveusa-feed .content .item {
    display: -ms-grid;
    display: grid;
}
.widget-viveusa .viveusa-feed .content .item .title {
    color: #333;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    height: 73px;
    margin-bottom: 5px;
    overflow: hidden;
    order: 2;
}
.widget-viveusa .viveusa-feed .content .item .title h3 {
    margin: 0 0 10px;
    padding: 0;
}
.widget-viveusa .viveusa-feed .content .item .title h3 a {
    color: #333;
    font-weight: 400;
    text-decoration: none;
}
.widget-viveusa .viveusa-feed .content .item .picture {
    order: 1;
}
.widget-viveusa .viveusa-feed .content .item .picture picture {
    width: 100%;
}
@media screen and (max-width: 769px), (max-width: 1100px) and (orientation: portrait) {
    .gl-Grid_7nota .widget-viveusa .viveusa-feed .content {
        max-width: 100%;
   }
    .gl-Grid_9amplia .widget-viveusa .viveusa-feed .content {
        max-width: 100%;
   }
    .gl-Grid_9 .widget-viveusa .viveusa-feed .content {
        max-width: 100%;
   }
    .gl-Grid_12 .widget-viveusa .viveusa-feed .content {
        max-width: 100%;
   }
}
  `
  ]
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
