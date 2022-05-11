import { TemplateRef } from "@angular/core";

export interface Category {
  titleIcon: TemplateRef<any>;
  name: string;
  navigatorText: string;
  gifs: any[];
}
