"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

const GenerateQRCode = ({ token }: { token: string }) => {
  const [qr, setQr] = useState("");

  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  useEffect(() => {
    async function loadQR() {
      const qrImage = await QRCode.toDataURL(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/scan?token=${token}`,
      );
      setQr(qrImage);
    }

    loadQR();
  }, [token]);
  return <img src={qr || "/placeholder.png"} alt="QR Code" />;
};

export default GenerateQRCode;
