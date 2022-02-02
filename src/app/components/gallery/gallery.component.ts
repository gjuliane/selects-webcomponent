import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  template: `
<div class="container">
  <form [formGroup]="myForm">
    <label for="select-1">Niveles académicos</label>
    <select id="select-1"
      (change)="select1Chance($event)"
      formControlName="select1">
      <option value="0">Elija un opción</option>
      <option [value]="grado.id" *ngFor="let grado of grados"> {{ grado.name }}</option>
    </select>
    <br>
    <br>
    <label for="select-2">Especialidades</label>
    <select id="select-2"
      (change)="select2Chance($event)"
      formControlName="select1">
      <option value="0">Elija un opción</option>
      <option [value]="programa.id" *ngFor="let programa of programasFiltrados">{{programa.name}}</option>
    </select>
  </form>
  <div>Planteles
    <ng-container *ngIf="escuelasFiltradas.length > 0; then thenTemplate; else elseTemplate"></ng-container>
    <ng-template #thenTemplate>
      <div *ngFor="let escuelaFiltrada of escuelasFiltradas">{{escuelaFiltrada.name}}</div>
    </ng-template>
    <ng-template #elseTemplate>
      <div>Default</div>
    </ng-template>

  </div>
</div>
  `,
  styles: [`
    /* .content{
      display: flex;
      flex-flow: row nowrap;
      overflow-x: auto;
    }
    .item{
      flex: 1 1 auto;
    } */
  `]
})
export class GalleryComponent implements OnInit {

  myForm: FormGroup  = this.fb.group({
    'select1': [0],
    'select2': [0]
  });

  grados: GradoModel[] = [
    {
      id: 1,
      name: "Posgrado"
    },
    {
      id: 2,
      name: "Especialidad"
    }
  ];

  programas = [
    {
      id: 1,
      idGrado:1,
      name: "Administración Pública",
      nivel:1,
      esculas:[
        {
          id: 1,
          name:"Anahuac 1"
        },
        {
          id: 1,
          name:"Anahuac 2"
        },
      ]
    },
    {
      id: 2,
      idGrado:1,
      name: "Economía y Negocios",
      nivel:1,
      esculas:[
        {
          id: 1,
          name:"Anahuac 3"
        },
        {
          id: 1,
          name:"Anahuac 4"
        },
      ]
    },
    {
      id: 3,
      idGrado:2,
      name: "Inventado",
      nivel:2,
      esculas:[
        {
          id: 1,
          name:"Anahuac 1"
        },
        {
          id: 1,
          name:"Anahuac 2"
        },
      ]
    }
  ];

  programasFiltrados: any[] = [];
  escuelasFiltradas: any[] = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  select1Chance(event: any) {
    console.log(event.target.value);
    if (event.target.value && event.target.value > 0) {
      this.filterProgramas(event.target.value);
    }
  }

  select2Chance(event: any) {
    console.log(event.target.value);
    this.filterEscuelas(event.target.value);

  }

  filterProgramas(idGrado: number){
    const programas = this.programas.filter( programa => programa.idGrado == idGrado );
    console.log(programas);
    this.programasFiltrados = programas;
  }

  filterEscuelas(idPrograma: number) {
    const escuelas = this.programas.filter( programa => programa.id == idPrograma);
    if (escuelas.length > 0 ) {
      this.escuelasFiltradas = escuelas[0].esculas;
      console.log(this.escuelasFiltradas);
    }


  }


}

interface GradoModel {
  id: number,
  name: string
}
