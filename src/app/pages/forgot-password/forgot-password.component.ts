import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss','../../../assets/sass/auth.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted =  false;

  constructor(private authService: AuthService,private toastService: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required,Validators.pattern(/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/)]
      }),
    });
  }

  get f(): any {
    return this.forgotPasswordForm.controls;
  }

  // Checks User Credentials
  onSubmit(){
    this.submitted = true;
    if (this.forgotPasswordForm.valid) {
      this.spinner.show();
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((res)=>{
        if(res.meta.code === 1){
          this.spinner.hide();
          this.toastService.success(res.meta.message);
        }
        else{
          this.spinner.hide();
          this.toastService.error(res.message);
        }
      },(err)=>{
        this.spinner.hide();
        this.toastService.error(err.name);
      })
    }
  }
}
