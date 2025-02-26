import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CitaMedicaService {

    private apiUrl = 'http://localhost:8080/javacitas94/rs/citas'
  constructor(private http: HttpClient) { }


  guardarCitaMedica(CitaMedica: CitaMedica): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.apiUrl}/cita-medica`, CitaMedica).pipe(
      tap(() => this.listarCitaMedicas()) )
  }


  listarCitaMedicas(): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(`${this.apiUrl}/listar`);
  }


  obtenerCitaMedica(id: number): Observable<CitaMedica> {
    return this.http.get<CitaMedica>(`${this.apiUrl}/obtener/${id}`);
  }


  cancelarCitaMedica(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cita-medica/${id}/cancelar`, {});
  }
  




  eliminarCitaMedica(id: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${this.apiUrl}/eliminar/${id}`).pipe(
      tap(() => this.listarCitaMedicas()) )
  }

  buscarCitaMedicaPorCedula(cedula: string): Observable<CitaMedica | null> {
    return this.http.get<CitaMedica | null>(`${this.apiUrl}/buscar/${cedula}`);
  }
  
}


interface Respuesta {
  codigo: string;
  mensaje: string;
}

export interface Doctor {
  id?: number | null
  cedulaDoctor: string;
  nombreDoctor: string;
  especialidad: string;
  correo: string;
}
export interface CitaMedica {
  id?: number
  cedulaPaciente: string;
  nombrePaciente: string;
  correoPaciente: string;
  fechaCita: string;
  horaCita: string;
  especialidad: string;
  doctorAsignado?:Doctor;
  estado: string;
}