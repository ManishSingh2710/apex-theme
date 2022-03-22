import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss','../../../assets/sass/auth.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted =  false;
  showNewPassword = false;
  showConfirmPassword = false;
  userToken = null;
  userEmail = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastService: ToastrService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(params){
        this.userEmail = params.email;
        this.userToken = params.token;
      }
    });

    this.resetPasswordForm =  this.formBuilder.group({
          newPassword: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(8)],
          }),
          confirmPassword: new FormControl(null, {
            validators: [Validators.required],
          }),
        },
        {
          validator: [this.passwordValidations] // your validation method
        }
    );
  }

  get f(): any {
    return this.resetPasswordForm.controls;
  }

  changeVisibility(value){
    if(value){
      this.showConfirmPassword = !this.showConfirmPassword;
    }
    else{
      this.showNewPassword = !this.showNewPassword;
    }
  }

  passwordValidations(AC: AbstractControl) {
    const password = AC.get('newPassword').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (AC.get('confirmPassword').errors && !AC.get('confirmPassword').errors.NewMatchPassword) {
      return;
    }
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({NewMatchPassword: true});
    } else {
      AC.get('confirmPassword').setErrors({NewMatchPassword: false});
    }
  }

  // Checks User Credentials
  onSubmit(){
    this.submitted = true;
    if (this.f.confirmPassword.value === this.f.newPassword.value) {
      this.spinner.show();
      const resetData = {
        verification_token: this.userToken,
        email: this.userEmail,
        password: this.f.confirmPassword.value
      }
      this.authService.resetPassword(resetData).subscribe((res)=>{
        if(res.meta.code === 1){
          this.spinner.hide();
          this.toastService.success(res.meta.message);
          this.router.navigate(['login']);
        }
        else{
          this.spinner.hide();
          this.toastService.error(res.message)
        }
      },(err)=>{
        this.spinner.hide();
        this.toastService.error(err.name);
      })
    }
  }
}
