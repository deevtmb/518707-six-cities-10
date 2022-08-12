import {SortOption} from '../../const';
import {MouseEvent} from 'react';

type SortOptionsProps = {
  onSortOptionClick: (sortOptionName: string) => void;
  currentSortOption: string;
}

export default function SortOptions({onSortOptionClick, currentSortOption}: SortOptionsProps) {
  const handleSortOptionClick = (evt: MouseEvent<HTMLElement>) => {
    onSortOptionClick(evt.currentTarget.innerText);
  };

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {Object.values(SortOption).map((option) => (
        <li
          key={option}
          className={`places__option ${option === currentSortOption ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={handleSortOptionClick}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
