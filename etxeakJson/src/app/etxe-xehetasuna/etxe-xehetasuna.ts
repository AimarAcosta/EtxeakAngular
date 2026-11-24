import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Etxeak } from '../etxeak';
import { Etxea } from '../etxea';
import { Interesduna } from '../interesduna';

@Component({
  selector: 'app-etxe-xehetasuna',
  imports: [FormsModule],
  templateUrl: './etxe-xehetasuna.html',
  styleUrl: './etxe-xehetasuna.css',
})
export class EtxeXehetasuna {
  private route = inject(ActivatedRoute);
  private etxeakZerbitzua = inject(Etxeak);
  private readonly STORAGE_KEY = 'etxeak_interesdunak';

  etxea = signal<Etxea | undefined>(undefined);
  interesdunak = signal<Interesduna[]>([]);

  // Formularioaren eremuak
  izena = '';
  abizena = '';
  emaila = '';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.etxeakZerbitzua.bat(id).subscribe({
        next: (datua) => {
          this.etxea.set(datua);
          this.kargatuInteresdunak(id);
        },
        error: () => this.etxea.set(undefined),
      });
    }
  }

  private lortuGuztiakStorage(): Interesduna[] {
    const gordeta = localStorage.getItem(this.STORAGE_KEY);
    return gordeta ? JSON.parse(gordeta) : [];
  }

  private kargatuInteresdunak(etxeaId: string) {
    const guztiak = this.lortuGuztiakStorage();
    this.interesdunak.set(guztiak.filter((i) => i.etxeaId === etxeaId));
  }

  gordeInteresduna(form: NgForm) {
    const e = this.etxea();
    if (!e || form.invalid) return;

    const berria: Interesduna = {
      etxeaId: e.id,
      izena: this.izena.trim(),
      abizena: this.abizena.trim(),
      emaila: this.emaila.trim(),
    };

    const guztiak = this.lortuGuztiakStorage();
    guztiak.push(berria);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(guztiak));

    this.interesdunak.set(guztiak.filter((i) => i.etxeaId === e.id));

    form.resetForm();
  }
}
