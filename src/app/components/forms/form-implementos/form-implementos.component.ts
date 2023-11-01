import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { implementosModel } from 'src/app/models/implementosModel';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';
import { ModalService } from 'src/app/modal/modal.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-form-implementos',
  templateUrl: './form-implementos.component.html',
  styleUrls: ['./form-implementos.component.css']
})
export class FormImplementosComponent {
  private fb = inject(FormBuilder);
  implementsForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(60)]],
    Categoria:   [null, [Validators.required, Validators.maxLength(20)]],
  });
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService:ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any // Utiliza MAT_DIALOG_DATA para obtener los datos
  ) {
    this.dataSource = new MatTableDataSource();

    if (data) {
      this.implementsForm.setValue({
        Nombre: data.nombreImplemento, 
        Descripcion: data.descripcionImplemento, 
        Categoria: data.categoriaImplemento, 
      });
      
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  infoImplemetos: implementosModel = {
    NombreImplemento:"",
    CategoriaImplemento:"",
    DescripcionImplemento:"",
    SerialImplemento:"",
  };

  titulo=""
  acciones=""

  onSubmit(): void {
    if (this.implementsForm.valid) {
      this.infoImplemetos.NombreImplemento = this.implementsForm.controls['Nombre'].value;
      this.infoImplemetos.CategoriaImplemento = this.implementsForm.controls['Descripcion'].value;
      this.infoImplemetos.DescripcionImplemento = this.implementsForm.controls['Categoria'].value;
      this.infoImplemetos.SerialImplemento = this.implementsForm.controls['Serial'].value;

      this.dialog.closeAll();
      this.apiService.post('Implementos', this.infoImplemetos).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'El implemento ha sido creada',
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
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
