import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/index.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  //#region Props

  // Input categories
  @Input('categories') categories!: Category[];

  // Input should categories hide
  @Input('shouldCategoriesHide') shouldCategoriesHide!: boolean;
  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}
  //#endregion
}
