import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Logo from '../../components/logo/logo';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div style={{margin: '25vh auto 0', width: '50%', textAlign: 'center', fontSize: '30px'}}>
      <Logo />
      <p style={{fontSize: '8vw', margin: '0 auto'}}>404</p>
      <p>This page doesn&apos;t exist</p>
      <Link style={{color: '#4481c3'}} to={AppRoute.Main}>Return to Main page</Link>
    </div>
  );
}
