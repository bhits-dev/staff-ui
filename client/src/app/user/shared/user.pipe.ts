import {Pipe, PipeTransform} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {User} from "./user.model";

type ArgType =
  "id"
  | "fullName"
  | "birthDate"
  | "genderCode"
  | "homePhone"
  | "workPhone"
  | "homeAddress"
  | "workAddress";

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: User, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "id":
          return value.id;
        case "fullName":
          return UserPipe.getName(value, 'firstName').concat(' ').concat(UserPipe.getName(value, 'middleName')).concat(' ').concat(UserPipe.getName(value, 'lastName'));
        case "birthDate":
          return value.birthDate;
        case "genderCode":
          return value.genderCode;
        case "homePhone":
          return value.homePhone;
        case "workPhone":
          return value.workPhone;
        case "homeAddress":
          const homeAddress = [];
          homeAddress.push(value.homeAddress.line1 || "");
          homeAddress.push(value.homeAddress.line2 || "");
          homeAddress.push(value.homeAddress.city || "");
          homeAddress.push(value.homeAddress.stateCode || "");
          homeAddress.push(this.utilityService.formatZipCode(value.homeAddress.postalCode || ""));
          homeAddress.push(value.homeAddress.countryCode || "");
          return homeAddress.filter(field => field !== "").join(", ");
        case "workAddress":
          const workAddress = [];
          workAddress.push(value.workAddress.line1 || "");
          workAddress.push(value.workAddress.line2 || "");
          workAddress.push(value.workAddress.city || "");
          workAddress.push(value.workAddress.stateCode || "");
          workAddress.push(this.utilityService.formatZipCode(value.workAddress.postalCode || ""));
          workAddress.push(value.workAddress.countryCode || "");
          return workAddress.filter(field => field !== "").join(", ");
      }
    }
    return null;
  }

  private static getName(user: User, key: string): string {
    if (user !== null && user[key]) {
      return user[key];
    }
    return ''
  }
}
