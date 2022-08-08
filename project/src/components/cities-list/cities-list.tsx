import { Link } from 'react-router-dom';
import {cities} from '../../const';
import {useAppDispatch} from '../../hooks/index';
import { appData } from '../../store/app-data/app-data';

type CitiesListProps = {
  currentCity: string;
}

export default function CitiesList({currentCity}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item" onClick={() => dispatch(appData.actions.changeSelectedCity(city))}>
          <Link className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`} to="">
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
