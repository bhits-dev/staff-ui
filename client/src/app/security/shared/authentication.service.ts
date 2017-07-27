import {Injectable} from "@angular/core";
import {ApiUrlService} from "app/shared/api-url.service";
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "app/shared/exception.service";
import {Observable} from "rxjs";
import {AuthorizationResponse} from "app/security/shared/authorization-response.model";
import {UserInfoResponse} from "./user-info-response.model";
import {TokenService} from "./token.service";
import {UtilityService} from "../../shared/utility.service";
import {GlobalEventManagementService} from "../../core/global-event-management.service";
import {Profile} from "../../core/profile.model";
import {ProfileService} from "./profile.service";
@Injectable()
export class AuthenticationService {
  //Todo: get from configuration
  private AUTHORIZATION_HEADER: string = 'c3RhZmYtdWk6Y2hhbmdlaXQ=';

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private globalEventManagementService: GlobalEventManagementService,
              private http: Http,
              private profileService: ProfileService,
              private tokenService: TokenService,
              private utilityService: UtilityService) {
  }

  public login(username: string, password: string): Observable<AuthorizationResponse> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    params.set('grant_type', 'password');
    params.set('response_type', 'token');

    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', 'Basic '.concat(this.AUTHORIZATION_HEADER));

    return this.http.post(this.apiUrlService.getUaaTokenUrl(), params, {headers: headers})
      .map((resp: Response) => <AuthorizationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public onLoggedIn(response: AuthorizationResponse): void {
    this.tokenService.setOauthToken(response);
  }

  public storeTokenInSessionStorage(response: AuthorizationResponse): void {
    this.tokenService.setOauthToken(response);
  }

  public logout(): void {
    this.globalEventManagementService.setShowHeader(false);
    this.clearSessionStorgeAndRedirectToLogin();
  }

  private clearSessionStorgeAndRedirectToLogin(){
    let masterUiLoginUrl = this.tokenService.getMasterUiLoginUrl();
    sessionStorage.clear();
    if(masterUiLoginUrl){
      this.utilityService.redirectInSameTab(masterUiLoginUrl);
    }else{
      this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
    }
  }
  public onGetUserProfileSuccess(profile: Profile) {
    this.globalEventManagementService.setProfile(profile);
    this.utilityService.navigateTo(this.apiUrlService.getHomeUrl());
  }

  public getUserProfile() {
    return this.http.get(this.apiUrlService.getUaaUserInfoUrl())
      .map((resp: Response) => <any>(resp.json()));
  }

  public getUserInfo(): Observable<UserInfoResponse> {
    //Todo: Get from ums
    return this.http.get(this.apiUrlService.getUaaUserInfoUrl())
      .map((resp: Response) => <UserInfoResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
