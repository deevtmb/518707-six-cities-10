import {TailSpin} from 'react-loader-spinner';

export default function LoadingLayout() {
  return (
    <div
      className="spinner"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <TailSpin color="#4481c3" height="150" width="150" />
    </div>
  );
}
