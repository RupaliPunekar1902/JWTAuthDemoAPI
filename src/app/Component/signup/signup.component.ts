import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JWTAuthService } from '../../Services/jwtauth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  //  user:any = {};

  //  register(){
  //   this.user.signup(this.user).subscribe((res:any) => alert("Registered Successfully"));
  //  }

    user:any = {};

  constructor(private auth: JWTAuthService){}

 register(){

  console.log("Sending Data:", this.user);

  this.auth.signup(this.user)
    .subscribe({
      next:(res:any)=>{
        console.log("Response:", res);

        if(res.success){
          alert(res.message);
        }
        else{
          alert("Registration Failed");
        }
      },
      // error:(err)=>{
      //   console.log("Error:", err);
      //   alert("Registration Failed");
      //}
    });

}



}
