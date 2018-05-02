import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerService} from "../../server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  wrongPassword = false;
  emailExists = false;

  constructor(private serverService: ServerService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-z,\',A-Z]+$')]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-z,\',A-Z]+$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );
  }

  onSubmit() {
    this.wrongPassword = false;
    this.emailExists = false;
    if (this.registerForm.getRawValue()['password'] !== this.registerForm.getRawValue()['confirmPassword']) {
      this.wrongPassword = true;
      return;
    } else {
      if (!this.serverService.registerUser(this.registerForm.getRawValue())) {
        this.emailExists = true;
      }
    }
  }

  onFacebookRegister() {
    this.serverService.facebookRegister();
  }

}
