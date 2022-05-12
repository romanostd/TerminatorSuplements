// import { HttpClient } from '@angular/common/http';
// import { Inject, Injectable, Optional } from '@angular/core';
// import { Pessoa } from '@nsinova/cadastramento';
// import { IPessoa } from '@nsinova/cadastramento';
// import { IResultadoProcessamento, ResultadoProcessamento } from '@nsinova/comum';
// import { ObjetoPesquisa } from '../modelo/objeto-pesquisa';

// const service = {
//     name: 'Cliente',
//     url: 'cliente'
// }
// @Injectable()
// export class ClienteService {
//     API_URL = this.baseUrl + '/relcomercial/api/' + service.url;
//     constructor(
//         private http: HttpClient,
//         @Optional()
//         @Inject('API_BASE_URL')
//         private baseUrl: string,
//     ) { }
//     /** Obter lista de pessoas com cadastro de Cliente  */
//     async obterLista(
//         query: string,
//         status?: 'A' | 'I',
//         pos_inicial?,
//         qtde_registros?,
//         order?: any,
//     ) {
//         const endpoint = this.API_URL + `/obterLista`
//         const params: any = {
//             texto_pesquisa: query,
//         }
//         if (status) {
//             params.status = status
//         }
//         if (pos_inicial) {
//             params.pos_inicial = pos_inicial
//         }
//         if (qtde_registros) {
//             params.qtde_registros = qtde_registros
//         }
//         if (order) {
//             params.order = JSON.stringify(order)
//         }
//         return await this.http.get<IPessoa[]>(endpoint, {
//             params: params,
//         }).toPromise()
//             .then(result => result ? result.map(p => new Pessoa(p)) : null);
//     }
//     async obterPorId(id: string) {
//         const endpoint = this.API_URL + `/obterPorId`
//         const params: any = {
//             id,
//         }
//         return await this.http.get<IPessoa>(endpoint, {
//             params: params,
//         }).toPromise()
//             .then(result => result ? new Pessoa(result) : null);
//     }
//     /**
//      * Manter Pessoa com Objeto de Cliente
//      */
//     async manter(pessoa: IPessoa) {
//         const endpoint = this.API_URL + `/manter`
//         return await this.http.post<IResultadoProcessamento<void>>(endpoint, pessoa).toPromise()
//             .then(result => result ? new ResultadoProcessamento(result) : null);
//     }

//     async inativarAtivarCliente(pessoa: Pessoa) {
//         if (pessoa.cliente.status === 'A') {
//             pessoa.notificaAtributoModificado('cliente');
//             pessoa.cliente.status = 'I'
//         } else if (pessoa.cliente.status === 'I') {
//             pessoa.cliente.status = 'A'
//         }
//         this.manter(pessoa);
//         pessoa.situacao = 'Inalterado';
//         pessoa.cliente.situacao = 'Inalterado';
//         // this.lista = this.lista.filter(lt => {
//         //     if (this.statusControl.value != null) {
//         //         return lt.cliente.status === this.statusControl.value;
//         //     } else {
//         //         return lt
//         //     }
//         // })
//         // const pessoaAtualizada: Pessoa = await this.clienteServico.obterPorId(pessoa.id);
//         /// pessoa.fromRaw(pessoaAtualizada);
//     }

//     async importarPlanilha(objeto_pesquisa: ObjetoPesquisa) {
//         const endpoint = this.API_URL + `/manter`


//         return await this.http.post<any>(endpoint, objeto_pesquisa).toPromise()

//     }
// }