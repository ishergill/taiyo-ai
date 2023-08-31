import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios, { AxiosResponse } from "axios";

interface CountryData {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

const Map = () => {
  const defaultPosition: LatLngExpression = [46, 2]; // Paris position

  const [countryData, setCountryData] = useState<CountryData[]>([]);

  const fetchRecords = async (): Promise<AxiosResponse<CountryData[]>> => {
    const response = await axios.get<CountryData[]>(
      "https://disease.sh/v3/covid-19/countries"
    );
    return response;
  };

  useEffect(() => {
    const getRecords = async () => {
      const { data } = await fetchRecords();
      setCountryData(data);
    };
    getRecords();
  }, []);

  return (
    <div className="ml-44">
      <MapContainer
        center={defaultPosition}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
        zoomControl={true}
      >
        {countryData.map((place: CountryData) => (
          <Marker
            key={place.countryInfo._id}
            position={[place.countryInfo.lat, place.countryInfo.long]} // 👈
          >
            <Popup>
              <p className="text-black text-sm font-medium">{place.country} </p>
              <p className="text-black text-sm font-medium">
                {" "}
                active cases {place.active}
              </p>
              <p className="text-black text-sm font-medium">
                recovered cases {place.recovered}
              </p>
            </Popup>
          </Marker>
        ))}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
