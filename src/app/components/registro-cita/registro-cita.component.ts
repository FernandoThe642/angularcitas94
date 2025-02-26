import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { CitaMedicaService, CitaMedica, Doctor } from '../../services/cita-medica.service';


@Component({
  selector: 'app-registro-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro-cita.component.html',
  styleUrl: './registro-cita.component.scss'
})
export class RegistroCitaComponent implements OnInit{
  doctores: Doctor[] = []
  mensajeExito: string = ''
  minFecha = new Date().toISOString().split('T')[0]
  minHora='8:00'
  maxHora='18:00'
  doctorSeleccionado: Doctor = { 
    id: null, 
    cedulaDoctor: '', 
    nombreDoctor: '', 
    especialidad: '', 
    correo: '' 
  }
  
  CitaMedica: CitaMedica = {
  cedulaPaciente: '',
  nombrePaciente: '',
  correoPaciente: '',
  fechaCita: '',
  horaCita: '',
  especialidad: '',
  estado: ''
  };


  constructor(private doctorService: DoctorService, private citaMedicaService: CitaMedicaService, private router: Router) {}


  ngOnInit() {
    this.cargarDoctores()
  }

  registrar(): void {
    if (!this.CitaMedica.doctorAsignado) {
      alert('Debe seleccionar una especialidad.');
      return;
    }

    this.CitaMedica.especialidad = this.CitaMedica.doctorAsignado.especialidad
    this.CitaMedica.estado = 'Confirmada'
    let nombre23 = this.CitaMedica.doctorAsignado.nombreDoctor

    this.citaMedicaService.guardarCitaMedica(this.CitaMedica).subscribe(
      response => {
        this.mensajeExito = ('Cita registrada con el doctor: '+ nombre23)
        this.CitaMedica = {
          cedulaPaciente: '',
          nombrePaciente: '',
          correoPaciente: '',
          fechaCita: '',
          horaCita: '',
          especialidad: '',
          estado: ''
          };

      }
    );
  }

  cargarDoctores(): void {
    this.doctorService.listarDoctores().subscribe(data => {
      this.doctores = data;
    });
  }




}



