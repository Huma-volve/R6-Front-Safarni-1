import { Helmet, HelmetProvider } from "react-helmet-async";
import MapView from "../../components/MapView/MapView";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

function Map() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Safarni - Map</title>
        </Helmet>
      </HelmetProvider>
      <div className="overflow-hidden relative">
        <MapView />
        <NavbarMobile />
      </div>
    </>
  );
}

export default Map;
