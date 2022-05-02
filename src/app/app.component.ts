import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GiphyServiceApi } from 'src/services/api/giphy/index.service';
import { GIPHY_SERVICE_API_TOKEN } from 'src/services/keys';
import { renderGrid } from '@giphy/js-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { throttle } from 'throttle-debounce';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  //#region Props
  public title = 'piexchange-assignment';

  // Create subcription for pages
  private _subscription: Subscription = new Subscription();
  //#endregion

  //#region Constructor
  public constructor(
    @Inject(GIPHY_SERVICE_API_TOKEN) public giphyServiceApi: GiphyServiceApi
  ) {}
  //#endregion

  //#region Methods
  public ngOnInit(): void {
    const gf = new GiphyFetch(environment.giphyApiKey);
    // create a fetch gifs function that takes an offset
    // this will allow the grid to paginate as the user scrolls
    const fetchGifs = (offset: number) => {
      // use whatever end point you want,
      // but be sure to pass offset to paginate correctly
      return gf.trending({ offset, limit: 25 });
    };

    // Creating a grid with window resizing and remove-ability
    const makeGrid = (targetEl: HTMLElement) => {
      const render = () => {
        // here is the @giphy/js-components import
        return renderGrid(
          {
            width: targetEl.clientWidth,
            fetchGifs,
            columns: targetEl.clientWidth < 500 ? 2 : 3,
            gutter: 6,
          },
          targetEl
        );
      };
      const resizeRender = throttle(500, render);
      window.addEventListener('resize', resizeRender, false);
      const remove = render();
      return {
        remove: () => {
          remove();
          window.removeEventListener('resize', resizeRender, false);
        },
      };
    };

    // Instantiate
    const grid = makeGrid(document.querySelector('.grid') as HTMLElement);
    const getTrendingGiphiesSubscription = this.giphyServiceApi
      .getTrendingGiphies(25, 'g')
      .subscribe();

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
