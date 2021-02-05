import React, { useEffect, useState } from 'react'
import './styles.css'
import { useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

type Items = {
  id: number;
  title: string
  image_url: string;
}

type Points = {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

type PointSelected = {
  point: {
    image: string;
    image_url:string;
    name: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string
  }[]
}

type CollectPointProps = {
  city: string;
  uf: string;
}

const CollectPoint: React.FC = () => {
  
  const {state}= useLocation<CollectPointProps>()
  const {city, uf} = state
  
  
  const [initialPosition, setinitialPosition] = useState<[number, number]>([-27.2092052,-49.6401092])
  const [items, setItems] = useState<Items[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [collectPoints, setCollectPoints] = useState<Points[]>([])
  const [selectedCollectPoint, setSelectedCollectPoint] = useState<PointSelected>({} as PointSelected)
  const history = useHistory()

  const [isCollectedPointSelected, setIsCollectedPointSelected] = useState<boolean>()

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get<Points[]>('points', {
        params: {
          city,
          uf,
          items: selectedItems
        }
      })

      setCollectPoints(response.data)
    }

    loadPoints()
  }, [city, uf, selectedItems])

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

  function handleClickToMain() {
    if(!!isCollectedPointSelected) setIsCollectedPointSelected(false);
    else history.push('/')
  }

  async function handleClickSelectedCollectPoint(id: number) {
    const filteredCollectedPoint = collectPoints.find(collectPoint => collectPoint.id === id)
    
    if(filteredCollectedPoint) {
      const point = await api.get<PointSelected>(`points/${id}`)
      
      setSelectedCollectPoint(point.data)
      setIsCollectedPointSelected(true);
    }
  }  
  
  return (
    <div id="page-collect-point">
      <button onClick={handleClickToMain} className="go-back">
        <span><FiArrowLeft/></span>
      </button>

      <main>
        {!isCollectedPointSelected && (
          <div className="map-content">
          <h2>Bem Vindo</h2>
          <p>Encontre no mapa um ponto de coleta</p>


          <Map center={initialPosition} zoom={15}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              collectPoints.map(collectPoint => (
                <Marker key={collectPoint.id.toString()} position={[collectPoint.latitude, collectPoint.longitude]}>
                  <Popup>
                    <div onClick={() => handleClickSelectedCollectPoint(collectPoint.id)
                    }>
                      <img src={collectPoint.image} alt="Imagem do ponto de coleta"/>
                      <p>{collectPoint.name}</p>
                    </div>
                  </Popup>
                </Marker>
              ))
            }
            
          </Map>


          <ul className='items-grid'>
            {items.map(item => 
              (
                <li onClick={() => handleSelectedItem(item.id)} className={selectedItems.includes(item.id) ? 'selected': '' }><img src={item.image_url} alt={item.title}/>{item.title}</li>
              )
            )}
            
          </ul>
        </div>
        )
        }
         {
           isCollectedPointSelected && (
            <div className="content-detail-collect-point">
              <img src={selectedCollectPoint.point.image_url} alt="Imagem do Ponto"/>

              <div className="collect-point-name">
                <h2>{selectedCollectPoint.point.name}</h2>
                <p>{selectedCollectPoint.items.map(item => item.title).join(',')}</p>
              </div>
              <div className="collect-point-properties">
                <h4>Endereço</h4>
                <p>{`${selectedCollectPoint.point.city}, ${selectedCollectPoint.point.uf}`}</p>
                <p>Telefone: <a href={`tel:${selectedCollectPoint.point.whatsapp}`}>{selectedCollectPoint.point.whatsapp}</a></p>
              </div>
            </div>
           )
         }
      
      </main>
    </div>
  )
}

export default CollectPoint;