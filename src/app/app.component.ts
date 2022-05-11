import {
  AfterViewInit,
  ElementRef,
  HostListener,
  TemplateRef,
} from '@angular/core';
import { OnInit, OnDestroy, Inject, Component, ViewChild } from '@angular/core';
import {
  Subscription,
  Observable,
  of,
  Subject,
  forkJoin,
  fromEvent,
} from 'rxjs';
import { GiphyServiceApi } from './services/api/giphy/index.service';
import { GIPHY_SERVICE_API_TOKEN } from './services/keys';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Category } from './models/category/index.model';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  //#region Props

  // Page title
  public title = 'piexchange-assignment';

  // @Viewchild
  @ViewChild('trendingIcon') trendingIconTemplate!: TemplateRef<any>;
  @ViewChild('artistIcon') artistIconTemplate!: TemplateRef<any>;
  @ViewChild('clipIcon') clipIconTemplate!: TemplateRef<any>;
  @ViewChild('storiesIcon') storiesIconTempalte!: TemplateRef<any>;
  @ViewChild('appWrapper') appWrapper!: ElementRef<any>;

  // Create subcription for pages
  private _subscription: Subscription = new Subscription();

  // Create subject for pages
  private _getCategoriesSubject: Subject<any> = new Subject();

  private _getCategoriesObservable$ = this._getCategoriesSubject.asObservable();

  // MOCK categories
  public categories: Category[] = [];

  // current page
  public currentSearchPage = 0;

  // Current keyword
  public currentKeyword = '';

  // searchedd gifs
  private _getSearchedGifsSubject: Subject<any[]> = new Subject<any[]>();
  public _getSearchedGifsSubject$: Observable<any> =
    this._getSearchedGifsSubject.asObservable(); //#endregion

  //#region Constructor
  public constructor(
    @Inject(GIPHY_SERVICE_API_TOKEN) public giphyServiceApi: GiphyServiceApi,
    private dbService: NgxIndexedDBService
  ) {}
  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  @HostListener('window:scroll', []) onWindowScroll() {
    console.log(
      window.scrollY + window.innerHeight,
      document.body.scrollHeight
    );
  }

  public ngAfterViewInit(): void {
    this.categories = [
      {
        name: 'trending',
        titleIcon: this.trendingIconTemplate,
        navigatorText: 'All the GIFs',
        gifs: [],
      },
      {
        name: 'artist',
        titleIcon: this.artistIconTemplate,
        navigatorText: 'All GIPHY Artists',
        gifs: [],
      },
      {
        name: 'game',
        titleIcon: this.storiesIconTempalte,
        navigatorText: 'All GIPHY Game',
        gifs: [],
      },
      {
        name: 'dog',
        titleIcon: this.clipIconTemplate,
        navigatorText: 'All GIPHY Dog',
        gifs: [],
      },
    ];

    this.getGiphies();
    this.checkGiphies();

    console.log(this.appWrapper);

    const appWrapperElement = this.appWrapper.nativeElement;

    fromEvent(window, 'scroll').pipe(
      tap(() => console.log('run here')),
      map(() => window!.scrollY),
      mergeMap(() => {
        return this.giphyServiceApi.searchGifAsync(
          this.currentKeyword,
          this.currentSearchPage * 25
        );
      }),
      tap((response) => {
        this.currentSearchPage++;
      })
    );
    return;
  }

  public getGiphies(): void {
    // Get giphies subscription
    const getGiphiesSubscription = this._getCategoriesObservable$
      .pipe(
        mergeMap((categories) => {
          return categories
            ? of(categories)
            : this.dbService.getAll('category');
        })
      )
      .subscribe((gifs) => {
        console.log('run here', gifs);
        this.categories = this.categories.map((category: Category) => {
          const result = cloneDeep(category);
          result.gifs = gifs.find(
            (gif: any) => gif?.name === category?.name
          )?.gifs;
          return result;
        });
      });

    this._subscription.add(getGiphiesSubscription);
  }

  public checkGiphies(): void {
    // Check giphies data subscription
    const checkGiphiesSubscription = this.dbService
      .getAll('category')
      .pipe(
        mergeMap((categories: any) => {
          if (categories && categories.length) {
            this._getCategoriesSubject.next(categories);
            return of(null);
          }

          return forkJoin({
            trending: this.giphyServiceApi.getTrendingGiphiesAsync(25, 'g'),
            game: this.giphyServiceApi.searchGifAsync('game'),
            artist: this.giphyServiceApi.searchGifAsync('artist'),
            dog: this.giphyServiceApi.searchGifAsync('dog'),
          });
        }),
        // @ts-ignore
        mergeMap((response) => {
          if (!response) {
            return of(null);
          }

          const categories = [] as any[];
          for (const [key, value] of Object.entries(response)) {
            const result = {} as { [key: string]: string };
            result.gifs =
              value?.data?.map((gif: any) => {
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
            result.name = key;

            categories.push(result);
          }

          return this.dbService
            .bulkAdd('category', categories)
            .pipe(tap(() => this._getCategoriesSubject.next()));
        })
      )
      .subscribe();

    this._subscription.add(checkGiphiesSubscription);
  }

  public searchKeyword(keyword: string): void {
    this.currentSearchPage = 0;
    this.currentKeyword = keyword;

    const searchGiphiesSubscription = this.giphyServiceApi.searchGifAsync(
      keyword,
      this.currentSearchPage * 25
    );
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }

    return;
  }
  //#endregion
}
