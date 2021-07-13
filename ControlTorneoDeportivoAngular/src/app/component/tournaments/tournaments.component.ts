import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
  providers: [TournamentsService]
})
export class TournamentsComponent implements OnInit {
  public tournament: Tournament;
  public torneo: any;
  public token: any;
  public idTorneo: any;

  constructor(private _torneosService: TournamentsService, private _router: Router) {
    this.tournament = new Tournament('', '', '', 0, 0, 0)
  }

  ngOnInit(): void {
    this.alltorneos()
  }

  newtorneo(){
    this._torneosService.creartorneo(this.tournament).subscribe(
      response => {
        this.alltorneos()
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar el torneo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  edittorneo(){
    this._torneosService.edittorneo(this.tournament).subscribe(
      response =>{
        this.alltorneos()
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

  deletetorneo(idTorneo: String){
    this._torneosService.deletetorneo(idTorneo).subscribe(
      response =>{
        this.alltorneos()
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

  gettorneo(idTorneo: String){
    this._torneosService.torneo(idTorneo).subscribe(
      response =>{
        this.idtorneo(idTorneo)
        this.tournament = response.torneo
        this.alltorneos()
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

  alltorneos(){
    this._torneosService.torneos().subscribe(
      response =>{
        this.torneo = response.torneos
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No hay ningún torneo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  idtorneo(id: String){
    this.idTorneo = id
    localStorage.setItem('torneo', this.idTorneo)
  }
}
