'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Check, Square, Eraser, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Stage, Layer, Line } from 'react-konva';
import { pdfjs,Document, Page } from 'react-pdf';
import RubricOutline from './rubricoutline';

if (typeof Promise.withResolvers === 'undefined') {
  if (window)
      // @ts-expect-error This does not exist outside of polyfill which this is doing
      window.Promise.withResolvers = function () {
          let resolve, reject;
          const promise = new Promise((res, rej) => {
              resolve = res;
              reject = rej;
          });
          return { promise, resolve, reject };
      };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const GradingInterface: React.FC = () => {
  const [score, setScore] = useState<string>('No score');
  const [wellDone, setWellDone] = useState<string>('');
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [lines, setLines] = useState<any[]>([]);
  const [tool, setTool] = useState<string>('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  const leftPanelTools = [
    { icon: <Pencil size={20} />, name: 'pencil' },
    { icon: <Check size={20} />, name: 'check' },
    { icon: <Square size={20} />, name: 'square' },
    { icon: <Eraser size={20} />, name: 'eraser' },
    { icon: <Lightbulb size={20} />, name: 'lightbulb' },
  ];

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => (numPages && prev < numPages ? prev + 1 : prev));
  };

  const handleScoreInput = (item: string | number) => {
    if (item === 'CLR') {
      setScore('No score');
    } else {
      setScore((prev) => (prev === 'No score' ? item.toString() : prev + item.toString()));
    }
  };

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri); // You can send this URI to your backend or save it as needed
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2">
        <CardHeader className="p-4 border-b">
          <div className="flex space-x-2">
            {leftPanelTools.map((t, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                size="sm" 
                className={`p-2 ${tool === t.name ? 'bg-gray-200' : ''}`} 
                title={t.name}
                onClick={() => setTool(t.name)}
              >
                {t.icon}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div style={{ position: 'relative', width: stageSize.width, height: stageSize.height }}>
            <Document
              file="/savedis.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page 
                pageNumber={pageNumber} 
                width={stageSize.width}
                height={stageSize.height}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              ref={stageRef}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>
          <div className="flex justify-between mt-4">
            <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <Button onClick={goToNextPage} disabled={numPages ? pageNumber >= numPages : true}>
              Next
            </Button>
          </div>
          <p className="mt-2">
            Page {pageNumber} of {numPages}
          </p>
        </CardContent>
      </Card>

      <Card>
      <RubricOutline title="Demo Homework 1" initialPoints={2} />
      </Card>
    </div>
  );
};

export default GradingInterface;