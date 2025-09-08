import { lineupModels } from "@/data/lineupModels";
import OEMInventory from "./OEMInventory";

export default function OEMPage({ make }) {
  return (
    <>
      {lineupModels.map((model, idx) => (
        <div key={model.postid} className="">
          <p className="">
            {idx + 1}. {model.title}
            {model.lineupModel}
          </p>
        </div>
      ))}
      <OEMInventory make={make} />
    </>
  );
}
