import { UserProfileService } from './../../services/user-profile.service';
import { UtilityService } from './../../services/utility.service';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { ToastrService } from 'ngx-toastr';

enum FormType {
  LOGIN,
  SIGNUP
}

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  signupForm: FormGroup;

  loginFormIsSubmitted = false;
  signupFormIsSubmitted = false;
  isMailActive = false;
  userNotFound = false;
  @Input() formType: FormType;
  @Output() closeCard = new EventEmitter();

  listeners = [];

  monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  countries = [
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'AndorrA', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote D\'Ivoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: 'Lao People\'S Democratic Republic', code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russian Federation', code: 'RU'},
    {name: 'RWANDA', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Viet Nam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'}
  ];
  loginStatus = true;
  forgetStatus = false;
  emailForm: FormGroup;
  emailFormIsSubmitted = false;
  constructor(private authService: AuthService, private utilityService: UtilityService,
      public userProfileService: UserProfileService, private toastr: ToastrService
    ) {
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    });

    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9][A-Za-z0-9 ]\*[A-Za-z0-9]\*$')]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required, Validators.pattern(/^(\d){0,2}$/)]),
      day: new FormControl('', [Validators.required, Validators.pattern(/^(\d){0,2}$/)]),
      year: new FormControl('', [Validators.required, Validators.pattern(/^(\d){4}$/)])
    });

    this.listeners.push(document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    }));
  }

  ngOnDestroy() {
    this.listeners.forEach(e => {
      document.removeEventListener('keydown', e);
    });
  }

  get loginControls() {
    return this.loginForm.controls;
  }
  get emailControls() {
    return this.emailForm.controls;
  }

  get signupControls() {
    return this.signupForm.controls;
  }

  close() {
    this.closeCard.emit('');
  }

  hasError(control: AbstractControl, error = null): boolean {
    const errors = control.errors;
    if (!error) {
      return errors ? true : false;
    }
    if (!errors) {
      return false;
    }
    return (error in errors);

  }

  signupError(control: AbstractControl, error = null) {
    if (!this.signupFormIsSubmitted) {
      return false;
    }
    return this.hasError(control, error);
  }

  loginError(control: AbstractControl, error = null) {
    if (!this.loginFormIsSubmitted) {
      return false;
    }
    return this.hasError(control, error);
  }
  emailError(control: AbstractControl, error = null) {
    if (!this.emailFormIsSubmitted) {
      return false;
    }
    return this.hasError(control, error);
  }

  dateHasError() {
    return this.signupError(
      this.signupControls.month as FormControl, 'required')
      ||
      this.signupError(
        this.signupControls.month as FormControl, 'pattern')
      ||
      this.signupError(this.signupControls.day as FormControl, 'required')
      ||
      this.signupError(
        this.signupControls.day as FormControl, 'pattern')
      ||
      this.signupError(this.signupControls.year as FormControl, 'required')
      ||
      this.signupError(
        this.signupControls.year as FormControl, 'pattern');
  }

  switchForm(type = null) {
    if (this.formType === FormType.LOGIN || type === 1) {
      this.formType = FormType.SIGNUP;
      this.loginFormIsSubmitted = false;
    } else if (type === null || type === 0) {
      this.formType = FormType.LOGIN;
      this.signupFormIsSubmitted = false;
    }
  }

  login() {
    this.loginFormIsSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = Object.assign(this.loginForm.value);
    if ((credentials.username as string).indexOf('@') > 1) {
      credentials.email = credentials.username;
      delete credentials.username;
    }
    this.authService.login(credentials).then((response: any) => {
      this.utilityService.toastr.success(response.message);
      this.authService.getLocalStorageData();
      this.authService.isLoggedIn();
      this.signupForm.reset();
      this.userProfileService.getUserProfile();
      this.close();
    }).catch(error => {
      console.log("errr",error);
      if (error.status === 422) {
        this.utilityService.handle422Error(error, this.loginForm as FormGroup);
        // check for dob error
        if ('email' in error.error.errors) {
          this.loginForm.controls.username.setErrors({ backend: error.error.errors.email });
        } else if (!('username' in error.error.errors)) {
          this.loginForm.controls.username.setErrors(null);
        } 
      }
    });
  }

  signup() {
    this.signupFormIsSubmitted = true;
    // if (this.signupForm.invalid) {
    //   return;
    // }
    const userData = this.signupForm.value;
    console.log(this.signupForm.value);
    if(userData['day'].length == 1) {
      userData['day'] = "0"+userData['day'];
    }
    console.log(userData);
    userData.dob = this.utilityService.makeDate(userData.day, userData.month, userData.year);
    delete userData.day;
    delete userData.month;
    delete userData.year;
    this.authService.register(userData).then((response: any) => {
      this.utilityService.toastr.success(response.message);
      this.signupForm.reset();
      this.switchForm();
      this.loginForm.patchValue({
        username: userData.email
      });
    }, error => {
      if (error.status === 422) {
        this.utilityService.handle422Error(error, this.signupForm);
        // check for dob error
        if ('dob' in error.error.errors) {
          this.signupForm.controls.month.setErrors({ pattern: 'Invalid Date' });
        } else {
          this.signupForm.controls.month.setErrors(null);
        }
      }
    });
  }

  forgetpassword() {
    this.loginStatus = false;
    this.forgetStatus = true;
  }

  sendForgetRequest(){
	this.userNotFound=false;
    console.log("callled send request");
    this.emailFormIsSubmitted=true;
    if(this.emailForm.invalid){
      console.log("invalid data");
      return;
    }
    let requset = Object.assign(this.emailForm.value);
    console.log("req",requset);
     this.authService.sendRequest(requset).then(result=>{
       console.log("result",result);
       //this.toastr.success("Please check your mail");
       this.isMailActive=true;
     }).catch(error => {
      if (error.status === 422) {
        this.utilityService.handle422Error(error, this.emailForm as FormGroup);
        // check for dob error
        console.log(error);
        if ('email' in error.error.errors) {
          //this.emailForm.controls.email.setErrors({ backend: error.error.errors.email });
          this.userNotFound=true;
        }
      }
    });;
  }
}
