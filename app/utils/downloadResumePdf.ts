'use client';

/**
 * Triggers direct download of the official Pavan Sai Vejju Resume PDF
 */
export function downloadResumePdf(selectedLocale?: 'en' | 'de') {
  const locale = selectedLocale ?? (document.documentElement.lang.toLowerCase().startsWith('de') ? 'de' : 'en');
  const filename = locale === 'de' ? 'Pavan_Sai_Vejju_Resume_DE.pdf' : 'Pavan_Sai_Vejju_Resume.pdf';
  const link = document.createElement('a');
  link.href = `/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printResume() {
  window.print();
}
