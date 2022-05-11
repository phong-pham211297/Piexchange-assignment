import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //#region Props

  // Key word emitter
  @Output() keywordEmitter = new EventEmitter<string>();

  // Keyword
  public keyword: string = '';

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  public onSearch(): void {
    this.keywordEmitter.emit(this.keyword);
  }

  //#endregion
}
