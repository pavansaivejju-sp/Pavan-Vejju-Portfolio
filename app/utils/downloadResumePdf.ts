'use client';

/**
 * Triggers direct download of the official Pavan Sai Vejju Resume PDF
 */
export function downloadResumePdf() {
  const link = document.createElement('a');
  link.href = '/Pavan_Sai_Vejju_Resume.pdf';
  link.download = 'Pavan_Sai_Vejju_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printResume() {
  window.print();
}
