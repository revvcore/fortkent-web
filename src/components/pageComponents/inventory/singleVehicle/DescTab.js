import MarkDownRenderer from "@/components/commonComponents/markdown/MarkDownRenderer";

export default function DescTab({ item }) {
  return (
    <div>
      <h2>Description</h2>
      <MarkDownRenderer content={item.description} />
    </div>
  );
}
