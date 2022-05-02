import { NgModule } from '@angular/core';
import { GiphyServiceApi } from './api/giphy/index.service';
import { GIPHY_SERVICE_API_TOKEN } from './keys';

@NgModule({
  declarations: [],
  imports: [],
  providers: [{ provide: GIPHY_SERVICE_API_TOKEN, useClass: GiphyServiceApi }],
  bootstrap: [],
})
export class ServiceModule {}
