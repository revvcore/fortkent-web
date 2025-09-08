import MarkDownRenderer from "@/components/commonComponents/markdown/MarkDownRenderer";

export default function DescTab({ item }) {
  return (
    <div>
        <h3>Description</h3>
      <MarkDownRenderer content={item.description} />
    </div>
  );
}
