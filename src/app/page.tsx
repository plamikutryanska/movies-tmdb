import FileInput from "@/app/components/FileInput";
import CheckboxList from "./components/CheckboxList";

export default function Home() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <FileInput/>
      <CheckboxList/>
    </div>
  );
}
