import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface DownloadButtonProps {
  label: string;
  targetId: string;
  fileName: string;
}

export const DownloadButton = ({ label, targetId, fileName }: DownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    
    try {
      const element = document.getElementById(targetId);
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#f8fafb",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      // Calculate total pages needed
      const pageHeight = pdfHeight / ratio;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const sourceY = i * pageHeight;
        const sourceHeight = Math.min(pageHeight, imgHeight - sourceY);
        
        // Create a temporary canvas for this page section
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        const ctx = pageCanvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, sourceY,
            imgWidth, sourceHeight,
            0, 0,
            imgWidth, sourceHeight
          );
          
          // Use JPEG format to avoid PNG signature issues
          const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
          pdf.addImage(
            pageImgData,
            "JPEG",
            imgX,
            0,
            imgWidth * ratio,
            sourceHeight * ratio
          );
        }
      }

      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      size="lg"
      className="cv-gradient hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-primary-foreground font-semibold gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          {label}
        </>
      )}
    </Button>
  );
};
