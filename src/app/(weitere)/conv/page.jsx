"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { writehw } from "@/app/actions/writehw";
import { sendeMail, sendeMultipartMail } from "@/app/actions/sendeMail";

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
      setMessage(result.message);
    } catch (error) {
      setMessage(`Fehler: ${error.message}`);
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
