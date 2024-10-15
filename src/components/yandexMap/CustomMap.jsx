import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

function CustomMap() {
  return (
    <YMaps>
      <Map style={{ width: 100 + '%' }} defaultState={{ center: [47.226127, 39.717431], zoom: 15 }}>
        <Placemark geometry={[47.226127, 39.717431]} />
      </Map>
    </YMaps>
  );
}

export default CustomMap;
