import { v4 as uuidv4 } from "uuid";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function YandexMap () {
  const coordinates = [
    [59.926391, 30.320831]
  ];
  
  
  return (
    <YMaps>
      <div>
        <Map defaultState={{ width:'1000px', height: '500px', center: [59.926391, 30.320831], zoom: 15,  }} width={'100%'}  height={'520px'}>
        {coordinates.map(coordinate => <Placemark key={uuidv4()} geometry={coordinate} />)}
        </Map>
      </div>
    </YMaps>
  );
}

export default YandexMap;
