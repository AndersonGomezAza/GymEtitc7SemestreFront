import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { actividadesModel } from "../models/actividadesModel";
import { implementosModel } from "../models/implementosModel";
import { maquinariasModel } from "../models/maquinariasModel";
import { planesModel } from "../models/planesModel";
import { RutinasModels } from "../Models/RutinasModels";
import { usuariosModel } from "../Models/UsuariosModel";
import { valoracionesModels } from "../Models/valoracionesModel";


@Injectable({
    providedIn: 'root'
})

export class ModalService {
    actividades:actividadesModel;
    implementos:implementosModel;
    maquinarias:maquinariasModel;
    planes:planesModel;
    rutinas:RutinasModels;
    usuarios:usuariosModel;
    valoraciones:valoracionesModels;
    
    titulo = "";
    acciones = new BehaviorSubject('');
    constructor(){}
}