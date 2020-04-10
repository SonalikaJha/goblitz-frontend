import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { MustMatch } from './passwordValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  loginFormIsSubmitted = false;
  authFormType: number;
  isAuthFormVisible: boolean;

  constructor(private fb: FormBuilder, private route:ActivatedRoute,private router:Router,private browseService: BrowseService, private toastr: ToastrService){}
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
       },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get confirmPwd(){
    return this.loginForm.get('confirmPassword');
  }
  get loginControls() {
    return this.loginForm.controls;
  }
  // matchPassword(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: confirmPassword } = formGroup.get('confirmpassword');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }
  // close() {
  //   this.closeCard.emit('');
  // }
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
  loginError(control: AbstractControl, error = null) {
    if (!this.loginFormIsSubmitted) {
      return false;
    }
    return this.hasError(control, error);
  }

  login(){
    console.log("called");
    this.loginFormIsSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }

    let token = this.route.snapshot.queryParamMap.get("token");
    console.log("token",token);
    let password= Object.assign(this.loginForm.value);
    this.browseService.resetPassword({"password":password.password,"token":token}).then(res=>{
      console.log(res);
      this.router.navigate(['']);
      this.toastr.success("Password reset successfully!");
      return this.showAuthForm(0);
    }).catch(err=>{
      this.isAuthFormVisible=false;
      console.log(err);
    });

  }

  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }


}
