import { Component, inject, signal } from '@angular/core';
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
  iragaziak = signal<Etxea[]>([]);

  constructor() {
    this.etxeakZerbitzua.guztiak().subscribe({
      next: (datuak) => {
        this.etxeak.set(datuak);
        this.iragaziak.set(datuak);
      },
      error: (err) => console.error('Errorea etxeak kargatzean:', err),
    });
  }

  bilatu(testua: string) {
    const t = testua.trim().toLowerCase();
    if (!t) {
      this.iragaziak.set(this.etxeak());
      return;
    }
    this.iragaziak.set(this.etxeak().filter((e) => e.city.toLowerCase().includes(t)));
  }
}
