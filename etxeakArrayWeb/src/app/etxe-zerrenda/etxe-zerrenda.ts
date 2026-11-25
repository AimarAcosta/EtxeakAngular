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

  etxeak = signal<Etxea[]>(this.etxeakZerbitzua.guztiak());
  bilaketa = signal('');

  iragaziak = computed(() => {
    const t = this.bilaketa().trim().toLowerCase();
    if (!t) return this.etxeak();
    return this.etxeak().filter((e) => e.city.toLowerCase().includes(t));
  });

  garbitu() {
    this.bilaketa.set('');
  }
}
