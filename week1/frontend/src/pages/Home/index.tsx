import React, { ChangeEvent, useEffect, useState } from 'react'
import './styles.css'
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom'
import {FiArrowLeft, FiLogIn, FiSearch} from 'react-icons/fi'
import axios from 'axios';


type IBGEUFResponse = {
  sigla: string;
}

type IBGEMunicipioResponse = {
  nome: string;
}

const Home:React.FC = () => {

  const [isCollectPoint, setIsCollectPoint] = useState(false)

  function handleCollectPont() {
    setIsCollectPoint(!isCollectPoint)
  }

  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUF, setSelectedUF] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')


  useEffect(() => {
    async function loadIBGE() {
      const ibgeResponse = await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      const formatedIbgeResponse = ibgeResponse.data.map(uf => uf.sigla)
      setUfs(formatedIbgeResponse)
    }

    loadIBGE()
  }, [])


  useEffect(() => {
    async function load() {
      if(selectedUF === '0') return;

      const ibgeMunicipiosResponse = await axios.get<IBGEMunicipioResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      const citynames = ibgeMunicipiosResponse.data.map(city => city.nome)
      setCities(citynames)
    }

    load()
  }, [selectedUF])

  function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUF(event.target.value)
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
    setSelectedCity(event.target.value)
  }


  return(
    <div id="page-home">
      <div className="content">
        <header><img src={logo} alt="Logo Home"/></header>
        
        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>


          {!isCollectPoint && (
            <>
            <Link to="/create-point">
            <span><FiLogIn/></span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>

          <button onClick={handleCollectPont}>
            <span><FiSearch/></span>
            <strong>Procurar ponto de coleta</strong>
          </button>
          </>
          )}

          {isCollectPoint &&(
            <>
            <form>
            <fieldset>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="uf">
                    Estado (uf)
                    <select name="uf" id="uf" value={selectedUF} onChange={handleSelectedUF}>
                      <option value="0">Selecione uma uf</option>
                      {ufs.map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="city">
                    Cidade
                    <select name="city" value={selectedCity} id="city" onChange={handleSelectedCity}>
                      <option value="0">Selecione uma cidade</option>
                      {
                        cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))
                      }
                    </select>
                  </label>
                </div>
              </div>
            </fieldset>

            <footer>
              <button onClick={handleCollectPont}>
              <span><FiArrowLeft/></span>
              <strong>Voltar</strong>
            </button>

            <Link to="/collect-point">
              <span><FiLogIn/></span>
              <strong>Entrar</strong>
            </Link>
            </footer>
            
          
        </form>
            </>
          )}
          
        </main>
      </div>
    </div>
  )
}

export default Home; 