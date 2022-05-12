// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { IChequeRecebimento } from '../../models/i-cheque-recebimento';
// import { IEndereco } from '../../models/i-endereco';
// import { IFechamentoOperacao } from '../../models/i-fechamento-operacao';
// import { IInformacaoNotaEletronica } from '../../models/i-informacao-nota-eletronica';
// import { IInformacaoTransporte } from '../../models/i-informacao-transporte';
// import { IMunicipio } from '../../models/i-municipio';
// import { IPedidoAtendimento } from '../../models/i-pedido-atendimento';
// import { IPessoa } from '../../models/i-pessoa';
// import { ITipoLogradouro } from '../../models/i-tipo-logradouro';
// import { IEncerramentoDto } from '../../services/rest/dto/i-encerramento.dto';
// import { EnderecoService } from '../../services/rest/endereco.service';
// import { format } from 'date-fns';
// import { ViewChild } from '@angular/core';
// import { PagamentoComponent } from '../pagamento/pagamento.component';
// import { PessoaService } from '../../services/rest/Pessoa.service';
// import { PedidoService } from '../../services/rest/Pedido.service';

// @Component({
//   selector: 'lib-pedido-encerramento',
//   templateUrl: './pedido-encerramento.component.html',
//   styleUrls: ['./pedido-encerramento.component.scss']
// })
// export class PedidoEncerramentoComponent implements OnInit {
//   // prazo: string;
//   separador: string = '/';
//   listaCheques: IChequeRecebimento[];
//   modalidade_pagamento_boleto: boolean;
//   modalidade_pagamento_carteira: boolean;
//   modalidade_pagamento_dinheiro: boolean;
//   alternativasPagamento: string;
//   modalidadeFrete: string;
//   entrada: boolean = false;
//   dataBase = new Date();
//   pessoaForm: FormGroup = this.formBuilder.group({
//     situacao: ['Novo', []],
//     caracterizacaoLegal: ['', [Validators.required]],
//     inscricaoEstadual: ['', [Validators.required]],
//     cnpjcpf: ['', [Validators.required]],
//     nomeCompleto: ['', [Validators.required]],
//     valorFrete: ['', [Validators.required]],
//     enderecoBase: this.formBuilder.group({
//       situacao: 'Novo',
//       complemento: ['', []],
//       logradouro: ['', []],
//       tipoLogradouro: ['', []],
//       municipio: ['', []],
//       // uf: [, []],
//       cep: ['', []],
//       bairro: ['', []],
//       numero: ['', []],
//     }),
//   });

//   @ViewChild('pagamento', { static: false })
//   pagamento: PagamentoComponent;

//   enderecoPessoaTransporte: IEndereco;
//   volumeForms: FormGroup = this.formBuilder.group({
//     volumeQuantidade: ['', []],
//     volumeEspecie: ['', []],
//     volumeMarca: ['', []],
//     volumeNumeracao: ['', []],
//     volumePesoBruto: ['', []],
//     volumePesoLiquido: ['', []],
//   });
//   valor: any;
//   observacoes: FormControl = this.formBuilder.control('', []);
//   tipoLogradouros: ITipoLogradouro[];
//   municipios: IMunicipio[];

//   get tituloCnpjCpf() {
//     if (this.pessoaForm.controls.caracterizacaoLegal.value === 'F') {
//       return 'CPF';
//     } else if (this.pessoaForm.controls.caracterizacaoLegal.value === 'J') {
//       return 'CNPJ';
//     }
//     return 'CNPJ/CPF';
//   }

//   get tituloFormatter() {
//     if (this.pessoaForm.controls.caracterizacaoLegal.value === 'F') {
//       return '000.000.000-99';
//     } else if (this.pessoaForm.controls.caracterizacaoLegal.value === 'J') {
//       return '00.000.000/0000-99';
//     }
//     return '00.000.000/0000-99';
//   }

//   get total() {
//     let total = 0;
//     this.atendimento.pedidoItensAtendimento.forEach(
//       pedidoItemAtendimento => {
//         total += pedidoItemAtendimento.quantidade * pedidoItemAtendimento.pedidoItem.valorUnitario
//       }
//     );
//     return total;
//   }
//   async obterEnderecoPorCep() {
//     const cep = this.pessoaForm.get('enderecoBase').get('cep').value;
//     const endereco = await this.enderecoServico.obterEnderecoPorCep(cep);
//     this.enderecoPessoaTransporte = endereco;
//     this.pessoaForm.controls.enderecoBase.reset({
//       logradouro: this.enderecoPessoaTransporte.logradouro,
//       tipoLogradouro: this.enderecoPessoaTransporte.tipoLogradouro.descricao,
//       municipio: this.enderecoPessoaTransporte.municipio.nome,
//       cep: this.enderecoPessoaTransporte.cep,
//       bairro: this.enderecoPessoaTransporte.bairro,
//     })
//     // this.pessoaForm.get('enderecoBase').reset(
//     //   endereco
//     // );
//   }
//   constructor(
//     private pedidoService: PedidoService,
//     private pessoaService: PessoaService,
//     private enderecoServico: EnderecoService,
//     private dialogRef: MatDialogRef<PedidoEncerramentoComponent>,
//     private formBuilder: FormBuilder,
//     @Inject(MAT_DIALOG_DATA)
//     private atendimento: IPedidoAtendimento,
//   ) { }
//   ngOnInit() {
//   }
//   // prazoChange() {
//   //   this.atualizaTela();
//   // }
//   /* atualizaTela() { // metodo antigo
//     if (this.prazo.indexOf("/") > -1) {
//       this.separador = "/";
//     }
//     else if (this.prazo.indexOf("\\ ") > -1) {
//       this.separador = "\\";
//     }
//     else if (this.prazo.indexOf("-") > -1) {
//       this.separador = "-";
//     }
//     else if (this.prazo.indexOf(" ") > -1) {
//       this.separador = " ";
//     }
//     if (this.prazo.toLowerCase() === 'n') {

//     } else if (this.prazo.toLocaleLowerCase() === '0/n') {

//     } else if (this.prazo !== '0') {
//       const dias = this.prazo.split(this.separador);

//     }
//     if (this.prazo === '0') {
//       // É em dinehiro ou em Cheque
//       this.modalidade_pagamento_boleto = false;
//       this.modalidade_pagamento_carteira = true;
//       this.modalidade_pagamento_dinheiro = true;
//       this.entrada = false;
//     }
//   } */

//   async carregaInformacoesEndereco() {
//     this.municipios = [];
//     //await this.enderecoServico.obterListaMunicipios('');
//     this.tipoLogradouros = await await this.enderecoServico.obterTiposLogradouros();
//   }

//   async resetPessoa(cnpjCpf?: string) {
//     cnpjCpf = cnpjCpf.replace(/[^0-9]/gi, '');
//     if (!cnpjCpf) return;
//     const pessoa = await this.pessoaService.obterPorCnpjCpf(cnpjCpf);
//     Object.assign(pessoa, await this.pessoaService.obterPorId(pessoa.id));
//     this.pessoaForm.reset({
//       caracterizacaoLegal: pessoa.caracterizacaoLegal,
//       inscricaoEstadual: pessoa.inscricaoEstadual,
//       cnpjcpf: pessoa.cnpjcpf,
//       nomeCompleto: pessoa.nomeCompleto,
//       valorFrete: this.valor,
//       enderecoBase: {
//         logradouro: pessoa.enderecoBase.logradouro,
//         tipoLogradouro: pessoa.enderecoBase.tipoLogradouro.descricao,
//         municipio: pessoa.enderecoBase.municipio.nome,
//         cep: pessoa.enderecoBase.cep,
//         bairro: pessoa.enderecoBase.bairro,
//       }
//     })
//   }

//   async obterPessoa() {
//     const pessoaFormRawData = this.pessoaForm.getRawValue();
//     const pessoa: IPessoa = {
//       cnpjcpf: pessoaFormRawData.cnpjcpf,
//     } as IPessoa;
//     return pessoa;
//   }

//   async concluir() {
//     const pessoaTransportador: IPessoa = await this.obterPessoa();
//     if (this.enderecoPessoaTransporte) {
//       pessoaTransportador.enderecoBase = this.enderecoPessoaTransporte;
//       pessoaTransportador.enderecoBase.numero = this.pessoaForm.get('enderecoBase').get('numero').value;
//       pessoaTransportador.enderecoBase.complemento = this.pessoaForm.get('enderecoBase').get('complemento').value;
//     }

//     const informacaoNotaEletronica: IInformacaoNotaEletronica = {
//       informacaoTransporte: {
//         modalidadeFrete: this.modalidadeFrete,
//         transportador: {
//           pessoa: pessoaTransportador
//         },
//         ...this.volumeForms.getRawValue()
//       } as IInformacaoTransporte,
//       observacoes: this.observacoes.value,
//     } as IInformacaoNotaEletronica;
//     const encerramento: IEncerramentoDto = {
//       pedidoAtendimento: this.atendimento,
//       fechamentoOperacao: {
//         formasFechamento: [
//           ...this.pagamento.fechamento
//           // {
//           //   meioPagamentoDescricao: 'Dinheiro',
//           //   situacao: 'Novo',
//           //   meioPagamentoCodigo: '$',
//           //   valor: this.total,
//           // }
//         ],
//         operacao: 'R',
//         documentoOrigemTipo: 'DF',
//         situacao: 'Novo',
//         estabelecimentoCodigo: this.atendimento.pedido.estabelecimento.codigo,
//         data: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
//         documentoOrigemIdentificador: String(this.atendimento.pedido.numero),
//         pessoaID: this.atendimento.pedido.pessoa.id ? this.atendimento.pedido.pessoa.id : '',
//       } as IFechamentoOperacao,
//       informacaoNotaEletronica: informacaoNotaEletronica,
//     };
//     const mensagem: any = await this.pedidoService.encerrar(encerramento);
//     this.dialogRef.close(mensagem);
//   }
//   async cancelar() {
//     this.dialogRef.close();
//   }
// }
