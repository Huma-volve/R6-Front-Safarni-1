import AvailableTour from "../components/Home/AvailableTours";
import Categories from "../components/Home/Categories";
import Landing from "../components/Home/Landing";
import Recommendation from "../components/Home/Recommendation";

export default function homePage() {
  return (
    <div>
      <Landing />
      <Categories />
      <Recommendation />
      <AvailableTour />
    </div>
  );
}
