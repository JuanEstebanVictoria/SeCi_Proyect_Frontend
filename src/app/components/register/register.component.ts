import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import {UserRegistrationRequest} from '../../dtos/user-registration-request';
import {UsersService} from '../../servicios/users.service';
import {ErrorResponse} from '../../dtos/error-response';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registroForm!: FormGroup;
  result = '';

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dateBirth: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]]
      },
      {
        validators: this.passwordMatchValidator
      });
  }

  onSubmit(): void {
    const newUser = this.registroForm.value as UserRegistrationRequest;
    this.usersService.registrar(newUser).subscribe({
      next: ( data) => {
        console.log('El usuario ha sido creado correctamente: ', data);
        this.result = 'Usuario registrado correctamente';
      },
      error: (error) => {
        console.log('Se presentó un problema al registrar el usuario: ', error);
        this.result = error.error.map((item: ErrorResponse) => item.message).join(', ');
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
