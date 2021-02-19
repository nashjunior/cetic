import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router';
import LocationMarker from '../../components/LocationMarker';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import './styles.css'

const CreateOrphanage :React.FC = () => {
  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });
  const [ name, setName ] = useState('');
  const [initialPosition, setinitialPosition] = useState<[number, number]>([0,0])
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ opening_hours, setOpening_hours ] = useState('');
  const [ open_on_weekends, setOpen_on_weekends ] = useState(true);
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);
  const history = useHistory();
  
  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) {
      return;
    }
    
    const selectImages = Array.from(e.target.files)
    
    setImages(selectImages)

    const selectImagesPreview = selectImages.map(image => {
      return URL.createObjectURL(image)
    });

    setPreviewImages(selectImagesPreview);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { latitude, longitude }  = position

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => data.append('images', image));


    await api.post('/orphanages', data)

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords
      setinitialPosition([latitude, longitude])
    })
  }, [])

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer  
              center={initialPosition} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

              
                  <LocationMarker onClick={setPosition} position={[position.latitude, position.longitude]} interactive={false}/>
                
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                value={about} 
                onChange={e => setAbout(e.target.value)} 
                maxLength={300} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img key={image} src={image} alt={name}/>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>    

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={e => setInstructions(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={e => setOpening_hours(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active': ''}
                  onClick={()=> setOpen_on_weekends(true)}
                >
                  Sim
                </button>

                <button 
                  type="button"
                  className={!open_on_weekends ? 'active': ''} 
                  onClick={()=> setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage