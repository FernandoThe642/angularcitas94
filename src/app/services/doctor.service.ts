import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
interface Respuesta {
  codigo: string;
  mensaje: string;
}


interface Doctor {
  id?: number;
  cedulaDoctor: string;
  nombreDoctor: string;
  especialidad: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  private apiUrl = 'http://localhost:8080/javacitas94/rs/doctores'

  constructor(private http: HttpClient) { }


  listarDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/listar`);
  }


  obtenerDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/obtener/${id}`);
  }


  actualizarDoctor(Doctor: Doctor): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${this.apiUrl}/actualizar`, Doctor).pipe(
      tap(() => this.listarDoctores()) )
  }


  eliminarDoctor(id: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${this.apiUrl}/eliminar/${id}`).pipe(
      tap(() => this.listarDoctores()) )
  }

  buscarEspecialidad(nombre: string): Observable<Doctor | null> {
    return this.http.get<Doctor | null>(`${this.apiUrl}/buscar/${nombre}`);
  }
}
