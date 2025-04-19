import React from "react";
import { Card, Button, CardBody } from "@heroui/react";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <Card className="max-w-2xl w-full p-6 shadow-xl rounded-2xl bg-pprimary-400 mt-24">
        <CardBody className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Impressum</h1>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Angaben gemäß §5 TMG</h2>
            <p className="text-gray-700">
              Eckhard Hagemeier
              <br />
              Grevestr. 28
              <br />
              32425 Minden
              <br />
              Deutschland
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Kontakt</h2>
            <p className="text-gray-700">E-Mail: eu@hagemeier-web.de</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt nach §55 Abs. 2 RStV</h2>
            <p className="text-gray-700">
              Eckhard Hagemeier
              <br />
              Grevestr. 28
              <br />
              32425 Minden
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Haftungsausschluss</h2>
            <p className="text-gray-700">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren
              Betreiber verantwortlich.
            </p>
          </section>

          <div className="flex justify-center">
            <Link href="/">
              <Button variant="shadow">Zurück zur Startseite</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
