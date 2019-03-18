import { Component, OnInit } from '@angular/core';

import { VendasService } from '../services/vendas.service';

@Component({
  selector: 'app-vendas-listagem',
  templateUrl: './vendas-listagem.component.html',
  styleUrls: ['./vendas-listagem.component.css']
})
export class VendasListagemComponent implements OnInit {

  vendas;

  // Need a service class? Declare that on the constructor.
  constructor(private vendaService: VendasService) { }

  ngOnInit() {

    this.listarVendas();
  }

  listarVendas() {
    
    // subscribe() method related to Observer.
    this.vendaService.listarVendas().subscribe(
      response => { 
        this.vendas = response;
        console.log("vendas: " + this.vendas);
    },
      error => { console.log("erro: " + error)
    });
  }
}
