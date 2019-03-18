import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { VendasService } from '../services/vendas.service';

@Component({
  selector: 'app-venda-cadastro',
  templateUrl: './venda-cadastro.component.html',
  styleUrls: ['./venda-cadastro.component.css']
})
export class VendaCadastroComponent implements OnInit {

  venda: any;
  item: any;
  clientes: Array<any>;
  produtos: Array<any>;
  // Notificar o componente vendas-listagem que ele precisa ser atualizado
  @Output() vendaSalva = new EventEmitter();

  constructor(private vendaService : VendasService,
              private messageService : MessageService) { }

  ngOnInit() {

    this.vendaService.listarClientes().subscribe(
      response => {
        this.clientes = response
        console.log("clientes:")
        console.log(this.clientes)
      }
    ),
    error => {
      console.log("Erro: ");
      console.log(error);
    }

    this.vendaService.listarProdutos().subscribe(
      response => {
        this.produtos = response
        console.log("produtos:")
        console.log(this.produtos)
      }
    ),
    error => {
      console.log("Erro: ");
      console.log(error);
    }

    this.novaVenda();
  }

  novaVenda() {
    this.venda = { itemList: [], frete: 0.0, total: 0.0 };
    this.item = {};
  }

  incluirItem() {
    this.item.total = (this.item.produto.valor * this.item.quantidade);

    this.venda.itemList.push(this.item);

    this.item = {};

    this.calcularTotal();
  }

  calcularTotal() {
    const totalItens = this.venda.itemList
      .map(i => (i.produto.valor * i.quantidade))
      .reduce((total, v) => total + v , 0);

    this.venda.total = totalItens + this.venda.frete;
  }

  adicionarVenda(frm: FormGroup) {
    this.vendaService.adicionarVendas(this.venda).subscribe(response => {
      
      frm.reset();
      this.novaVenda();

      this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso!'})

      // Aqui no response está a venda que acabou de ser salva
      this.vendaSalva.emit(response);
    },
    error => {
      console.log("Erro: ");
      console.log(error);
    })
  }
}
