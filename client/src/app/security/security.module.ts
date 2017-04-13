import {NgModule} from "@angular/core";
import {routedComponents, SecurityRoutingModule} from "./security-routing.module";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationService} from "app/security/shared/authentication.service";
import {TokenService} from "./shared/token.service";
import {SessionStorageService} from "./shared/session-storage.service";
import {CanActivateAuthGuardService} from "./shared/can-activate-auth-guard.service";
import {AuthorizationService} from "app/security/shared/authorization.service";
import {CanDeactivateGuardService} from "./shared/can-deactivate-guard.service";
import {DeactivateDialogService} from "app/security/shared/deactivate-dialog.service";

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [routedComponents],
  providers: [
    AuthenticationService,
    AuthorizationService,
    CanActivateAuthGuardService,
    CanDeactivateGuardService,
    DeactivateDialogService,
    SessionStorageService,
    TokenService
  ]
})
export class SecurityModule {
}
