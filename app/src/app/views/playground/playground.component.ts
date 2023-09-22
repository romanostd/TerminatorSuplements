// import { Component, HostListener, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { EstoqueService } from '../../services/rest/estoque.service';
// import { EntidadeService } from '../../services/rest/entidade.service';
// import { Estoque } from '../../models/estoquemodel';
// import { ProdutoService } from '../../services/rest/produto.service';
// import { Produto } from '../../models/produtomodel';

// @Component({
//   selector: 'app-estoque',
//   templateUrl: './estoque.component.html',
//   styleUrls: ['./estoque.component.scss']
// })
// export class EstoqueComponent implements OnInit {

//   isLoading = false;
//   dataInicial: Date = new Date();
//   dataFinal: Date = new Date();
//   estabelecimentos: any[];
//   estabelecimentoCnpj: '';

//   ordenacao?: 'Codigo' | 'Descricao' = 'Codigo';
//   custoMedio: boolean;
//   precoCompraAtual: boolean;
//   custoCompraAtual: boolean;
//   precoCompraUltimaData: boolean;
//   custoCompraUltimaData: boolean;

//   dataSource: Estoque[] = [];
//   displayedColumns: string[];

//   comEstoque: boolean = true;
//   semEstoque: boolean;
//   pesquisaInput: string;

//   pesquisaContainerActived = false;

//   get entradas() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.valorEntradas))) {
//         soma += Number(estoque.valorEntradas);
//       }
//     })
//     return soma;
//   }
//   get saidas() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.valorSaidas))) {
//         soma += Number(estoque.valorSaidas);
//       }
//     })
//     return soma;
//   }
//   get saldoQuantidade() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.saldoEstoqueQuantidade))) {
//         soma += Number(estoque.saldoEstoqueQuantidade);
//       }
//     })
//     return soma;
//   }
//   get saldoFinCustoMedio() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.valorFinal))) {
//         soma += Number(estoque.valorFinal);
//       }
//     })
//     return soma;
//   }
//   get saldoFinPrecoCompra() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.saldoEstoquePrecoUnitarioAquisicao))) {
//         soma += Number(estoque.saldoEstoquePrecoUnitarioAquisicao);
//       }
//     })
//     return soma;
//   }
//   get saldoFinCustoCompra() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.saldoEstoqueCustoUnitarioAquisicao))) {
//         soma += Number(estoque.saldoEstoqueCustoUnitarioAquisicao);
//       }
//     })
//     return soma;
//   }

//   get ultimaAquisicaoPrecoUnitario() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.ultimaAquisicaoPrecoUnitario))) {
//         soma += Number(estoque.ultimaAquisicaoPrecoUnitario);
//       }
//     })
//     return soma;
//   }

//   get ultimaAquisicaoCustoUnitario() {
//     let soma = 0;
//     this.filteredList.forEach(estoque => {
//       if (!isNaN(Number(estoque.ultimaAquisicaoCustoUnitario))) {
//         soma += Number(estoque.ultimaAquisicaoCustoUnitario);
//       }
//     })
//     return soma;
//   }

//   alteraDisplayedColumns() {
//     const columns = [
//       'gtin',
//       'descricao',
//       'quantidadeEntradas',
//       'quantidadeSaidas',
//       'saldoEstoqueQuantidade',
//     ];
//     if (this.custoMedio) {
//       columns.push('saldoEstoqueValor');
//     }
//     if (this.precoCompraAtual) {
//       columns.push('ultimaAquisicaoPrecoUnitario');
//       columns.push('saldoEstoqueValor');
//     }
//     if (this.custoCompraAtual) {
//       columns.push('ultimaAquisicaoCustoUnitario');
//       columns.push('saldoEstoqueValor');
//     }

//     if (this.custoCompraUltimaData) {
//       columns.push('ultimaAquisicaoPrecoUnitario');
//       columns.push('saldoEstoqueCustoUnitarioAquisicao');
//     }
//     this.displayedColumns = columns;
//   }

//   lista: Estoque[] = []
//   filteredList: Estoque[] = []
//   listaProduto: Produto[] = []

//   constructor(
//     private estoqueService: EstoqueService,
//     private entidadeService: EntidadeService,
//     private produtoService: ProdutoService,

//   ) { }

//   statusControl = new FormControl();

//   filtrarLista() {
//     if (this.pesquisaInput && this.pesquisaInput.length > 0) {
//       this.filteredList = this.lista.filter(item => item.descricao.toLowerCase()
//         .indexOf(this.pesquisaInput.toLowerCase()) > -1);
//     } else {
//       this.filteredList = this.lista;
//     }
//   }

//   async ngOnInit() {

//     this.estabelecimentos = await this.entidadeService.obterListaEntidade();
//     this.dataSource = this.lista
//     this.alteraDisplayedColumns();
//   }

//   async obterPosicao() {
//     this.isLoading = true;
//     const posicao: 'Ambos' | 'ComEstoque' | 'SemEstoque' = this.comEstoque ? (this.semEstoque ? 'Ambos' : 'ComEstoque') : (this.semEstoque ? 'SemEstoque' : null);
//     if (!this.estabelecimentoCnpj) {
//       alert('Selecione um estabelecimento !')
//       return;
//     }
//     if (!this.ordenacao && !this.comEstoque && !this.semEstoque) {
//       alert('Selecione todas as opções abaixo !')
//     }
//     try {
//       this.dataInicial.setHours(0, 0, 0);
//       this.dataFinal.setHours(23, 59, 59);

//       this.lista = await this.estoqueService.obterPosicao(this.pesquisaInput, this.estabelecimentoCnpj, this.dataInicial
//         , this.dataFinal, this.ordenacao, posicao);
//       this.filtrarLista();
//     } catch (err) { }
//     this.isLoading = false;

//   }

//   imprimirRelatorio() {
//     window.print();
//   }

//   @HostListener('click', ['$event'])
//   backDropClick(event: MouseEvent) {
//     this.pesquisaContainerActived = false;
//   }
// }
