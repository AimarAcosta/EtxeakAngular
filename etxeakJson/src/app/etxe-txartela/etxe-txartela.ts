import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Etxea } from '../etxea';
import { Interesduna } from '../interesduna';

@Component({
  selector: 'app-etxe-txartela',
  imports: [RouterLink],
  templateUrl: './etxe-txartela.html',
  styleUrl: './etxe-txartela.css',
})
export class EtxeTxartela {
  etxea = input.required<Etxea>();

  interesdunKopurua = computed(() => {
    const gordeta = localStorage.getItem('etxeak_interesdunak');
    if (!gordeta) return 0;
    try {
      const zerrenda: Interesduna[] = JSON.parse(gordeta);
      return zerrenda.filter((i) => i.etxeaId === this.etxea().id).length;
    } catch {
      return 0;
    }
  });
}
