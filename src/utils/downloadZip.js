/**
 * Securely downloads the portfolio zip archive using Blob extraction,
 * guaranteeing correct binary byte transmission even inside iframes.
 */
export async function downloadPortfolioZip(onStatus) {
  const fileName = 'barath-portfolio-redesigned.zip';
  const fileUrl = '/barath-portfolio-redesigned.zip';

  if (onStatus) onStatus('Fetching ZIP archive...');

  try {
    const response = await fetch(fileUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const blob = await response.blob();
    if (blob.size === 0) throw new Error('Received 0 bytes');

    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    }, 1500);

    if (onStatus) onStatus('Download started successfully!');
    return true;
  } catch {
    // Fallback if fetch or blob fails in restricted sandbox
    const fallbackLink = document.createElement('a');
    fallbackLink.href = fileUrl;
    fallbackLink.download = fileName;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.style.display = 'none';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();

    setTimeout(() => {
      document.body.removeChild(fallbackLink);
    }, 1500);

    if (onStatus) onStatus('Download triggered via direct link!');
    return false;
  }
}
