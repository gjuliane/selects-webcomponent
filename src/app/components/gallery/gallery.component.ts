import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DrupalNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  _nodes: DrupalNode[] = [];

  get nodes(): DrupalNode[] {
    return this._nodes;
  }

  constructor(private nodeService: ApiService) { }

  ngOnInit(): void {
    this.nodeService.loadNodes().subscribe(nodes => this._nodes = nodes.nodes);
  }



}
