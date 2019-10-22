// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serviceUrl: 'http://10.10.232.232:8095/',
  webservices: {
    registerIfExist: 'http://50.226.36.93/customeraccountservice/apis/bimpaas/customeraccount/is_exist',
    registerUser: 'http://50.226.36.93/bimpaas/customer/',
    registerCcVerify: 'http://50.226.36.93/creditcardservice/apis/bimpaas/creditcard/verify',
    verifyOtp: 'http://50.226.36.93/securitycodeservice/apis/bimpaas/otp/verify',
    login: 'http://50.226.36.93/customeraccountservice/apis/bimpaas/customeraccount/login',
    getCountries: 'http://50.226.36.93/countrystateservice/apis/bimpaas/location/countries',
    getStates: 'http://50.226.36.93/countrystateservice/apis/bimpaas/location/states',
  }
};