import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/images/marker-shadow.png";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let Icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map = (props) => {
  const center = {lat: props.location.lat, lng: props.location.lng}
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={Icon}>
        <Popup>{props.location.address}</Popup>
      </Marker>{" "}
    </MapContainer>
  );
};

export default Map;
