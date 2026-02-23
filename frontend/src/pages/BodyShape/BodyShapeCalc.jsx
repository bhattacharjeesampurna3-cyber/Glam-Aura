import { calculateBodyShape } from "../../utils/helpers";

const shape = calculateBodyShape(90, 70, 95);
console.log(shape);
const BodyShapeCalc = () => {
  return (
    <div className="container py-5">
      <h2>Body Shape Calculator</h2>

      <div className="row">
        <div className="col-md-4">
          <input type="number" placeholder="Bust (cm)" className="form-control mb-3" />
        </div>
        <div className="col-md-4">
          <input type="number" placeholder="Waist (cm)" className="form-control mb-3" />
        </div>
        <div className="col-md-4">
          <input type="number" placeholder="Hip (cm)" className="form-control mb-3" />
        </div>
      </div>

      <button className="btn btn-pink">Calculate Shape</button>
    </div>
  );
};

export default BodyShapeCalc;
