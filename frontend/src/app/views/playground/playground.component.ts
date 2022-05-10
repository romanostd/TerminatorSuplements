// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { BoletoComponent } from '../boleto/boleto.component';
// import { MatDialog } from '@angular/material';
// import { ChequeComponent } from '../cheque/cheque.component';
// import { IPessoa } from '@nsinova/cadastramento';
// import { ITipoDespesa, TipoDespesaService } from '@nsinova/geral';
// import { IMeioLiquidacao, IRecorrencia, MeioLiquidacaoService, Recorrencia, } from '@nsinova/recorrencia';
// import { FornecedorService } from '@nsinova/relcomercial';

// @Component({
//   selector: 'app-contrato-fornecimento',
//   templateUrl: './contrato-fornecimento.component.html',
//   styleUrls: ['./contrato-fornecimento.component.scss']
// })
// export class ContratoFornecimentoComponent implements OnInit {
//   codigoFilial: string
//   registro?: IRecorrencia;
//   listaTipoDespesa: ITipoDespesa[] = [];
//   listaMeioLiquidacao: IMeioLiquidacao[] = [];
//   listaFornecedor: IPessoa[] = [];

//   constructor(

//     private fornecedorService: FornecedorService,
//     private obterTipoDespesa: TipoDespesaService,
//     private obterMeioLiquidacaoService: MeioLiquidacaoService,
//     private fb: FormBuilder,
//     private salvar: TipoDespesaService,
//     public dialog: MatDialog,
//   ) {
//     this.registro = new Recorrencia({
//       situacao: 'Novo',

//     } as IRecorrencia);
//     (this.registro as Recorrencia).bindForm(this.form);

//     if (this.registro && this.registro.tipoDespesa) {
//       this.listaTipoDespesa = [this.registro.tipoDespesa];
//     }
//     if (this.registro && this.registro.meioLiquidacao) {
//       this.listaMeioLiquidacao = [this.registro.meioLiquidacao];
//     }
//   }

//   form: FormGroup = this.fb.group({
//     TipoDespesa: ['', []],
//     tipoDespesa: ['', [Validators.required]],
//     meioLiquidacao: ['', [Validators.required]],
//     emitente: ['', []],
//     dataInicial: ['', [Validators.required]],
//     numeroParcelas: ['', [Validators.pattern, Validators.required]],
//     mesReajuste: ['', [Validators.pattern, Validators.required]],
//     observacao: ['', []],
//     valorDespesa: ['', [Validators.required]],
//   })

//   async save() {
//     if (this.form.invalid) return;

//     if (this.form.dirty) {
//       if (this.registro.situacao === 'Novo') {
//         if (!this.registro.atributosModificados)
//           this.registro.atributosModificados = [];

//         if (this.form.controls.tipoDespesa.dirty) {
//           this.registro.atributosModificados.push('tipo_despesa')
//         }

//         if (this.form.controls.emitente.dirty) {
//           this.registro.atributosModificados.push('emitente')
//         }

//         if (this.form.controls.meioLiquidacao.dirty) {
//           this.registro.atributosModificados.push('meio_liquidacao')
//         }

//         if (this.form.controls.dataInicial.dirty) {
//           this.registro.atributosModificados.push('data_Inicial')
//         }

//         if (this.form.controls.numeroParcelas.dirty) {
//           this.registro.atributosModificados.push('numero_parcelas')
//         }

//         if (this.form.controls.mesReajuste.dirty) {
//           this.registro.atributosModificados.push('mes_reajuste')
//         }

//         if (this.form.controls.observacao.dirty) {
//           this.registro.atributosModificados.push('observacao')
//         }
//         if (this.form.controls.valorDespesa.dirty) {
//           this.registro.atributosModificados.push('valor_despesa')
//         }

//       }

//       Object.assign(this.registro, this.form.getRawValue());
//       // this.registro.dataInicial = // format
//       console.log(this.form.getRawValue());


//       const registroManter: IRecorrencia = {
//         situacao: this.registro.situacao,
//         atributosModificados: this.registro.atributosModificados,
//         tipoDespesa: this.registro.tipoDespesa,
//         meioLiquidacao: this.registro.meioLiquidacao,
//         emitente: (this.registro.emitente as any).id,
//         dataInicial: this.registro.dataInicial,
//         numeroParcelas: this.registro.numeroParcelas,
//         mesReajuste: this.registro.mesReajuste,
//         observacao: this.registro.observacao,
//         valorDespesa: this.registro.valorDespesa,
//         filial: this.codigoFilial
//       } as IRecorrencia;
//       await this.salvar.obterLista(registroManter);
//       alert("Sucesso ao Manter Recorrência")
//       this.form.reset();
//       ;
//     }
//   }

//   get formaPagamentoDisabled() {
//     if (
//       !this.form.controls.valorDespesa.value || this.form.controls.valorDespesa.value === '' &&
//       !this.form.controls.dataInicial.value || this.form.controls.dataInicial.value === '' &&
//       !this.form.controls.numeroParcelas.value || this.form.controls.numeroParcelas.value === '') {
//       return true;
//     }
//     return false;
//   }

//   get ifBoleto() {
//     if (!this.form.controls.meioLiquidacao.value) {
//       return true;
//     }
//     return false;
//   }
//   get ifCheque() {
//     if (!this.form.controls.meioLiquidacao.value) {
//       return true;
//     }
//     return false;
//   }

//   onChange(valor: any) {
//     if (this.registro) {
//       Object.assign(this.registro, valor)
//     }
//   }

//   openDialog(registro?: IRecorrencia) {
//     this.dialog.open(BoletoComponent,
//       {
//         data: registro,
//         disableClose: true,
//       });
//   }

//   openDialogCheque(registro?: IRecorrencia) {
//     this.dialog.open(ChequeComponent,
//       {
//         data: registro,
//         disableClose: true,
//       })
//   }

//   async carregarFornecedor(query: string) {
//     this.listaFornecedor = await this.fornecedorService.obterLista(query)
//     return this.listaFornecedor;

//   }
//   async carregarMeioLiquidacao() {
//     this.listaMeioLiquidacao = (await this.obterMeioLiquidacaoService.obterLista()).map(
//       ml => {
//         if (this.registro && this.registro.meioLiquidacao && ml.codigo === this.registro.meioLiquidacao.codigo) {
//           return this.registro.meioLiquidacao;
//         }
//         return ml;
//       }
//     )
//   }
//   async carregartipoDespesa(filtro: string) {
//     this.listaTipoDespesa = (await this.obterTipoDespesa.obterLista(filtro)).map(
//       ct => {
//         if (this.registro && this.registro.tipoDespesa && ct.conta === this.registro.tipoDespesa.conta) {
//           return this.registro.tipoDespesa;
//         }
//         return ct;
//       }
//     )
//   }

//   async ngOnInit() {
//     this.carregarMeioLiquidacao();
//     this.carregartipoDespesa('');
//     this.form.valueChanges.subscribe(value => this.onChange(value));

//     this.form.controls.meioLiquidacao.valueChanges.subscribe(v => {
//       this.isBoleto = v.codigo === 'Bol';
//       if (v.codigo === 'Bol' && this.registro) {
//         this.openDialog(this.registro);
//       }
//     });

//     this.form.controls.meioLiquidacao.valueChanges.subscribe(v => {
//       this.isCheque = v.codigo === 'CH';
//       if (v.codigo === 'CH' && this.registro) {
//         this.openDialogCheque(this.registro);
//       }
//     });

//   }
//   isBoleto = false;
//   isCheque = false;
// }

