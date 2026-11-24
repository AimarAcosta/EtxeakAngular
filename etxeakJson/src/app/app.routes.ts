import { Routes } from '@angular/router';
import { EtxeZerrenda } from './etxe-zerrenda/etxe-zerrenda';
import { EtxeXehetasuna } from './etxe-xehetasuna/etxe-xehetasuna';

export const routes: Routes = [
  { path: '', component: EtxeZerrenda, title: 'Etxeak - Hasiera' },
  { path: 'xehetasuna/:id', component: EtxeXehetasuna, title: 'Etxearen xehetasuna' },
];
