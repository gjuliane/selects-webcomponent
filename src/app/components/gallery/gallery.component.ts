import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DrupalNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-gallery',
  template: `
<section class="viveusa-feed" *ngIf="nodes.length > 0">
  <div class="main-title"><h4>{{title}}</h4></div>
  <div class="arrow-left" (click)="scrollLeft($event)"><</div>
  <div class="arrow-right" (click)="scrollRight($event)">></div>
  <div class="content" #wrapperContent>
    <div *ngFor="let node of nodes; let i = index;" class="item" #items>
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
    /* .content{
      display: flex;
      flex-flow: row nowrap;
      overflow-x: auto;
    }
    .item{
      flex: 1 1 auto;
    } */
  `]
})
export class GalleryComponent implements OnInit {
  @Input('title') title: string = '';
  @ViewChild('wrapperContent') wrapperContent!:ElementRef;
  @ViewChildren('items') items!:QueryList<ElementRef>;

  currentItem: number = 0;

  _nodes: DrupalNode[] = [];

  get nodes(): DrupalNode[] {
    return this._nodes;
  }

  constructor(private nodeService: ApiService) { }

  ngOnInit(): void {
    this.nodeService.loadNodes().subscribe(nodes => this._nodes = nodes);
  }

  scrollLeft(e:any) {
    this.decrementCurrentItem();
    const width = this.items.first.nativeElement.offsetWidth;
    this.wrapperContent.nativeElement.scrollLeft = width * this.currentItem;
  }

  scrollRight(e: any) {
    this.incrementCurrentItem();
    const width = this.items.first.nativeElement.offsetWidth;

    const viewPort = this.wrapperContent.nativeElement.offsetWidth;
    const runScroll = width * this.currentItem;
    const totalScrollScope = this.wrapperContent.nativeElement.scrollWidth // Stoping signal
    const stop = (this._nodes.length * width) - viewPort;
    // console.table({runScroll, totalScrollScope, viewPort, stop});
    if (runScroll < stop) {
      this.wrapperContent.nativeElement.scrollLeft = width * this.currentItem; // Scroll to next element
    } else {
      this.wrapperContent.nativeElement.scrollLeft = width * this._nodes.length; // Scroll max offset default
    }
  }

  incrementCurrentItem(){
    this.currentItem++;
    if (this.currentItem >= this._nodes.length-1) { // Last item doesn't count
      this.currentItem = this._nodes.length-1;
    }
  }
  decrementCurrentItem(){
    this.currentItem--;
    if (this.currentItem <= 0) {
      this.currentItem = 0;
    }
  }

}
