import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Input />
      <Button variant={"primary"}>Primary</Button>
      <Button variant={"destructive"}>destructive</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"muted"}>muted</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"teritary"}>teritary</Button>
    </div>
  );
}
