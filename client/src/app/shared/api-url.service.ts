import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrlService {
  private urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["userListUrl", "/users"],

      // External api Url maps
      //Todo: Change to correct url
      ["UmsBaseUrl", "http://localhost:9999/ums"],
      ["uaaTokenUrl", "/uaa/oauth/token"],
      ["uaaUserInfoUrl", "/uaa/userinfo"]
    ]
  );

  constructor() {
  }

  getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  getHomeUrl(): string {
    return this.urls.get('homeUrl');
  }

  getUserListUrl(): string {
    return this.urls.get('userListUrl');
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

  getUaaTokenUrl(): string {
    return this.urls.get('uaaTokenUrl');
  }

  getUaaUserInfoUrl(): string {
    return this.urls.get('uaaUserInfoUrl');
  }
}
