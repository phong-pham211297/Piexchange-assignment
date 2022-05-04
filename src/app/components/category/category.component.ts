import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  //#region Props

  // Input category
  @Input('category') public category: any;

  // Input category title
  @Input('category-icon') public categoryIcon!: HTMLElement;

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  //#endregion
}
