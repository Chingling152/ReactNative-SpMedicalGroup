export const CustomConverter = (data) =>{
    return{
        toDate(){
            return data.split(' ')[0].replace(/-/g,'/')
        }
        ,
        toCpf(){
            if(data !== null){
                let cpf = data.slice(0,3) + '.' + data.slice(3,6) + '.' + data.slice(6,9) + '-' + data.slice(9,11);
                cpf = /([0-9]{3})\.([0-9]{3})\.([0-9]{3})\-([0-9]{2})/.test(cpf)? cpf : "CPF Indisponivel";

                return cpf;
            }else{
                return "CPF invalido"
            }
        }
        ,
        toCrm(){
            if(data !== null){
                let crm = data.slice(0,5) + '-' + data.slice(5,8);
                crm = /([0-9]{5})\-([A-Z]{2})/.test(crm)? crm: 'CRM Indisponivel';

                return crm;
            }   else{
                return "CRM invalido"
            }
        },
        toAge(){
            if(data !== null){
                let idade = new Date(Date.now()).getFullYear() - parseInt(data.split("/")[2])
                return `${idade} ${ idade >1 ? 'anos' : 'ano'}`;
            }else{
                return "Idade invalida"
            }
        },
        toPhone(){
            if(data !== null){
                let telefone = `(${data.slice(0,2)}) ${data.slice(2,7)}-${data.slice(7,12)}`;
                //telefone = /(\()([0-9]{2})(\)) ([0-9]{5})\-([0-9]{4})/.test()? telefone: "Telefone invalido"
                return telefone;
            }else{
                return "Telefone invalido"
            }
        },
        toPostalCode(){
            if(data !== null){
                let cep = data.slice(0,5) + '-' + data.slice(5,9);
                cep = /([0-9]{5})\-([0-9]{3})/.test(cep)? cep: 'CEP invalido';
                return cep;      
            }else{
                return "CEP invalido"
            }
        }
    }
}
