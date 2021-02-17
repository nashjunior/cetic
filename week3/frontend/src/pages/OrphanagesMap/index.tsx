import React, { useEffect, useState } from 'react'
import './styles.css'
import mapMarkerImg from '../../assets/images/map-marker.svg'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from '../../components/LocationMarker'
import api from '../../services/api'


interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap:React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    async function load() {
      const response = await api.get<Orphanage[]>("orphanages");
      setOrphanages(response.data);
      
    }
    load()
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happi"/>
          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer><strong>Fortaleza</strong><span>Ceara</span></footer>
      </aside>

      <MapContainer center={[-3.7917793,-38.5165226]} zoom={15} style={
        {
          width: '100%',
          height: '100%'
        }
      }>
           <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

      {orphanages.map(orphanage => {
        return (
          <LocationMarker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]}/>
        )
      })}

      </MapContainer>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  )
}

export default OrphanagesMap;