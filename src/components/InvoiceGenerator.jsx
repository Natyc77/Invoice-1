import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Save, Share2, FileDown, Image, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { generatePDF } from '@/lib/pdfGenerator';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import InvoiceDetails from '@/components/InvoiceDetails';
import SellerInfo from '@/components/SellerInfo';
import BuyerInfo from '@/components/BuyerInfo';
import ItemsTable from '@/components/ItemsTable';
import Totals from '@/components/Totals';
import Notes from '@/components/Notes';
import AuthorizedSignature from '@/components/AuthorizedSignature';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import MonetizationSection from './MonetizationSection';

const InvoiceGenerator = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const invoicePrintRef = useRef(null);
  
  const [invoiceData, setInvoiceData] = useState(() => {
    const savedData = localStorage.getItem('invoiceData');
    return savedData ? JSON.parse(savedData) : {
      invoiceNumber: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      fromCompany: '',
      fromAddress: '',
      fromEmail: '',
      fromPhone: '',
      fromTaxId: '',
      logo: null,
      toCompany: '',
      toAddress: '',
      toEmail: '',
      toPhone: '',
      items: [
        { description: '', quantity: 1, rate: 0 }
      ],
      notes: '',
      taxRate: 0,
    };
  });

  const handleDataChange = (section, value, index) => {
    setInvoiceData(prev => {
      if (section === 'items') {
        const newItems = [...prev.items];
        newItems[index] = { ...newItems[index], ...value };
        return { ...prev, items: newItems };
      }
      return { ...prev, [section]: value };
    });
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };
  
  const itemsWithAmounts = useMemo(() => 
    invoiceData.items.map(item => ({
      ...item,
      quantity: parseFloat(item.quantity) || 0,
      rate: parseFloat(item.rate) || 0,
      amount: (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)
    })), [invoiceData.items]
  );

  const subtotal = useMemo(() => 
    itemsWithAmounts.reduce((sum, item) => sum + item.amount, 0), 
    [itemsWithAmounts]
  );

  const tax = useMemo(() => 
    (subtotal * (parseFloat(invoiceData.taxRate) || 0)) / 100, 
    [subtotal, invoiceData.taxRate]
  );

  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const handleDownloadPDF = () => {
    try {
      const fullInvoiceData = { ...invoiceData, items: itemsWithAmounts };
      generatePDF(fullInvoiceData, subtotal, tax, total, t);
      toast({
        title: "Success!",
        description: "Your invoice has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPNG = async () => {
    if (!invoicePrintRef.current) return;
    try {
      const canvas = await html2canvas(invoicePrintRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Invoice-${invoiceData.invoiceNumber || 'details'}.png`;
      link.click();
      toast({
        title: 'Success!',
        description: 'Your invoice has been downloaded as a PNG.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate PNG. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleExportCSV = () => {
    try {
      const headers = [t('description'), t('quantity'), t('rate'), t('amount')];
      const rows = itemsWithAmounts.map(item => [
        `"${item.description.replace(/"/g, '""')}"`,
        item.quantity,
        item.rate,
        item.amount.toFixed(2)
      ]);

      const totalsRows = [
        ['', '', t('subtotal'), subtotal.toFixed(2)],
        ['', '', `${t('tax')} (${invoiceData.taxRate}%)`, tax.toFixed(2)],
        ['', '', t('total'), total.toFixed(2)]
      ];

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(',')),
        ...totalsRows.map(row => row.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `Invoice-${invoiceData.invoiceNumber || 'details'}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Success!',
        description: 'Your invoice data has been exported as a CSV.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to export CSV. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleExportXLSX = () => {
    try {
      const worksheetData = [
        [t('description'), t('quantity'), t('rate'), t('amount')],
        ...itemsWithAmounts.map(item => [item.description, item.quantity, item.rate, item.amount]),
        [],
        ['', '', t('subtotal'), subtotal],
        ['', '', `${t('tax')} (${invoiceData.taxRate}%)`, tax],
        ['', '', t('total'), total]
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      
      const currencyFormat = '$#,##0.00';
      worksheet['!cols'] = [{ wch: 40 }, { wch: 10 }, { wch: 10 }, { wch: 15 }];

      if (itemsWithAmounts.length > 0) {
        worksheet['!autofilter'] = { ref: 'A1:D1' };
        for (let i = 0; i < itemsWithAmounts.length; i++) {
          const rowIndex = i + 2;
          const rateCell = `C${rowIndex}`;
          const amountCell = `D${rowIndex}`;
          if(worksheet[rateCell]) worksheet[rateCell].z = currencyFormat;
          if(worksheet[amountCell]) worksheet[amountCell].z = currencyFormat;
        }
      }
      
      const subtotalRowIndex = itemsWithAmounts.length + 4;
      const totalCell = `D${subtotalRowIndex + 2}`;
      if(worksheet[totalCell]) {
        worksheet[totalCell].z = currencyFormat;
        worksheet[totalCell].s = { font: { bold: true } };
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');
      XLSX.writeFile(workbook, `Invoice-${invoiceData.invoiceNumber || 'details'}.xlsx`);

      toast({
        title: 'Success!',
        description: 'Your invoice has been exported as an XLSX file.',
      });
    } catch (error) {
      console.error('XLSX Export Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to export XLSX. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveData = () => {
    try {
      const fullInvoiceData = { ...invoiceData };
      if (typeof invoiceData.logo === 'string' && invoiceData.logo.startsWith('blob:')) {
          const { logo, ...rest } = fullInvoiceData;
          localStorage.setItem('invoiceData', JSON.stringify(rest));
      } else {
        localStorage.setItem('invoiceData', JSON.stringify(fullInvoiceData));
      }
      toast({
        title: "Saved!",
        description: "Your invoice data has been saved in your browser.",
      });
    } catch (error) {
       toast({
        title: "Save Error",
        description: "Could not save data. Logos cannot be saved.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 print-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900">
            {t('invoiceGeneratorTitle')}
          </h1>
        </motion.div>
        
        <div ref={invoicePrintRef} className="bg-white rounded-lg shadow-lg p-10 print-only">
            {invoiceData.logo && (
              <img src={invoiceData.logo} alt="Company Logo" className="h-16 w-auto max-w-[150px] mb-4" />
            )}
            <h1 className="text-3xl font-bold text-center mb-8">{t('invoice')}</h1>
             <div className="grid grid-cols-3 gap-6 mb-8 text-sm">
                <div><span className="font-semibold">{t('invoiceNum')} </span>{invoiceData.invoiceNumber}</div>
                <div><span className="font-semibold">{t('date')} </span>{invoiceData.invoiceDate}</div>
                <div><span className="font-semibold">{t('dueDatePrint')} </span>{invoiceData.dueDate}</div>
             </div>
             <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
              <div>
                <h3 className="font-bold mb-2">{t('from')}</h3>
                <p>{invoiceData.fromCompany}</p>
                <p>{invoiceData.fromAddress}</p>
                {invoiceData.fromTaxId && <p>Tax ID: {invoiceData.fromTaxId}</p>}
                <p>{invoiceData.fromEmail}</p>
                <p>{invoiceData.fromPhone}</p>
              </div>
               <div>
                <h3 className="font-bold mb-2">{t('to')}</h3>
                <p>{invoiceData.toCompany}</p>
                <p>{invoiceData.toAddress}</p>
                <p>{invoiceData.toEmail}</p>
                <p>{invoiceData.toPhone}</p>
              </div>
             </div>
            <table className="w-full mb-8 text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-2 text-left">{t('description')}</th>
                  <th className="p-2 text-right">{t('quantity')}</th>
                  <th className="p-2 text-right">{t('rate')}</th>
                  <th className="p-2 text-right">{t('amount')}</th>
                </tr>
              </thead>
              <tbody>
                {itemsWithAmounts.map((item, i) => (
                  <tr key={i} className="border-b border-slate-100">
                     <td className="p-2">{item.description}</td>
                     <td className="p-2 text-right">{item.quantity}</td>
                     <td className="p-2 text-right">${(item.rate || 0).toFixed(2)}</td>
                     <td className="p-2 text-right">${(item.amount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mb-8">
               <div className="w-1/2 text-sm">
                 <div className="flex justify-between p-2"><span className="font-semibold">{t('subtotal')}</span><span>${subtotal.toFixed(2)}</span></div>
                 <div className="flex justify-between p-2"><span className="font-semibold">{t('tax')} ({invoiceData.taxRate}%):</span><span>${tax.toFixed(2)}</span></div>
                 <div className="flex justify-between p-2 font-bold text-lg border-t border-slate-200 mt-2"><span >{t('total')}</span><span>${total.toFixed(2)}</span></div>
               </div>
            </div>
            {invoiceData.notes && (
              <div className="mb-8 text-sm">
                <h3 className="font-bold mb-2">{t('paymentTerms')}</h3>
                <p>{invoiceData.notes}</p>
              </div>
            )}
            <div className="mt-16 text-sm">
              <p className="font-semibold">{t('authorizedSignature')}:</p>
              <div className="border-b border-slate-300 w-1/2 mt-2"></div>
            </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <Button
              onClick={handleSaveData}
              variant="secondary"
              className="w-full sm:w-auto text-md font-semibold"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              {t('saveDataButton')}
            </Button>
          </div>

          <div className="space-y-8">
            <InvoiceDetails data={invoiceData} onDataChange={handleDataChange} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
              <SellerInfo data={invoiceData} onDataChange={handleDataChange} />
              <BuyerInfo data={invoiceData} onDataChange={handleDataChange} />
            </div>
            
            <ItemsTable 
              items={itemsWithAmounts} 
              onItemChange={handleDataChange} 
              addItem={addItem} 
              removeItem={removeItem} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
               <Notes notes={invoiceData.notes} onNotesChange={(val) => handleDataChange('notes', val)} />
              <Totals 
                subtotal={subtotal} 
                tax={tax} 
                total={total}
                taxRate={invoiceData.taxRate}
                onTaxRateChange={(val) => handleDataChange('taxRate', val)}
              />
            </div>
            
            <div className="border-t pt-8">
              <AuthorizedSignature />
            </div>
            
            <div className="border-t pt-8 flex flex-col gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="w-full flex-grow bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold"
                    size="lg"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    {t('exportInvoice')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDownloadPDF}>
                    <FileDown className="mr-2 h-4 w-4" />
                    <span>{t('downloadPDF')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadPNG}>
                    <Image className="mr-2 h-4 w-4" />
                    <span>{t('downloadPNG')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportCSV}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>{t('exportCSV')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportXLSX}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>{t('exportXLSX')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <MonetizationSection />
            
            <div className="mt-8 text-center text-xs text-slate-500 px-4 py-2 bg-slate-50 rounded-md border border-slate-200">
              {t('disclaimer')}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;