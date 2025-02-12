"use client";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";

export default function CardPic(props) {
  const title = props.pic?.title;
  const description = props.pic?.description;
  const image = props.pic?.image;
  // console.log("Pics image: ", image);
  // console.log("Pics props: ", props);
  return (
    <Card className="max-w-[400px] min-h-[200px]">
      <CardHeader className="flex gap-3  bg-blue-400">
        <div className="flex flex-col">
          <p className="text-2xl">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="bg-amber-700 items-center">
        <Image isZoomed alt="NextUI place Image" src={`https://beihaggis.de/${image?.replace(/^.\//, "")}`} width={300} />
        <span className="text-xs">{description}</span>
      </CardBody>
    </Card>
  );
}
