import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.scss'],
  providers:  [ NavbarComponent ]
})
export class DeactivateAccountComponent implements OnInit {
  emailForm: FormGroup;
  emailFormIsSubmitted = false;
  incurrectPassword = false;
  constructor(private utilityService: UtilityService,private navbar: NavbarComponent,
    private userProfileService: UserProfileService, private toastr: ToastrService
    ) { }

  ngOnInit() {

    this.emailForm = new FormGroup({
      password: new FormControl('', [Validators.required])
    });
  }

  get emailControls() {
    return this.emailForm.controls;
  }

  emailError(control: AbstractControl, error = null) {
    if (!this.emailFormIsSubmitted) {
      return false;
    }
    return this.hasError(control, error);
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

  submit(){
    this.incurrectPassword=false;
      console.log("callled send request");
      this.emailFormIsSubmitted=true;
      if(this.emailForm.invalid){
        console.log("invalid data");
        return;
      }
      let requset = Object.assign(this.emailForm.value);
      console.log("req",requset);
       this.userProfileService.disableAccount(requset).then(result=>{
         console.log("result",result);
         let obj:any=result;
         this.toastr.success(obj.message);
        // this.isMailActive=true;
        this.navbar.logout();
       }).catch(error => {
        if (error.status === 422) {
          this.utilityService.handle422Error(error, this.emailForm as FormGroup);
          // check for dob error
          console.log(error);
          if ('password' in error.error.errors) {
            this.emailForm.controls.email.setErrors({ backend: error.error.errors.password });
            this.incurrectPassword=true;
          }
        }
      });;
    }

}
