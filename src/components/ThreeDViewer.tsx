import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Maximize } from 'lucide-react';

export function ThreeDViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isRotating, setIsRotating] = useState(true);
  const [controls, setControls] = useState({
    zoom: 1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    const drawSplitter = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Set up gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      gradient.addColorStop(0, 'rgba(0, 123, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(26, 26, 26, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(controls.zoom, controls.zoom);
      
      // Apply rotations
      ctx.rotate((controls.rotationX + (isRotating ? Date.now() * 0.001 : 0)) * 0.5);
      
      // Draw a 3D-looking car splitter using perspective
      const depth = Math.sin(controls.rotationY + (isRotating ? Date.now() * 0.0005 : 0)) * 20;
      
      // Main splitter body - front view with perspective
      ctx.fillStyle = '#007BFF';
      ctx.strokeStyle = '#0056b3';
      ctx.lineWidth = 2;
      
      // Main splitter shape
      ctx.beginPath();
      ctx.moveTo(-120 + depth, -15);
      ctx.lineTo(120 - depth, -15);
      ctx.lineTo(140 - depth, 5);
      ctx.lineTo(120 - depth, 25);
      ctx.lineTo(-120 + depth, 25);
      ctx.lineTo(-140 + depth, 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Add 3D depth lines
      ctx.strokeStyle = '#004085';
      ctx.lineWidth = 1;
      for (let i = -100; i <= 100; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, -15);
        ctx.lineTo(i + depth, -15 + depth * 0.3);
        ctx.stroke();
      }
      
      // Side fins
      ctx.fillStyle = '#E60023';
      ctx.strokeStyle = '#b71c1c';
      ctx.lineWidth = 2;
      
      // Left fin
      ctx.beginPath();
      ctx.moveTo(-140 + depth, 5);
      ctx.lineTo(-160 + depth, 15);
      ctx.lineTo(-140 + depth, 35);
      ctx.lineTo(-120 + depth, 25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right fin
      ctx.beginPath();
      ctx.moveTo(140 - depth, 5);
      ctx.lineTo(160 - depth, 15);
      ctx.lineTo(140 - depth, 35);
      ctx.lineTo(120 - depth, 25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Add mounting points
      ctx.fillStyle = '#ffffff';
      const mountPoints = [-80, -40, 0, 40, 80];
      mountPoints.forEach(x => {
        ctx.beginPath();
        ctx.arc(x, 0, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Add wireframe overlay for 3D effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      // Grid lines
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-150, i * 15);
        ctx.lineTo(150, i * 15);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(i * 30, -30);
        ctx.lineTo(i * 30, 40);
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
      ctx.restore();
      
      // Add 3D viewer UI overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(10, 10, 120, 30);
      ctx.fillStyle = '#007BFF';
      ctx.font = '12px sans-serif';
      ctx.fillText('3D Model Viewer', 15, 28);
    };

    const animate = () => {
      drawSplitter();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [controls, isRotating]);

  const handleZoomIn = () => {
    setControls(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 3) }));
  };

  const handleZoomOut = () => {
    setControls(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.5) }));
  };

  const handleReset = () => {
    setControls({ zoom: 1, rotationX: 0, rotationY: 0, rotationZ: 0 });
    setIsRotating(true);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-background to-muted/20 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: '400px' }}
      />
      
      {/* 3D Viewer Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => setIsRotating(!isRotating)}
        >
          <Move3D className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-md px-3 py-1">
          <div className={`w-2 h-2 rounded-full ${isRotating ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
          <span className="text-sm text-muted-foreground">
            {isRotating ? 'Auto-rotating' : 'Manual control'}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-xs text-muted-foreground max-w-48">
          <p>Use controls to zoom and rotate. Click auto-rotate to enable/disable animation.</p>
        </div>
      </div>
    </div>
  );
}