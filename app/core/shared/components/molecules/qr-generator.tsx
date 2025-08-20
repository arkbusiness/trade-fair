'use client';

import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { Upload } from 'lucide-react';

interface QRGeneratorProps {
  value: string;
  size?: number;
  showDownload?: boolean;
  downloadFileName?: string;
}

export const QRGenerator = ({
  value,
  size = 74,
  showDownload = false,
  downloadFileName = 'qr-code'
}: QRGeneratorProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;

    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) {
      console.error('QR code SVG not found');
      return;
    }

    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution
    const downloadSize = 200;
    canvas.width = downloadSize;
    canvas.height = downloadSize;

    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8'
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, downloadSize, downloadSize);

      // Draw QR code
      ctx.drawImage(img, 0, 0, downloadSize, downloadSize);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${downloadFileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={qrRef} data-testid="qr-code-container">
        <QRCode
          value={value}
          size={size}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        />
      </div>

      {showDownload && (
        <button
          className="flex gap-1 justify-center items-center"
          onClick={downloadQR}
        >
          <Upload size={16} className="text-light-blue-2" />
          <span className="text-light-blue-2 text-sm font-medium">
            Download
          </span>
        </button>
      )}
    </div>
  );
};
