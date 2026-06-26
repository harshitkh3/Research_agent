export const handleDownloadPDF = (reportHtml) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download PDF.");
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>Research Report</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.65;
            color: #1e293b;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 { font-size: 26px; font-weight: 800; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a; }
          h2 { font-size: 20px; font-weight: 700; margin-top: 30px; margin-bottom: 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }
          h3 { font-size: 16px; font-weight: 600; margin-top: 25px; margin-bottom: 10px; color: #334155; }
          p { margin-bottom: 16px; }
          ul, ol { margin-bottom: 16px; padding-left: 24px; }
          li { margin-bottom: 6px; }
          code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.875em; color: #0f172a; }
          hr { border: none; border-top: 1px solid #e2e8f0; margin: 30px 0; }
          a { color: #3b82f6; text-decoration: none; }
          a:hover { text-decoration: underline; }
          @media print {
            body { padding: 20px; }
            @page { size: auto; margin: 20mm; }
          }
        </style>
      </head>
      <body>
        <div class="report-content"></div>
      </body>
    </html>
  `);
  
  printWindow.document.querySelector(".report-content").innerHTML = reportHtml;
  printWindow.document.close();
  
  printWindow.onload = function() {
    printWindow.print();
    printWindow.close();
  };
};
