import React, { useEffect, useState } from 'react'
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useParams } from 'react-router';
import api from '../../services/api';
import './styles.css'
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '../../components/LocationMarker';
import Sidebar from '../../components/Sidebar';

interface IOrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: [{
    id: number;
    url: string;
  }]
}

interface IOrphanageParams {
  id: string;
}

const Orphanage:React.FC = () => {
  const { id } = useParams<IOrphanageParams>();  
  const [orphanage, setOrphanage] = useState<IOrphanageProps>();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(()=> {
    api.get(`/orphanages/${id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [id]);

  if(!orphanage) {
    return <p>Loading...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
      
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImage].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                  onClick={() => setActiveImage(index)}
                  key={image.id} 
                  className={activeImage === index ? 'active' : ''}
                  type="button"
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={15} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
                <LocationMarker position={[orphanage.latitude,orphanage.longitude]} />
              </MapContainer>

              <footer>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}

             
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orphanage