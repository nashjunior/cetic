import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './styles.css'
import logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import {Map, TileLayer, Marker} from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import Dropzone from '../../components/Dropzone'

type Items = {
  id: number;
  title: string
  image_url: string;
}

type IBGEUFResponse = {
  sigla: string;
}

type IBGEMunicipioResponse = {
  nome: string;
}

const CreatePoint: React.FC = () => {

  const [items, setItems] = useState<Items[]>([]);
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [initialPosition, setinitialPosition] = useState<[number, number]>([0,0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedFile, setSelectedFile] = useState<File>()
  const history = useHistory()

  const [selectedUF, setSelectedUF] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
     whatsapp: '',
  })

  useEffect(() => {
    async function load() {
      const itemsResponse = await api.get<Items[]>('items')
      setItems(itemsResponse.data)
    }

    load();
  }, [])

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


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords
      setinitialPosition([latitude, longitude])
    })
  }, [])

  function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUF(event.target.value)
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
    setSelectedCity(event.target.value)
  }

  function handleSelectedPoint(event: LeafletMouseEvent) {
    const {lat, lng} = event.latlng
    setSelectedPosition([lat, lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name,value} = event.target
    setFormData({...formData, [name]:value})
  }

  function handleSelectedItem(id:number) {
    
    const alreadySelectedItem = selectedItems.findIndex(item => item === id)
    
    if(alreadySelectedItem >= 0 ) {
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems)
    }
    else setSelectedItems([...selectedItems, id])
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    const uf = selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems
    const {email, name, whatsapp} = formData
    const data = new FormData();
  
    data.append('email', email)
    data.append('name', name)
    data.append('whatsapp', whatsapp)
    data.append('uf', uf)
    data.append('city', city)
    data.append('latitude', latitude.toString())
    data.append('longitude', longitude.toString())
    data.append('items', items.join(','))
    
    if(selectedFile)
    data.append('image', selectedFile)
    
    await api.post('points', data)
  }

  return(
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Logo Create Point"/>
        <Link to="/">
          <FiArrowLeft/>
          Voltar para Home
        </Link>
      </header>


      <form onSubmit={handleSubmit}>
        <h1>Cadastro do<br/> ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile}/>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input onChange={handleInputChange} type="text" name="name"/>
          </div>
          

          <div className="field-group">
            <div className="field"><label htmlFor="email">Email</label>
            <input onChange={handleInputChange} type="email" name="email"/>
            </div>
            <div className="field"><label htmlFor="whatsapp">Whatsapp</label>
            <input onChange={handleInputChange} type="text" name="whatsapp"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>

          <span>Selecione o endereço do mapa</span>
          <Map center={initialPosition} zoom={15} onclick={handleSelectedPoint}>
            <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Marker position={selectedPosition} />
          </Map>

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

        <fieldset>
          <legend>
            <h2>Itens de Coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className='items-grid'>
            {items.map(item => 
              (
                <li onClick={() => handleSelectedItem(item.id)} className={selectedItems.includes(item.id) ? 'selected': '' }><img src={item.image_url} alt={item.title}/>{item.title}</li>
              )
            )}
            
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}

export default CreatePoint