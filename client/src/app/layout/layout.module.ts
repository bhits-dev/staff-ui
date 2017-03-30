import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {PageFooterComponent} from "./page-footer/page-footer.component";
import {PageContentComponent} from "./page-content/page-content.component";
import {LogoComponent} from "./logo/logo.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {MenuComponent} from "./menu/menu.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LogoComponent,
    MenuComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent,
    UserProfileComponent
  ],
  exports: [
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent
  ]
})
export class LayoutModule {
}
