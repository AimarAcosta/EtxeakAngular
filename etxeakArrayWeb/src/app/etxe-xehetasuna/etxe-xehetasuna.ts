import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etxeak } from '../etxeak';
import { Etxea } from '../etxea';

@Component({
  selector: 'app-etxe-xehetasuna',
  imports: [],
  templateUrl: './etxe-xehetasuna.html',
  styleUrl: './etxe-xehetasuna.css',
})
export class EtxeXehetasuna {
  private route = inject(ActivatedRoute);
  private etxeakZerbitzua = inject(Etxeak);

  etxea = signal<Etxea | undefined>(undefined);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.etxea.set(this.etxeakZerbitzua.bat(id));
    }
  }
}
