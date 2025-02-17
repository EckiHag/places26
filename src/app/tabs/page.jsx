"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, Switch, Divider } from "@heroui/react";

export default function App() {
  const [isVertical, setIsVertical] = React.useState(true);

  return (
    <div className="flex flex-col px-4">
      <Switch
        color="primary"
        classNames={{
          base: "m-4", // Abstand
          thumb: "bg-ppics-500", // Farbe des "Knopfes"
        }}
        isSelected={isVertical}
        onValueChange={setIsVertical}
      >
        Vertical
      </Switch>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" isVertical={isVertical}>
          <Tab key="weisheiten" title="Weisheiten">
            <Card>
              <CardBody>
                "Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste ist jetzt."
                <Divider></Divider>
                "Ein Tropfen Liebe ist mehr als ein Ozean Verstand."
                <Divider></Divider>
                "In der Ruhe liegt die Kraft."
                <Divider></Divider>
                "Ein fröhliches Herz macht das Leben heiter, aber ein betrübter Geist vertrocknet die Knochen." (Sprüche 11,25)
                <Divider></Divider>
                "Wer reichlich sät, wird reichlich ernten."(Sprüche 17,22)
                <Divider></Divider>
                "Eisen schärft Eisen, und ein Mensch schärft den anderen." (Sprüche 27,17)
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Music">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="Videos">
            <Card>
              <CardBody>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
