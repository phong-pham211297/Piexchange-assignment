import { Category } from 'src/app/models/category/index.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnChanges {
  //#region Props

  // Input category
  @Input('category') public category!: Category;

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  public ngOnChanges(): void {
  }
  //#endregion
}
