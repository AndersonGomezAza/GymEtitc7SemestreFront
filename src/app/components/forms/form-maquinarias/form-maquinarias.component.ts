import { Component, Inject, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/modal/modal.service';
import { maquinariasModel } from 'src/app/models/maquinariasModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-maquinarias',
  templateUrl: './form-maquinarias.component.html',
  styleUrls: ['./form-maquinarias.component.css']
})
export class FormMaquinariasComponent implements OnInit{
  private fb = inject(FormBuilder);
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource();

    if (data) {
      this.machineryForm.setValue({
        Nombre: data.nombreMaquinaria,
        Descripcion: data.descripcionMaquinaria,
        Categoria: data.categoriaMaquinaria,
        Estado: data.estadoMaquinaria,
        Serial: data.serialMaquinaria,
      });
      this.idData = data.idMaquinaria;
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }


  machineryForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(60)]],
    Categoria: [null, [Validators.required, Validators.maxLength(20)]],
    Estado: [null, [Validators.required, Validators.max(20)]],
    Serial: [null, [Validators.required, Validators.maxLength(20)]]
  });

  infoMaquinarias: maquinariasModel = {
    NombreMaquinaria: "",
    CategoriaMaquinaria: "",
    DescripcionMaquinaria: "",
    SerialMaquinaria: "",
    EstadoMaquinaria: "",
  };

  titulo = ""
  idData = ""
  acciones = ""

  ngOnInit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }

  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.machineryForm.valid) {
      this.infoMaquinarias.NombreMaquinaria = this.machineryForm.controls['Nombre'].value;
      this.infoMaquinarias.CategoriaMaquinaria = this.machineryForm.controls['Descripcion'].value;
      this.infoMaquinarias.DescripcionMaquinaria = this.machineryForm.controls['Categoria'].value;
      this.infoMaquinarias.EstadoMaquinaria = this.machineryForm.controls['Categoria'].value;
      this.infoMaquinarias.SerialMaquinaria = this.machineryForm.controls['Serial'].value;

      this.dialog.closeAll();

      if (this.acciones == "Editar") {

        var editMaquinaria = {
          NombreMaquinaria: this.infoMaquinarias.NombreMaquinaria,
          CategoriaMaquinaria: this.infoMaquinarias.CategoriaMaquinaria,
          DescripcionMaquinaria: this.infoMaquinarias.DescripcionMaquinaria,
          EstadoMaquinaria: this.infoMaquinarias.EstadoMaquinaria,
          SerialMaquinaria: this.infoMaquinarias.SerialMaquinaria,
          IdMaquinaria: this.idData,
        }

        this.apiService.update('Maquinarias', editMaquinaria, this.idData).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'La actividad ha sido actualizada ',
              icon: 'success',
              color: '#716add',
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      } else if (this.acciones == "Crear") {
        this.apiService.post('Maquinarias', this.infoMaquinarias).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'La maquinaria ha sido creada',
              icon: 'success',
              color: '#716add',
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      }
    } else {
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
