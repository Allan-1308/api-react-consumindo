import { useState } from "react"
import type {Cep} from "./types/Cep"
import api from "./services/api"
import "./style.css"

export function Project() {
    const[cep,setCep] = useState<string>("")
    const[endereco,setEndereco] = useState<Cep | null> (null)
    const[erro, setErro] = useState<string>("")

async function buscaCep() {
    if (cep.length !== 8) {
        setErro ("O CEP deve conter exatamente 8 números.")
        setEndereco(null)
        return}
    try{
    setErro("")
    const Response = await api.get(`/${cep}/json`)
    setEndereco(Response.data)
    }
    catch{
        setErro("Cep inválido. Digite novamente")
        setEndereco(null)
    }
}

    return(
        <div className="container">
            <div className="card">
                <h1>Consulta CEP</h1>
            <div className="search-box">
        
            <input className="search"
            value={cep}
            max={8}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Digite o CEP c/ 8 números"
            onChange={e => {const value = e.target.value.replace(/\D/g, "")
                setCep(value)
            }}
            />

            <button onClick={buscaCep}>Consultar</button>
            
            
            </div>
            
            {erro && <p style={{color:"red"}}>{erro}</p>}

            {endereco &&(
                <div className="result">
                    <p>Cep: {endereco.cep}</p>
                    <p>Endereço: {endereco.logradouro}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>Uf: {endereco.uf}</p>
                    <p>DDD: {endereco.ddd}</p>
                    <p>Regiao: {endereco.regiao}</p>


                </div>
            )}
        </div>
        </div>
        
    )
}