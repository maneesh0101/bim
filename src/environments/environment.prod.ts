export const environment = {
  production: true,
  serviceUrl: 'http://10.10.232.232:8095/',
  webservices: {
    registerIfExist: 'http://10.10.232.232:8090/bimpaas/customeraccount/is_exist',
    registerUser: 'http://50.226.36.93/bimpaas/customer/',
    registerCcVerify: 'http://10.10.232.232:8096/bimpaas/creditcard/verify',
    verifyOtp: 'http://10.10.232.232:8094/bimpaas/otp/verify',
    login: 'http://10.10.232.232:8090/bimpaas/customeraccount/login',
    getCountries: 'http://10.10.232.55:8098/bimpaas/location/countries',
    getStates: 'http://10.10.232.55:8098/bimpaas/location/states',
  }
};