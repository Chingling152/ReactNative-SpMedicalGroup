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
                return "CPF Indisponivel"
            }
        }
        ,
        toCrm(){
            if(data !== null){
                let crm = data.slice(0,5) + '-' + data.slice(5,8);
                crm = /([0-9]{5})\-([A-Z]{2})/.test(crm)? crm: 'CRM Indisponivel';

                return crm;
            }   else{
                return "CRM Indisponivel"
            }
        }
    }
}
