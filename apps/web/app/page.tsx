import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className=" h-full flex flex-col justify-center items-center">
      <div className="mb-4">
        Hello world

      </div>
      <div className="mb-4">
        <Button variant={"custom"}>First ShadCN</Button>
      </div>
      <div className=" inline-block">Anmol</div>
    </div>
  );
}
