// src/lib/parsePdf.js
import fs from 'fs';
import { PdfReader } from 'pdfreader';

export async function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new PdfReader();
    const items = [];

    reader.parseBuffer(buffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        // End of file
        const text = items
          .sort((a, b) => a.y - b.y || a.x - b.x)
          .map((item) => item.text)
          .join(' ');
        resolve(text);
      } else if (item.text) {
        items.push(item);
      }
    });
  });
}
