import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, Offer} from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  additionalClass: string;
  activeOffer: Offer | null;
};

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const activeIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

export default function Map({city, offers, additionalClass, activeOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (map) {
        offers.forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });

          marker.setIcon(
            activeOffer !== null && offer.id === activeOffer.id ? activeIcon : defaultIcon
          ).addTo(map);
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [map, offers, activeOffer]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (map) {
        map.setView({
          lat: city.location.latitude,
          lng: city.location.longitude
        }, city.location.zoom);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [city, offers, map]);

  return <section className={`map ${additionalClass}`} ref={mapRef} data-testid="map"></section>;
}
