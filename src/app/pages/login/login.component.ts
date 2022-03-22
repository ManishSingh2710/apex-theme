import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../../assets/sass/auth.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted =  false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastrService, private spinner: NgxSpinnerService) {
    // this.router.navigate([]);
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['dashboard']);
    }
    this.loginForm = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required,Validators.pattern(/^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/)]
      }),
      'password': new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  changeVisibility(){
    this.showPassword = !this.showPassword;
  }

  // Checks User Credentials
  onLogin(){
    this.submitted = true;
    if (this.loginForm.valid) {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.authService.setToken('Admin_Token');
        this.router.navigate(['dashboard']);
      },2000)
      // this.authService.login(this.loginForm.value).subscribe(res =>{
      //   if(res.meta.code === 1){
      //     this.spinner.hide();
      //     this.authService.setUserDetails({
      //       admin_id: res.data.admin_id,
      //       first_name: res.data.first_name,
      //       last_name: res.data.last_name,
      //       email: res.data.email
      //     });
      //     this.authService.setToken(res.meta.token);
      //     this.router.navigate(['dashboard']);
      //   }
      //   else{
      //     this.spinner.hide();
      //     this.toastService.error(res.message)
      //   }
      // },(err)=>{
      //   this.spinner.hide();
      //   this.toastService.error(err.name)
      // });
    }
  }
}
