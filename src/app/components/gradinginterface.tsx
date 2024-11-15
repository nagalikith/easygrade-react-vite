'use client';
import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Check, Square, Eraser, Lightbulb, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import RubricOutline from './rubricoutline';
import RubricItem from './rubricitem';

interface Line {
  tool: string;
  points: number[];
}

const GradingInterface: React.FC = () => {
  const [score, setScore] = useState<string>('No score');
  const [wellDone, setWellDone] = useState<string>('');
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<string>('pencil');
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<number[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [stageSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 });
  const [pdf, setPdf] = useState<string | null>(null);

  const leftPanelTools = [
    { icon: <Upload size={20} />, name: 'upload' },
    { icon: <Pencil size={20} />, name: 'pencil' },
    { icon: <Check size={20} />, name: 'check' },
    { icon: <Square size={20} />, name: 'square' },
    { icon: <Eraser size={20} />, name: 'eraser' },
    { icon: <Lightbulb size={20} />, name: 'lightbulb' },
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = stageSize.width;
      canvas.height = stageSize.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#df4b26';
        contextRef.current = ctx;
      }
    }

    if (pdfCanvasRef.current) {
      const canvas = pdfCanvasRef.current;
      canvas.width = stageSize.width;
      canvas.height = stageSize.height;
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      redrawCanvas();
    }
  }, [lines]);

  const redrawCanvas = () => {
    const ctx = contextRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, stageSize.width, stageSize.height);

      lines.forEach(line => {
        ctx.beginPath();
        ctx.globalCompositeOperation = line.tool === 'eraser' ? 'destination-out' : 'source-over';

        for (let i = 0; i < line.points.length; i += 2) {
          const x = line.points[i];
          const y = line.points[i + 1];

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);

      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      setPdf(objectUrl);

      setPageNumber(1);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentLine([x, y]);
      setLines([...lines, { tool, points: [x, y] }]);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const updatedLines = [...lines];
      const currentLinePoints = updatedLines[updatedLines.length - 1].points;
      updatedLines[updatedLines.length - 1] = {
        tool,
        points: [...currentLinePoints, x, y]
      };

      setLines(updatedLines);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const uri = canvasRef.current?.toDataURL();
    console.log(uri);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => prev + 1);
  };

  const handleToolClick = (toolName: string) => {
    if (toolName === 'upload') {
      document.getElementById('pdf-upload')?.click();
    } else {
      setTool(toolName);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2">
        <CardHeader className="p-4 border-b">
          <div className="flex space-x-2">
            <input
              type="file"
              id="pdf-upload"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            {leftPanelTools.map((t, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                size="sm" 
                className={`p-2 ${tool === t.name ? 'bg-gray-200' : ''}`} 
                title={t.name}
                onClick={() => handleToolClick(t.name)}
              >
                {t.icon}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div style={{ position: 'relative', width: stageSize.width, height: stageSize.height }}>
            {pdf ? (
              <object
                data={pdf}
                type="application/pdf"
                width={stageSize.width}
                height={stageSize.height}
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                <p>Your browser does not support PDFs. Please download the PDF to view it.</p>
              </object>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
                Click the upload button to load a PDF
              </div>
            )}
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                cursor: isDrawing ? 'crosshair' : 'default',
                background: 'transparent',
                pointerEvents: tool === 'upload' ? 'none' : 'auto'
              }}
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <Button onClick={goToNextPage}>
              Next
            </Button>
          </div>
          <p className="mt-2">
            Page {pageNumber}
          </p>
        </CardContent>
      </Card>


      <Card>
  <CardContent>
    <RubricItem
    />
    </CardContent>
   </Card>

    </div>
  );
};

export default GradingInterface;
