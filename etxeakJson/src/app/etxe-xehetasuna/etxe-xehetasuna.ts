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
  kargatzen = signal(true);

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
          this.kargatzen.set(false);
        },
        error: () => {
          this.etxea.set(undefined);
          this.kargatzen.set(false);
        },
      });
    } else {
      this.kargatzen.set(false);
    }
  }

  private lortuGuztiakStorage(): Interesduna[] {
    const gordeta = localStorage.getItem(this.STORAGE_KEY);
    if (!gordeta) return [];
    try {
      return JSON.parse(gordeta);
    } catch {
      return [];
    }
  }

  private kargatuInteresdunak(etxeaId: string) {
    const guztiak = this.lortuGuztiakStorage();
    this.interesdunak.set(guztiak.filter((i) => i.etxeaId === etxeaId));
  }

  gordeInteresduna(form: NgForm) {
    const e = this.etxea();
    if (!e || form.invalid) return;

    const izena = this.izena.trim();
    const abizena = this.abizena.trim();
    const emaila = this.emaila.trim();
    if (!izena || !abizena || !emaila) return;

    const berria: Interesduna = {
      etxeaId: e.id,
      izena,
      abizena,
      emaila,
    };

    const guztiak = this.lortuGuztiakStorage();
    guztiak.push(berria);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(guztiak));

    this.interesdunak.set(guztiak.filter((i) => i.etxeaId === e.id));
    form.resetForm();
  }
}
