import { Component, computed, inject, signal } from '@angular/core';
import { EtxeTxartela } from '../etxe-txartela/etxe-txartela';
import { Etxeak } from '../etxeak';
import { Etxea } from '../etxea';

@Component({
  selector: 'app-etxe-zerrenda',
  imports: [EtxeTxartela],
  templateUrl: './etxe-zerrenda.html',
  styleUrl: './etxe-zerrenda.css',
})
export class EtxeZerrenda {
  private etxeakZerbitzua = inject(Etxeak);

  etxeak = signal<Etxea[]>([]);
  bilaketa = signal('');
  kargatzen = signal(true);
  errorea = signal(false);

  iragaziak = computed(() => {
    const t = this.bilaketa().trim().toLowerCase();
    if (!t) return this.etxeak();
    return this.etxeak().filter((e) => e.city.toLowerCase().includes(t));
  });

  constructor() {
    this.etxeakZerbitzua.guztiak().subscribe({
      next: (datuak) => {
        this.etxeak.set(datuak);
        this.kargatzen.set(false);
      },
      error: (err) => {
        console.error('Errorea etxeak kargatzean:', err);
        this.errorea.set(true);
        this.kargatzen.set(false);
      },
    });
  }

  garbitu() {
    this.bilaketa.set('');
  }
}
