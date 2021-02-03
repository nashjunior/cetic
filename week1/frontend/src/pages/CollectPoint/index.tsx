import React, { useEffect, useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

type Items = {
  id: number;
  title: string
  image_url: string;
}

const CollectPoint: React.FC = () => {
  
  const [initialPosition, setinitialPosition] = useState<[number, number]>([-27.2092052,-49.6401092])
  const [items, setItems] = useState<Items[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [collectPoints, setCollectPoints] = useState()
  useEffect(() => {
    async function loadPoints() {

    }

    loadPoints()
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords
      setinitialPosition([latitude, longitude])
    })
  }, [])

  useEffect(() => {
    async function load() {
      const itemsResponse = await api.get<Items[]>('items')
      setItems(itemsResponse.data)
    }

    load();
  }, [])

  function handleSelectedItem(id:number) {
    
    const alreadySelectedItem = selectedItems.findIndex(item => item === id)
    
    if(alreadySelectedItem >= 0 ) {
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems)
    }
    else setSelectedItems([...selectedItems, id])
  }

  return (
    <div id="page-collect-point">
      <Link to="/" className="go-back">
        <span><FiArrowLeft/></span>
      </Link>

      <main>
        {/* <div className="map-content">
            <h2>Bem Vindo</h2>
            <p>Encontre no mapa um ponto de coleta</p>


            <Map center={initialPosition} zoom={15}>
              <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <Marker position={initialPosition}>
              <Popup>
                hehe
              </Popup>
            </Marker>
          
            </Map>


            <ul className='items-grid'>
              {items.map(item => 
                (
                  <li onClick={() => handleSelectedItem(item.id)} className={selectedItems.includes(item.id) ? 'selected': '' }><img src={item.image_url} alt={item.title}/>{item.title}</li>
                )
              )}
              
            </ul>
        </div> */}
            <div className="content-detail-collect-point">
                <img src="https://thumbs.dreamstime.com/z/loja-das-frutas-e-legumes-84826880.jpg" alt="Imagem do "/>
                <h2>Mercadinho o mercado</h2>

                <p>Lampada oleo de cozinha, teste</p>
            </div>
      </main>
      
    </div>
  )
}

export default CollectPoint;