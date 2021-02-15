import React from 'react'
import './styles.css'
import mapMarkerImg from '../../assets/images/map-marker.svg'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const OrphanagesMap:React.FC = () => {
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
      </MapContainer>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  )
}

export default OrphanagesMap;