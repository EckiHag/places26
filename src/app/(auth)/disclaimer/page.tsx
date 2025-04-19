import React from "react";
import { Card, Button, CardBody } from "@heroui/react";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <Card className="max-w-2xl w-full mt-24 p-6 shadow-xl rounded-2xl bg-pprimary-400">
        <CardBody className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Haftungsausschluss</h1>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Hinweis:</h2>
            <p className="text-gray-700">
              Diese Inhalte sind ausschließlich für den privaten Gebrauch innerhalb meines Familienkreises bestimmt. Eine Weitergabe oder öffentliche Verbreitung der Bilder ist
              nicht gestattet.
            </p>
            <p className="text-gray-700">
              Nach der Registrierung bekomme ich eine Mail und kann dann die Bildgalerien oder Teile davon freigeben. Anders ist ein Zugang nicht möglich. Ein kleiner Teil ist für
              Registrierte ohne weitere Freigaben zugänglich.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Inhalte dieser Website</h2>
            <p className="text-gray-700">
              Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehme ich keine Gewähr.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Links zu externen Webseiten</h2>
            <p className="text-gray-700">
              Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr
              übernehmen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Urheberrecht</h2>
            <p className="text-gray-700">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <div className="flex flex-col items-center space-y-2">
            <Link href="/">
              <Button variant="ghost">Zurück zur Startseite</Button>
            </Link>
            <Link href="/impressum">
              <Button variant="ghost">Zum Impressum</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
