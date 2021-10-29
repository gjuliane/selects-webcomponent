import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { DrupalNode, DrupalNodes } from '../interfaces/node.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  default: DrupalNodes = {
    nodes: []
  }

  loadNodes(): Observable<DrupalNodes> {
    const url:string = `${this._apiUrl}/feeds/vive-usa/mundo`;
    console.log(url);
    return this.http.get<DrupalNodes>(url).pipe(
      catchError( err => of(this.default))
    );
  }
}

