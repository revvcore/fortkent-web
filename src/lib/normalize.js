const normalize = (text) =>
  (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars except spaces and dashes
    .replace(/\s*-\s*/g, "-") // normalize spaces around dashes to single dash
    .replace(/\s+/g, "-") // replace spaces with dash
    .replace(/-+/g, "-") // collapse multiple dashes
    .replace(/^-|-$/g, ""); // trim leading/trailing dashes

export default normalize;
