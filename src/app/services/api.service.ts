import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { DrupalNode, DrupalNodes } from '../interfaces/node.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  default: DrupalNode[] = [];

  loadNodes(): Observable<DrupalNode[]> {
    const url:string = `${this._apiUrl}/feeds/vive-usa/mundo`;
    return this.http.get<DrupalNodes>(url).pipe(
      map(response => {
        if (response.hasOwnProperty('nodes')) {
          return response.nodes;
        }
        return this.default;
      }),
      catchError( err => of(this.default))
    );
  }
}

