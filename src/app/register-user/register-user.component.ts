import {HttpClient, HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, UserForm } from '../Interfaces/usuarioForm.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})

export class RegisterUserComponent  {
   
  users: UserForm[] = [];
  roles = Role; // Esto hará que los valores de la enum estén disponibles en el HTML

  registerUserForm = new FormGroup({
    id: new FormControl (0),
    firtsName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    birthdayDate: new FormControl(new Date()),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
    passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
    phone: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{9}$')]),
    role: new FormControl<Role>(Role.USER)
  },
  {validators: this.passwordConfirmValidator}
  );

  constructor(private httpClient : HttpClient, private fb: FormBuilder){}
 

  passwordConfirmValidator(control: AbstractControl){

    if(control.get('password')?.value === control.get('passwordConfirm')?.value){
      return null;

    }else{
        return{
          'confirmError': true
        }
    }
  } 

  save(){

    const registerUserForm: UserForm ={

      id: this.registerUserForm.get('id')?.value ?? 0,
      firtsName: this.registerUserForm.get('firtsName')?.value ?? '',
      lastName: this.registerUserForm.get('lastName')?.value ?? '',
      birthdayDate: this.registerUserForm.get('birthdayDate')?.value ?? new Date(),
      email: this.registerUserForm.get('email')?.value ?? '',
      password: this.registerUserForm.get('password')?.value ?? '',
      phone: this.registerUserForm.get('phone')?.value ?? '',
      role: this.registerUserForm.get('role')?.value ?? Role.USER
    
    }
    



    console.log(registerUserForm);

    const url= 'http://localhost:8080/user';
    this.httpClient.post(url,registerUserForm ).subscribe(result => console.log(result)
    );

    //this.registerUserForm.reset();
    
  }
  
}