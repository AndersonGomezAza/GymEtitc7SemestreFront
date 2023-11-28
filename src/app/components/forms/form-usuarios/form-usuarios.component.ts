import { Component, Inject, inject, OnInit } from '@angular/core';


import { FormBuilder, Validators } from '@angular/forms';
import { usuariosModel } from 'src/app/Models/UsuariosModel';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {

  private fb = inject(FormBuilder);

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.usuariosForm.setValue({
        Nombre: data.nombres,
        Apellido: data.apellidos,
        Descripcion: data.descripcionPlan,
        NumDocumento: data.numDocumento,
      });
      console.log(data)
      this.idData = data.idUsuario;
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  usuariosForm = this.fb.group({
    Nombre: [null, [Validators.required]],
    Apellido: [null, [Validators.required]],
    Descripcion: [null, [Validators.required]],
    NumDocumento: [null, [Validators.required]],
  });

  infoUsuarios: usuariosModel = {
    Nombre: "",
    NumDocumento: "",
    Apellido: "",
    Descripcion: ""
  };



  ngOnInit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }



  titulo = ""
  acciones = ""
  idData = "";


  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.usuariosForm.valid) {
      this.infoUsuarios.Nombre = this.usuariosForm.controls['Nombre'].value;
      this.infoUsuarios.NumDocumento = this.usuariosForm.controls['NumDocumento'].value;
      this.infoUsuarios.Apellido = this.usuariosForm.controls['Apellido'].value;
      this.infoUsuarios.Descripcion = this.usuariosForm.controls['Descripcion'].value;

      this.dialog.closeAll();

      if (this.acciones == "Editar") {

        var editPlan = {
          Nombre: this.infoUsuarios.Nombre,
          NumDocumento: this.infoUsuarios.NumDocumento,
          Apellido: this.infoUsuarios.Apellido,
          Descripcion: this.infoUsuarios.Descripcion,
          IdUsuario: this.idData,
        }

        Swal.fire({
          title: 'Edicion Realizada',
          text: 'La actividad ha sido actualizada ',
          icon: 'success',
          color: '#716add',
        })
      } else if (this.acciones == "Crear") {
        this.apiService.post('Maquinarias', this.infoUsuarios).then(res=>{
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El usuario ha sido creado',
              icon: 'success',
              color: '#716add',
            })
          }
        }).catch(error=>{
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      }
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
