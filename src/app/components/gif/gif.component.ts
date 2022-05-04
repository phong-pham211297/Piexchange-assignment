import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
})
export class GifComponent implements OnInit {
  //#region Props

  // Input gif
  @Input('gif') public gif: any;
  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  //#endregion
}
