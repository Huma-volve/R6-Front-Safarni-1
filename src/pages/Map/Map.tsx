import MapView from "../../components/MapView/MapView";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

function Map() {
    return (
        <>
            <div className="overflow-hidden relative">
                <MapView />
                <NavbarMobile />
            </div>
        </>
    );
}

export default Map;
