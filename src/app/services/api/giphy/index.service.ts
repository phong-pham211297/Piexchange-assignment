import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';

@Injectable()
export class GiphyServiceApi {
  //#region Props
  public GIPHY_API_KEY = `${environment.giphyApiKey}`;
  public GIPHY_API_URL = `${environment.giphyApiUrl}gifs/`;
  //#endregion

  //#region Constructor
  public constructor(public httpClient: HttpClient) {}
  //#endregion

  //#region Methods

  // Get trending giphies
  public getTrendingGiphiesAsync(limit: number, rating: string): Observable<any> {
    return this.httpClient.get<any>(`${this.GIPHY_API_URL}trending`, {
      params: {
        api_key: this.GIPHY_API_KEY as string,
        limit,
        rating,
      },
    });
  }

  // Get categories
  public getCategoriesAsync(): Observable<any> {
    return this.httpClient.get<any>(`${this.GIPHY_API_URL}categories`, {
      params: {
        api_key: this.GIPHY_API_KEY as string,
      },
    });
  }

  // Get random category
  public getGifRandomAsync(tag: string): Observable<any> {
    return this.httpClient.get<any>(`${this.GIPHY_API_URL}random`, {
      params: {
        api_key: this.GIPHY_API_KEY as string,
        tag,
      },
    });
  }

  // Get random category
  public searchGifAsync(keyword: string): Observable<any> {
    return this.httpClient.get<any>(`${this.GIPHY_API_URL}search`, {
      params: {
        api_key: this.GIPHY_API_KEY as string,
        q: keyword,
      },
    });
  }
  //#endregion
}
