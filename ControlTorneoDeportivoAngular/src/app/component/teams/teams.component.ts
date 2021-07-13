import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [TeamService]
})
export class TeamsComponent implements OnInit {
  public team: Team;
  public equipo: any;
  public idteam: any;
  public idEquipo: any;

  constructor(private _teamsService: TeamService, private _router: Router) {
    this.team = new Team('', '', '', '', 0, 0, 0, 0, 0)
  }

  ngOnInit(): void {
    this.allteams()
  }

  newteam(){
    this._teamsService.crearequipo(this.team).subscribe(
      response => {
        this.allteams()
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar el equipo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editteam(){
    this._teamsService.editequipo(this.team).subscribe(
      response =>{
        this.allteams()
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

  deleteteam(idTeam: String){
    this._teamsService.deleteequipo(idTeam).subscribe(
      response =>{
        this.allteams()
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

  getequipo(idTorneo: String){
    this._teamsService.equipo(idTorneo).subscribe(
      response =>{
        this.idtorneo(idTorneo)
        this.team = response.equipo
        this.allteams()
      },error =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se pudo encontrar el torneo',
          showConfirmButton: false,
          timer: 1500
        })
      }    )
  }

  allteams(){
    this._teamsService.equipos().subscribe(
      response =>{
        this.equipo = response.equipos
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No hay ningÃºn equipo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  idtorneo(id: String){
    this.idEquipo = id
    localStorage.setItem('equipo', this.idEquipo)
  }
}
