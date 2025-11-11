import jsPDF from 'jspdf';

export const generatePDF = (invoiceData, subtotal, tax, total) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  if (invoiceData.logo) {
    try {
      const img = new Image();
      img.src = invoiceData.logo;
      doc.addImage(img, 'PNG', 15, 15, 40, 20);
    } catch (e) {
      console.error("Error adding logo to PDF:", e);
    }
    yPos = 40;
  }
  
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('INVOICE', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  if (invoiceData.invoiceNumber) {
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, yPos);
  }
  
  if (invoiceData.invoiceDate) {
    doc.text(`Date: ${invoiceData.invoiceDate}`, pageWidth - 20, yPos, { align: 'right' });
    yPos += 6;
  }
  
  if (invoiceData.dueDate) {
    doc.text(`Due Date: ${invoiceData.dueDate}`, pageWidth - 20, yPos, { align: 'right' });
    yPos += 6;
  }
  
  yPos += 10;
  
  const fromX = 20;
  const toX = pageWidth / 2 + 10;
  let fromY = yPos;
  let toY = yPos;

  doc.setFont(undefined, 'bold');
  doc.text('FROM:', fromX, fromY);
  fromY += 6;
  doc.setFont(undefined, 'normal');
  
  if (invoiceData.fromCompany) {
    doc.text(invoiceData.fromCompany, fromX, fromY);
    fromY += 5;
  }
  if (invoiceData.fromTaxId) {
    doc.text(`Tax ID: ${invoiceData.fromTaxId}`, fromX, fromY);
    fromY += 5;
  }
  if (invoiceData.fromAddress) {
    const fromAddressLines = doc.splitTextToSize(invoiceData.fromAddress, 80);
    doc.text(fromAddressLines, fromX, fromY);
    fromY += fromAddressLines.length * 5;
  }
  if (invoiceData.fromEmail) {
    doc.text(invoiceData.fromEmail, fromX, fromY);
    fromY += 5;
  }
  if (invoiceData.fromPhone) {
    doc.text(invoiceData.fromPhone, fromX, fromY);
    fromY += 5;
  }
  
  doc.setFont(undefined, 'bold');
  doc.text('BILL TO:', toX, toY);
  toY += 6;
  doc.setFont(undefined, 'normal');
  
  if (invoiceData.toCompany) {
    doc.text(invoiceData.toCompany, toX, toY);
    toY += 5;
  }
  if (invoiceData.toAddress) {
    const toAddressLines = doc.splitTextToSize(invoiceData.toAddress, 80);
    doc.text(toAddressLines, toX, toY);
    toY += toAddressLines.length * 5;
  }
  if (invoiceData.toEmail) {
    doc.text(invoiceData.toEmail, toX, toY);
    toY += 5;
  }
  if (invoiceData.toPhone) {
    doc.text(invoiceData.toPhone, toX, toY);
    toY += 5;
  }
  
  yPos = Math.max(fromY, toY) + 10;
  
  doc.setFont(undefined, 'bold');
  doc.setFillColor(240, 240, 240);
  doc.rect(15, yPos, pageWidth - 30, 8, 'F');
  doc.text('Description', 20, yPos + 6);
  doc.text('Qty', 110, yPos + 6);
  doc.text('Rate', 135, yPos + 6);
  doc.text('Amount', 170, yPos + 6);
  yPos += 12;
  
  doc.setFont(undefined, 'normal');
  invoiceData.items.forEach(item => {
    const descLines = doc.splitTextToSize(item.description || 'N/A', 85);
    const itemHeight = Math.max(descLines.length * 5, 8) + 4;
    
    if (yPos + itemHeight > 250) { // Check for page break before adding item
      doc.addPage();
      yPos = 20; // Reset yPos for new page
      doc.setFont(undefined, 'bold');
      doc.setFillColor(240, 240, 240);
      doc.rect(15, yPos, pageWidth - 30, 8, 'F');
      doc.text('Description', 20, yPos + 6);
      doc.text('Qty', 110, yPos + 6);
      doc.text('Rate', 135, yPos + 6);
      doc.text('Amount', 170, yPos + 6);
      yPos += 12;
      doc.setFont(undefined, 'normal');
    }
    
    doc.text(descLines, 20, yPos);
    doc.text(String(item.quantity), 110, yPos);
    doc.text(`$${Number(item.rate).toFixed(2)}`, 135, yPos);
    doc.text(`$${Number(item.amount).toFixed(2)}`, 170, yPos);
    yPos += itemHeight;
  });
  
  yPos += 5;
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 8;
  
  doc.text('Subtotal:', 135, yPos);
  doc.text(`$${subtotal.toFixed(2)}`, 170, yPos);
  yPos += 6;
  
  doc.text(`Tax (${invoiceData.taxRate || 0}%):`, 135, yPos);
  doc.text(`$${tax.toFixed(2)}`, 170, yPos);
  yPos += 2;
  doc.line(135, yPos, pageWidth - 15, yPos);
  yPos += 6;
  
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.text('Total:', 135, yPos);
  doc.text(`$${total.toFixed(2)}`, 170, yPos);

  // Add notes and signature at the bottom
  let bottomSectionY = 250; // A fixed position towards the bottom
  
  if (invoiceData.notes) {
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Payment Terms & Notes:', 15, bottomSectionY);
    bottomSectionY += 6;
    doc.setFont(undefined, 'normal');
    const notesLines = doc.splitTextToSize(invoiceData.notes, pageWidth - 30);
    doc.text(notesLines, 15, bottomSectionY);
    bottomSectionY += notesLines.length * 5 + 10;
  }
  
  // Ensure signature does not overlap
  if (bottomSectionY < 270) { // If there's space for signature
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Authorized Signature:', 15, bottomSectionY + 10);
    doc.line(15, bottomSectionY + 30, 90, bottomSectionY + 30); // Horizontal line for signature
  } else { // If notes pushed it too far, add to next page
    doc.addPage();
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Authorized Signature:', 15, 20);
    doc.line(15, 40, 90, 40); // Horizontal line for signature
  }

  const fileName = invoiceData.invoiceNumber 
    ? `Invoice-${invoiceData.invoiceNumber}.pdf`
    : 'Invoice.pdf';
  
  doc.save(fileName);
};