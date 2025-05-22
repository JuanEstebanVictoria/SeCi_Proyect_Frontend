import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgClass, NgIf} from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { LoginRequest } from '../../dtos/login-request';
import { LoginResponse } from '../../dtos/login-response';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputTextModule, PasswordModule, ButtonModule, MessageModule, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loading = false;
  result = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.loading = false;
          const home = this.authService.getRoles().includes('ADMIN') ? '/home-admin' : '/home-user';
          this.router.navigate([home]).then(() => window.location.reload());
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message || 'Error desconocido';
        }
      });
    }
  }

  mostrarError(tipo: string): string {
    switch (tipo) {
      case 'required': return 'Este campo es obligatorio.';
      case 'email': return 'Correo inválido.';
      case 'minlength': return 'Debe tener mínimo 6 caracteres.';
      default: return 'Error desconocido.';
    }
  }
}
