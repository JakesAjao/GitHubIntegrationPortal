export class EnvService {
  //https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() {
  }

}