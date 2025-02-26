import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CitaMedicaService } from '../../services/cita-medica.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.scss'
})
export class ListaCitasComponent implements OnInit{
  citas: any[] = [];

  constructor(private citaMedicaService: CitaMedicaService,) {}
  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaMedicaService.listarCitaMedicas().subscribe(data => {
      this.citas = data;
    });
  }



  cancelarCita(id: number) {
    this.citaMedicaService.cancelarCitaMedica(id).subscribe(() => this.cargarCitas());
  }
  
  


}
