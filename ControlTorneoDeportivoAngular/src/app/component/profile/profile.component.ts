import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  public usermodel: User;
  public usuarios: any;
  public identidad: any;
  public token: any;
  constructor(public _userService: UserService, private _router: Router) {
    this.usermodel = new User('','','','','', '')
  }

  ngOnInit(): void {
    this.user()
  }

  user(){
    this.identidad = this._userService.getIdentidad()
    let idUser = this.identidad._id

    this._userService.profile(idUser).subscribe(
      response =>{
        this.usermodel = response.obtainedUser
        console.log(response)
      },error =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se pudo guardar el usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editUser(){
    this._userService.edituser(this.usermodel).subscribe(
      response =>{
        this.user()
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se pudo guardar el usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  deleteUser(idUser: String){
    this._userService.deleteuser(idUser).subscribe(
      response =>{
        this._router.navigate(['/login'])
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No puedes editar a un administrador',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
