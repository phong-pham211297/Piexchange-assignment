import { TemplateRef } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
})
export class GifComponent implements OnInit {
  //#region Props

  // Input gif
  @Input('gif') public gif: any;

  // Input styles
  @Input('styles') public styles: any;

  // Is loading
  public isLoading: boolean = true;

  // Is loading detail
  public isDetailLoading: boolean = true;

  // Is modal visible
  public isModalVisible: boolean = false;

  // Is profile image loading
  public isImageProfileLoading: boolean = true;
  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  // On image loading
  public onImageLoad(): void {
    this.isLoading = false;
    return;
  }

  public onProfileImageLoad(): void {
    this.isImageProfileLoading = false;
    return;
  }

  // On image loading
  public onImageDetailLoad(): void {
    this.isDetailLoading = false;
    return;
  }

  // Set modal visible
  public setModalVisible(visible: boolean): void {
    this.isModalVisible = visible;
    return;
  }

  //#endregion
}
