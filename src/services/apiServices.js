export const ApiRequest = (endpoint) =>{
    const baseURL = "http://192.168.15.13:5000/api/v1/"//mude para o seu ip aqui
    return {
        Listar(){
            return fetch(baseURL + endpoint,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
        },
        Listar(token){
            return fetch(baseURL + endpoint,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        "Authorization": "Bearer " + token
                    }
                }
            )
        },
        Cadastrar(corpo){
            return fetch(baseURL + endpoint,
                {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(corpo)
                }
            )
        }
    }
}