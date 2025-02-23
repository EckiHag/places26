"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { writehw } from "@/app/actions/writehw";
import { sendeMail } from "../actions/sendMail";

export default function Conv() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Testmail von places26");
  const [emailMessage, setEmailMessage] = useState("Hier ist die Nachricht!");

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
      const result = await sendeMail(subject, emailMessage);
      setMessage(result.message);
    } catch (error) {
      setMessage(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Update Image Dimensions</h1>
        <Button className="bg-pprimary-500" onPress={handleUpdateDimensions} disabled={loading} auto>
          {loading ? "Updating..." : "Update Dimensions"}
        </Button>
        {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      </div>
      <div>
        <Button className="bg-pprimary-500" onPress={handleSendMail} disabled={loading} auto>
          Send a Mail
        </Button>
      </div>
    </>
  );
}
