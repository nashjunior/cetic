import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import Leaflet from 'leaflet'
import mapMarkerImg from '../../assets/images/map-marker.svg'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import './styles.css'

type LatLong = [number, number]

type ILocationMarkerProps = {
  interactive?: boolean;
  position: LatLong;
  onClick?: (latlong: {latitude: number, longitude: number}) => void
}


const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29,68],
  popupAnchor: [170, 2]
})

const LocationMarker: React.FC<ILocationMarkerProps> = ({position,interactive = true, onClick}) => {
  const map = useMapEvents({
    click(event) {
      if(onClick) {
        const {lat: latitude, lng: longitude}= event.latlng
        onClick({latitude, longitude})
      }
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    map.locate()
  }, [map])

  if(!interactive){
    if(position[0] !== 0 && position[1]!== 0) 
      return(
        <Marker interactive={interactive} position={position} icon={mapIcon}/>
      )
    else return <> </>
  }
  return  (
    <Marker position={position} icon={mapIcon}>
      <Popup className="map-popup" closeButton={false} minWidth={240} maxHeight={240}>
        You are here
        <Link to="">
          <FiArrowRight size={20} color="#fff"/>
        </Link>
      </Popup>
    </Marker>
  )
  /* return position === null ? null : !interactive ? (
    <Marker interactive={interactive} position={selectedPosition} icon={mapIcon}>
      <Popup className="map-popup" closeButton={false} minWidth={240} maxHeight={240}>
        You are here
        <Link to="">
          <FiArrowRight size={20} color="#fff"/>
        </Link>
      </Popup>
    </Marker>
  ) : (
    <Marker position={selectedPosition} icon={mapIcon}>
      {
        !canClick && (
        <Popup className="map-popup" closeButton={false} minWidth={240} maxHeight={240}>
          You are here
          <Link to="">
            <FiArrowRight size={20} color="#fff"/>
          </Link>
        </Popup>
        )
      }
    </Marker>
  ) */
}

export default LocationMarker