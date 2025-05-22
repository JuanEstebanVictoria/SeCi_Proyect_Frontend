import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgIf, NgFor, KeyValuePipe } from '@angular/common';
import {UserRegistrationRequest} from '../../dtos/user-registration-request';
import {UsersService} from '../../servicios/users.service';
import {ErrorResponse} from '../../dtos/error-response';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { map, debounceTime, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, KeyValuePipe ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForm!: FormGroup;
  result = '';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.crearFormulario();
  }
  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.emailUnicoValidator()]],
      dateBirth: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]]
      }, {
        validators: this.passwordMatchValidator
      });
  }

  onSubmit(): void {
    const newUser = this.registroForm.value as UserRegistrationRequest;
    this.usersService.registrar(newUser).subscribe({
      next: (data) => {
        localStorage.setItem('token', 'FAKE-JWT-TOKEN');
        this.toastr.success('Usuario registrado correctamente');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        const msg = error.error.map((item: ErrorResponse) => item.message).join(', ');
        this.toastr.error('Error al registrar: ' + msg);
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  mostrarError(tipo: string): string {
    switch (tipo) {
      case 'required': return 'Este campo es obligatorio.';
      case 'minlength': return 'Debe tener al menos 3 caracteres.';
      case 'maxlength': return 'Supera el máximo de caracteres permitidos.';
      case 'email': return 'Correo inválido.';
      case 'emailExiste': return 'El correo ya está registrado.';
      default: return 'Error desconocido.';
    }
  }

  emailUnicoValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        switchMap(value =>
          this.usersService.emailExiste(value).pipe(
            map(existe => (existe ? { emailExiste: true } : null)),
            catchError(() => of(null)) // en caso de error, ignora
          )
        )
      );
    };
  }
}
