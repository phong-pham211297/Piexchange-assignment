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

  // Upload event click emitter
  @Output() uploadEventClickEmitter = new EventEmitter<any>();

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
    return;
  }

  public handleUploadClick(): void {
    this.uploadEventClickEmitter.emit();
    return;
  }

  //#endregion
}
