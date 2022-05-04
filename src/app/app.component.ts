import { OnInit, OnDestroy, Inject, Component } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { GiphyServiceApi } from './services/api/giphy/index.service';
import { GIPHY_SERVICE_API_TOKEN } from './services/keys';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  //#region Props
  public title = 'piexchange-assignment';

  // List trending
  public list!: Observable<any[]>;

  // Create subcription for pages
  private _subscription: Subscription = new Subscription();
  //#endregion

  //#region Constructor
  public constructor(
    @Inject(GIPHY_SERVICE_API_TOKEN) public giphyServiceApi: GiphyServiceApi,
    private dbService: NgxIndexedDBService
  ) {}
  //#endregion

  //#region Methods
  public ngOnInit(): void {
    this.list = this.dbService.getAll('gif');
    
    const getTrendingGiphiesSubscription = this.dbService
      .getAll('gif')
      .pipe(
        mergeMap((gifs: any) => {
          if (gifs && gifs.length) {
            return of(null);
          }

          return this.giphyServiceApi.getTrendingGiphies(25, 'g');
        }),
        mergeMap((response) => {
          if (!response || !response.data) {
            return of(null);
          }

          const gifsList =
            response?.data?.map((gif: any) => {
              const {
                id,
                images,
                import_datetime,
                trending_datetime,
                rating,
                title,
                user,
              } = gif;
              return {
                id,
                images,
                import_datetime,
                trending_datetime,
                rating,
                title,
                user,
              };
            }) || [];
          return this.dbService.bulkAdd('gif', gifsList);
        })
      )
      .subscribe(() => {
      });

    this._subscription.add(getTrendingGiphiesSubscription);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }

    return;
  }
  //#endregion
}
