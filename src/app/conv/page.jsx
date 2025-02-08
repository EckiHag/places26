"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { writehw } from "@/app/actions/writehw";

export default function Conv() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Update Image Dimensions</h1>
      <Button onPress={handleUpdateDimensions} disabled={loading} color="primary" auto>
        {loading ? "Updating..." : "Update Dimensions"}
      </Button>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}
