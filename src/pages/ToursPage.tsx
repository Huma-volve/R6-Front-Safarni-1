import { useLocation } from "react-router-dom";

export default function ResultPage() {
  const { search } = useLocation();
  console.log(search);
  return (
    <div>
      <h1>Results</h1>
    </div>
  );
}
