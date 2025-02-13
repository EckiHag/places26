import { Button } from "@heroui/react";
import React from "react";
import { FaBeer, FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col mt-10 ml-10 items-center">
      <h1>Home</h1>
      <Button color="primary" variant="bordered" startContent={<FaRegSmile size={40} />}>
        Click me
      </Button>
      <h3>
        {" "}
        Lets go for a <FaBeer />?{" "}
      </h3>
      <div className="flex gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
