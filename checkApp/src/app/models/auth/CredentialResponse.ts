import { Authority } from './auth';

export class CredentialResponse {
  authenticated: boolean;
  name: string;
  authorities: Authority[];

  static convertToObj(obj: any): CredentialResponse {
    if(obj == null) {
      return null as any;
    }

    if(obj.errorStatus != undefined) {
      let resp = new CredentialResponse();
      resp.authenticated = false;

      return resp;
    }
    else {
      let resp = new CredentialResponse();
      resp.name = obj.name;
      resp.authenticated = obj.authenticated;
      resp.authorities = obj.authorities;

      return resp;
    }
  }
}
