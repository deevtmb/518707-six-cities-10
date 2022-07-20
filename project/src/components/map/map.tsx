import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {City, Offer} from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
};

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({city, offers}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(defaultIcon).addTo(map);
      });
    }
  }, [map, offers]);

  return <section className="cities__map map" id="map" ref={mapRef}></section>;
}
