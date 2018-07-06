
export interface ClienteNewDTO{
   
         id: string,
         nome:string
         email: string,
         senha: string,
         cpfOuCnpj:string,
         tipo:number,
	     logradouro:string,
         numero:string,
         complemento:string,
         bairro:string,
         cep:string,
         telefone1:string,
         telefone2:string,
         telefone3:string,
         cidade:number,
	
}
export interface Telefone{
    numero:string;
}
    