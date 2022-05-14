import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  //#region Props

  // Input props
  public isVisible!: boolean;

  // Files uploaded
  public filesUploaded!: FileList;
  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  // Set modal visible
  public setModalVisible(visible: boolean): void {
    this.isVisible = visible;
    return;
  }

  // Handle files input
  public handleFileInput(target: EventTarget | null | undefined) {
    const targetInput = target as any;
    this.filesUploaded = targetInput?.files as FileList;

    const reader = new FileReader();

    for (let i = 0; i < this.filesUploaded.length; i++) {
      reader.readAsDataURL(this.filesUploaded[i]);
      reader.onload = (_event) => {
        this.imgURL = reader.result as string;
      };
    }
    return;
  }
  //#endregion
}
