import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Map from "../gis/Map";
import { Layers, TileLayer } from "../gis/Layers";
import { osm } from "../gis/Source";
import { Controls, FullScreenControl } from "../gis/Controls";

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WHARP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
