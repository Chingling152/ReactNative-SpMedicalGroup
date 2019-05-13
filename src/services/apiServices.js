export const ApiRequest = (endpoint) =>{
    const baseURL = "http://http://localhost:5000/api/v1/"
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
        },
        Cadastrar(corpo,token){
            return fetch(baseURL + endpoint,
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(corpo)
                }
            )
        },
        Alterar(token){
            return fetch(baseURL + endpoint,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(corpo)
                }
            )
        }
    }
}