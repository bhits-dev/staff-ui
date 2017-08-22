import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "app/security/shared/authentication.service";
import {ProfileService} from "../shared/profile.service";
import {UtilityService} from "../../shared/utility.service";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {TranslateService} from "@ngx-translate/core";
import {UmsProfile} from "../shared/ums-profile.model";

@Component({
  selector: 'c2s-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private redirectUrl: string;
  public loginFrom: FormGroup;
  public passwordInputType: string = "password";
  public showBadCredentialError: boolean = false;
  public showAccountLockedError: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private profileService: ProfileService,
              private utilityService: UtilityService,
              private customTranslateService: CustomTranslateService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private formBuilder: FormBuilder) {
    // Set default language for login page
    const DEFAULT_LANGUAGE = "en";
    translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit() {
    // get redirect url from route parameters
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
    this.loginFrom = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login(): void {
    const formModel = this.loginFrom.value;
    const username: string = formModel.username;
    const password: string = formModel.password;
    this.authenticationService.login(username, password)
      .subscribe(
        (res) => {
          this.showBadCredentialError = false;
          this.showAccountLockedError = false;
          this.authenticationService.onLoggedIn(res);
          this.getUMSProfileAndSetDefaultLanguage();
        },
        (error) => {
          let message: string = error.json()['message'];
          if (this.authenticationService.isAccountLocked(message)) {
            this.showAccountLockedError = true;
            this.showBadCredentialError = false;
            console.log(message);
          } else if (this.authenticationService.isBadCredentials(message)) {
            this.showBadCredentialError = true;
            this.showAccountLockedError = false;
            console.log(message);
          }

        }
      );
  }

  public getUMSProfileAndSetDefaultLanguage(): void {
    this.profileService.getUMSProfile().subscribe(
      (profile: UmsProfile) => {
        let localesCode: string[] = this.utilityService.getSupportedLocaleCode(profile.supportedLocales);
        this.customTranslateService.addSupportedLanguages(localesCode);
        this.customTranslateService.setDefaultLanguage(profile.userLocale);
        this.profileService.setProfileInSessionStorage(profile);
        this.authenticationService.onGetUserProfileSuccess(this.redirectUrl);
      },
      () => this.authenticationService.onGetUserProfileFailure()
    )
  }

  public getInputType(inputType: string) {
    this.passwordInputType = inputType;
  }
}
