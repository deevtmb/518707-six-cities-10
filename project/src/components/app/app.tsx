import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  availablePlacesCount: number;
}

function App({availablePlacesCount}: AppScreenProps): JSX.Element {
  return (
    <MainScreen availablePlacesCount={availablePlacesCount} />
  );
}

export default App;
