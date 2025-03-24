"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { writehw } from "@/app/actions/writehw";
import { sendeMultipartMail } from "@/app/actions/mailActions";

export default function Conv() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mailTo, setMailTo] = useState("eu@hagemeier-web.de");
  const [mailSubject, setMailSubject] = useState("Testmail von places26");
  const [mailMessage, setMailMessage] = useState("Hier ist die Nachricht!");

  const handleUpdateDimensions = async () => {
    setLoading(true);
    setMessage("");

    try {
      //    const places = await getPlacesAll();
      const result = await writehw();
      setMessage(`Success: ${result.updated} images updated.`);
    } catch (error) {
      setMessage(`Error in Conv: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSendMail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await sendeMultipartMail(mailTo, mailSubject, mailMessage);

      if (result.success) {
        setMessage(`✅ ${result.message}`);
        console.log("Mail-Details:", result.info);
      } else {
        setMessage(`❌ ${result.message}${result.error ? ` (${result.error})` : ""}`);
        console.error("Fehlerdetails:", result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`❌ Unerwarteter Fehler: ${error.message}`);
      } else {
        setMessage("❌ Unerwarteter Fehler beim Mailversand.");
      }
      console.error("Fehler im Catch-Block:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-36">
        <h1>Update Image Dimensions:</h1>
        <Button className="bg-pprimary-500" onPress={handleUpdateDimensions} disabled={loading} auto>
          {loading ? "Updating..." : "Update Dimensions"}
        </Button>
        {message && <p style={{ marginTop: "20px" }}>{message}</p>}

        <div className="mt-12">
          <h1>Test zum Mail senden:</h1>
          <Button className="bg-pprimary-500" onPress={handleSendMail} disabled={loading} auto>
            Send a Mail
          </Button>
        </div>
      </div>
    </>
  );
}
