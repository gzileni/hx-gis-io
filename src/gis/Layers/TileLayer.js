import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import _ from 'lodash';

const TileLayer = ({ source, zIndex = 0 }) => {
	const { map, wms, wfs, epsg, extent } = useContext(MapContext);
	
	useEffect(() => {

		if (!map) return;

		let tileLayer = new OLTileLayer({
			source,
			zIndex,
		});
		
		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);
		let i = 0;
		_.forEach(wms, s => {
			/** get layer from services */
			const layers = _.map(s.layers, l => { return l.key});
			/** add layers */
			const so = new OLTileLayer({
				extent: extent,
				source: new TileWMS({
					url: s.url,
					params: {'LAYERS': layers.join(','), 'TILED': true}
				})
			});
			i++;
			map.addLayer(so);
			so.setZIndex(i);
		});

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};

	}, [epsg, extent, map, source, wfs, wms, zIndex]);

	return null;
};

export default TileLayer;
