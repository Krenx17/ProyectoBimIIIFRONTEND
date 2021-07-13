import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [MatchService]
})
export class MatchComponent implements OnInit {
  public match: Match;
  public partido: any;
  public idTeam: any;
  public idPartido: any;
  constructor(private _partidoService: MatchService, private _router: Router) {
    this.match = new Match('', '', 0, '', 0, '')
  }

  ngOnInit(): void {
    this.allmatchs()
  }

  newmatch(){
    this._partidoService.crearpartido(this.match).subscribe(
      response => {
        this.allmatchs()
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar el partido',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editmatch(){
    console.log(this.match)
    this._partidoService.editpartido(this.match).subscribe(
      response =>{
        this.allmatchs()
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

  deletematch(idMatch: String){
    this._partidoService.deletepartido(idMatch).subscribe(
      response =>{
        this.allmatchs()
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

  getpartido(idMatch: String){
    this._partidoService.partido(idMatch).subscribe(
      response =>{
        this.match = response.partido
        this.idpartido(idMatch)
        this.allmatchs()
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

  allmatchs(){
    this._partidoService.partidos().subscribe(
      response =>{
        this.partido = response.partidos
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

  idpartido(id: String){
    this.idPartido = id
    localStorage.setItem('partido', this.idPartido)
  }
}
