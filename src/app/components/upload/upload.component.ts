import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  //#region Props

  // Upload event click emitter
  @Output() uploadEventEmitter = new EventEmitter<any>();

  // Input props
  public isVisible!: boolean;

  // Files uploaded
  public filesUploaded: any[] = [];

  // Create subcription for pages
  private _subscription: Subscription = new Subscription();
  //#endregion

  //#region Constructor
  public constructor(private dbService: NgxIndexedDBService) {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  // Set modal visible
  public setModalVisible(visible: boolean): void {
    if (!visible) {
      this.filesUploaded = [];
    }
    this.isVisible = visible;
    return;
  }

  // Handle files input
  public handleFileInput(target: EventTarget | null | undefined): void {
    const targetInput = target as any;
    const files = targetInput?.files as FileList;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (_event) => {
        this.filesUploaded.push(reader.result as string);
      };
      reader.readAsDataURL(files[i]);
    }
    return;
  }

  // Remove file click handler
  public removeFileClickHandler(event: any, index: number): void {
    event?.stopPropagation();

    this.filesUploaded.splice(index, 1);
    return;
  }

  // Upload
  public upload(): void {
    const myGifs = this.filesUploaded.map((gif) => {
      return { gif };
    });

    // @ts-ignore
    const updateCategory = this.dbService
      .bulkAdd('myGif', [...myGifs])
      .subscribe(() => {
        this.setModalVisible(false);
        this.uploadEventEmitter.emit();
        return;
      });

    this._subscription.add(updateCategory);
    return;
  }

  public ngOnDestroy(): void {
    this.filesUploaded = [];

    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
    return;
  }
  //#endregion
}
