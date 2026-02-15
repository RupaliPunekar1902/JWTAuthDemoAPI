import { Component } from '@angular/core';
import { JWTAuthService } from '../../Services/jwtauth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:any = {
  email: '',
  password: ''
};


   constructor(private jwtauth: JWTAuthService){}

 login(){
    console.log(this.user);   // 🔥 debug

    this.jwtauth.login(this.user)
      .subscribe((res:any)=>{
        console.log(res);     // 🔥 token check
        localStorage.setItem('token', res.token);
        alert("Login Success");
      },
      err=>{
        console.log(err);
        alert("Login Failed");
      });
  }
}
