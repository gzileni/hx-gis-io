import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import axios from 'axios';

let mapObject;

let config = {
  method: 'get',
  url: 'https://apiwharp.hextra.dev/services/all',
  headers: { },
  timeout: 10000,
  maxRedirects: 0
};

const Map = ({ children}) => {
	
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [wms, setWms] = useState(null);
	const [wfs, setWfs] = useState(null);
	const [center, setCenter] = useState([]);
	const [extent, setExtent] = useState([]);
	const [epsg, setEpsg] = useState([]);
	const [zoom] = useState(9);

	// on component mount
	useEffect(() => {

		axios(config).then((response) => {

			setWms(response.data.wms);
			setWfs(response.data.wfs);
			setCenter(response.data.center);
			setEpsg(response.data.epsg);
			setExtent(response.data.extent);

            const options_view = {
				projection: response.data.epsg,
				zoom: zoom,
				center: response.data.center
			}

			console.log(JSON.stringify(options_view))
			
			const view = new ol.View(options_view);

			let options = {
				view: view,
				layers: [],
				controls: [],
				overlays: []
			};

			let mapObject = new ol.Map(options);
			mapObject.setTarget(mapRef.current);
			setMap(mapObject);
        }).catch(function (error) {
            console.log(error);
        });
		
		return () => mapObject.setTarget(undefined);
	}, [zoom]);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [map, zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center, map])

	return (
		<MapContext.Provider value={{ map, wms, wfs, epsg, extent }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;