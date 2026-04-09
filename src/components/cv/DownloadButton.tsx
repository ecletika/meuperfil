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

      // Hide background overlay before capture
      const bgOverlay = document.querySelector('.cv-no-capture') as HTMLElement | null;
      if (bgOverlay) bgOverlay.style.display = 'none';

      // Disable animations so html2canvas captures fully visible content
      const animatedEls = element.querySelectorAll<HTMLElement>(
        '.animate-fade-in, .animate-slide-up, .animate-scale-in'
      );
      animatedEls.forEach((el) => {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });

      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 0,
      });

      // Restore background overlay
      if (bgOverlay) bgOverlay.style.display = '';
      // Restore animations
      animatedEls.forEach((el) => {
        el.style.animation = '';
        el.style.opacity = '';
        el.style.transform = '';
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

      // Scale to fill full A4 width
      const ratio = pdfWidth / imgWidth;
      const pageHeightPx = pdfHeight / ratio;

      // Find all content blocks to avoid cutting through them
      const contentBlocks = element.querySelectorAll('.border-l-2, section');
      const elementRect = element.getBoundingClientRect();
      const captureScale = 4; // must match html2canvas scale above
      const scrollTop = window.scrollY;

      // Build avoid ranges in canvas pixel coordinates
      const avoidRanges: Array<{ top: number; bottom: number }> = [];
      contentBlocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const top = (rect.top + scrollTop - (elementRect.top + scrollTop)) * captureScale;
        const bottom = (rect.bottom + scrollTop - (elementRect.top + scrollTop)) * captureScale;
        if (bottom - top > 40) { // ignore tiny elements
          avoidRanges.push({ top, bottom });
        }
      });

      // Build page cut points avoiding mid-block cuts
      const cutPoints: number[] = [0];
      let currentCut = pageHeightPx;
      while (currentCut < imgHeight) {
        let safeCut = currentCut;
        // Keep adjusting until the cut doesn't land inside any block
        let iterations = 0;
        let adjusted = true;
        while (adjusted && iterations < avoidRanges.length + 1) {
          adjusted = false;
          iterations++;
          for (const r of avoidRanges) {
            if (safeCut > r.top + 10 && safeCut < r.bottom - 10) {
              safeCut = r.top; // push cut to just before this block
              adjusted = true;
              break;
            }
          }
        }
        cutPoints.push(safeCut);
        currentCut = safeCut + pageHeightPx;
      }
      cutPoints.push(imgHeight);

      for (let i = 0; i < cutPoints.length - 1; i++) {
        if (i > 0) pdf.addPage();

        const sourceY = cutPoints[i];
        const sourceHeight = cutPoints[i + 1] - cutPoints[i];

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = Math.ceil(sourceHeight);
        const ctx = pageCanvas.getContext("2d");

        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0, sourceY,
            imgWidth, sourceHeight,
            0, 0,
            imgWidth, sourceHeight
          );

          const pageImgData = pageCanvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(
            pageImgData,
            "JPEG",
            0,
            0,
            pdfWidth,
            sourceHeight * ratio
          );
        }
      }

      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Restore background overlay on error
      const bgOverlay = document.querySelector('.cv-no-capture') as HTMLElement | null;
      if (bgOverlay) bgOverlay.style.display = '';
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
