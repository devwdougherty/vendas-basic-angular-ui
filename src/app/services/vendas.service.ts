import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class VendasService {

  private apiUrl = 'http://localhost:8080';

  /**
   * The HttpClient import must be injected at constructor (Angular Dependency Injection).
   * 
   * It's also necessary import your module at app.module.
   */
  constructor(private http: HttpClient) { }

  // A Observable method
  /**
   * Get vendas.
   */
  listarVendas() : Observable<any>{

    console.log("listarVendas()");
    return this.http.get<any[]>(`${this.apiUrl}/vendas`);
  }

  adicionarVendas(venda: any) : Observable<any>{
    
    console.log("adicionarVendas()");
    console.log("objeto a ser salvo: ")
    console.log(venda);

    return this.http.post<any>(`${this.apiUrl}/vendas`, venda);
  }

  /**
   * Get clientes.
   */
  listarClientes() : Observable<any>{

    console.log("listarClientes()");
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }

  /**
   * Get produtos.
   */
  listarProdutos() : Observable<any>{

    console.log("listarProdutos()");
    return this.http.get<any[]>(`${this.apiUrl}/produtos`);
  }
  
}
