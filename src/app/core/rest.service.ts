import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ClConfig} from '../config';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private URL: string = ClConfig.storage.storageKey;

  constructor() {
  }

  public get(url: string = this.URL): string {
    return localStorage.getItem(url);
  }

  public put(data: string, url: string = this.URL): void {
    localStorage.setItem(url, data);
  }
}
