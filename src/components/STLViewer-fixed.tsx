import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "./ui/button";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move3D,
  Download,
  Loader2,
} from "lucide-react";
import * as THREE from "three";

// STL Loader - Simple implementation for binary and ASCII STL files
class STLLoader extends THREE.Loader {
  load(
    url: string,
    onLoad: (geometry: THREE.BufferGeometry) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ) {
    const loader = new THREE.FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.load(
      url,
      (data) => {
        try {
          const geometry = this.parse(data as ArrayBuffer);
          onLoad(geometry);
        } catch (e) {
          if (onError) {
            onError(e as ErrorEvent);
          } else {
            console.error(e);
          }
        }
      },
      onProgress,
      onError
    );
  }

  parse(data: ArrayBuffer): THREE.BufferGeometry {
    const view = new DataView(data);
    const isLittleEndian = true;

    // Check if it's ASCII or binary STL
    const header = new Uint8Array(data, 0, 5);
    const headerString = new TextDecoder().decode(header);
    const isASCII = headerString.toLowerCase().includes("solid");

    if (isASCII && data.byteLength < 1000000) {
      // Only try ASCII for smaller files
      try {
        return this.parseASCII(new TextDecoder().decode(data));
      } catch {
        // Fall back to binary if ASCII parsing fails
        return this.parseBinary(view, isLittleEndian);
      }
    } else {
      return this.parseBinary(view, isLittleEndian);
    }
  }

  private parseASCII(data: string): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const normals: number[] = [];

    const lines = data.split("\n");
    let currentNormal: [number, number, number] = [0, 0, 0];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("facet normal")) {
        const parts = line.split(/\s+/);
        currentNormal = [
          parseFloat(parts[2]),
          parseFloat(parts[3]),
          parseFloat(parts[4]),
        ];
      } else if (line.startsWith("vertex")) {
        const parts = line.split(/\s+/);
        vertices.push(
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3])
        );
        normals.push(currentNormal[0], currentNormal[1], currentNormal[2]);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );

    return geometry;
  }

  private parseBinary(
    view: DataView,
    isLittleEndian: boolean
  ): THREE.BufferGeometry {
    const faces = view.getUint32(80, isLittleEndian);
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const normals: number[] = [];

    let offset = 84;
    for (let face = 0; face < faces; face++) {
      // Normal vector
      const nx = view.getFloat32(offset, isLittleEndian);
      const ny = view.getFloat32(offset + 4, isLittleEndian);
      const nz = view.getFloat32(offset + 8, isLittleEndian);
      offset += 12;

      // Three vertices
      for (let i = 0; i < 3; i++) {
        vertices.push(
          view.getFloat32(offset, isLittleEndian),
          view.getFloat32(offset + 4, isLittleEndian),
          view.getFloat32(offset + 8, isLittleEndian)
        );
        normals.push(nx, ny, nz);
        offset += 12;
      }

      offset += 2; // Skip attribute byte count
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );

    return geometry;
  }
}

interface STLViewerProps {
  stlUrl?: string;
  className?: string;
}

export function STLViewer({ stlUrl, className = "" }: STLViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const meshRef = useRef<THREE.Mesh>();
  const animationIdRef = useRef<number>();
  const controlsRef = useRef<{
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    rotationSpeed: number;
  }>({
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    rotationSpeed: 0.005,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const initThreeJS = useCallback(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, -10, -5);
    scene.add(directionalLight2);

    // Grid
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x444444);
    gridHelper.rotateX(Math.PI / 2);
    scene.add(gridHelper);
  }, []);

  const loadSTL = useCallback(async (url: string) => {
    if (!sceneRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const loader = new STLLoader();

      loader.load(
        url,
        (geometry) => {
          // Remove existing mesh
          if (meshRef.current && sceneRef.current) {
            sceneRef.current.remove(meshRef.current);
            console.log("Removed existing mesh");
          }

          // Center and scale the geometry
          geometry.computeBoundingBox();
          const box = geometry.boundingBox!;
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3 / maxDim;

          geometry.translate(-center.x, -center.y, -center.z);
          geometry.scale(scale, scale, scale);

          // Create material
          const material = new THREE.MeshPhongMaterial({
            color: 0x007bff,
            shininess: 100,
            specular: 0x222222,
          });

          // Create mesh
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          meshRef.current = mesh;

          if (sceneRef.current) {
            sceneRef.current.add(mesh);
            console.log("Added new mesh to scene", mesh);
          }

          setLoading(false);
        },
        (progress) => {
          console.log("Loading progress:", progress);
        },
        (error) => {
          console.error("Error loading STL:", error);
          setError("Failed to load 3D model");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Error loading STL:", err);
      setError("Failed to load 3D model");
      setLoading(false);
    }
  }, []);

  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    // Auto rotation - check the ref directly instead of state to avoid dependency issues
    if (isAutoRotating && meshRef.current && !controlsRef.current.isDragging) {
      meshRef.current.rotation.y += 0.01;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, [isAutoRotating]);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    if (!cameraRef.current) return;

    event.preventDefault();
    const delta = event.deltaY > 0 ? 1.1 : 0.9;
    cameraRef.current.position.multiplyScalar(delta);
    setZoom(cameraRef.current.position.length() / 5);
  }, []);

  const handleZoomIn = useCallback(() => {
    if (!cameraRef.current) return;
    cameraRef.current.position.multiplyScalar(0.9);
    setZoom(cameraRef.current.position.length() / 5);
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!cameraRef.current) return;
    cameraRef.current.position.multiplyScalar(1.1);
    setZoom(cameraRef.current.position.length() / 5);
  }, []);

  const handleReset = useCallback(() => {
    if (!cameraRef.current || !meshRef.current) return;

    cameraRef.current.position.set(0, 0, 5);
    meshRef.current.rotation.set(0, 0, 0);
    setZoom(1);
    setIsAutoRotating(true);
  }, []);

  // Initialize Three.js and mouse controls
  useEffect(() => {
    initThreeJS();

    if (!rendererRef.current) return;

    const canvas = rendererRef.current.domElement;
    canvas.style.cursor = "grab";

    // Start animation loop
    const startAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      animate();
    };

    startAnimation();

    // Mouse event handlers
    const handleCanvasMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      controlsRef.current.isDragging = true;
      setIsDragging(true);
      controlsRef.current.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      setIsAutoRotating(false);
      canvas.style.cursor = "grabbing";
      console.log("Canvas mouse down - starting drag");
    };

    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (
        !controlsRef.current.isDragging ||
        !meshRef.current ||
        !sceneRef.current
      )
        return;

      event.preventDefault();
      const deltaMove = {
        x: event.clientX - controlsRef.current.previousMousePosition.x,
        y: event.clientY - controlsRef.current.previousMousePosition.y,
      };

      meshRef.current.rotation.y +=
        deltaMove.x * controlsRef.current.rotationSpeed;
      meshRef.current.rotation.x +=
        deltaMove.y * controlsRef.current.rotationSpeed;

      controlsRef.current.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };

      console.log(
        "Mouse move - rotating mesh",
        meshRef.current.rotation.y,
        meshRef.current.rotation.x
      );
    };

    const handleGlobalMouseUp = () => {
      controlsRef.current.isDragging = false;
      setIsDragging(false);
      canvas.style.cursor = "grab";
      console.log("Global mouse up - ending drag");
    };

    // Add event listeners
    canvas.addEventListener("mousedown", handleCanvasMouseDown);
    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      // Clean up event listeners
      canvas.removeEventListener("mousedown", handleCanvasMouseDown);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [initThreeJS, animate]);

  // Load STL when URL changes
  useEffect(() => {
    if (stlUrl && sceneRef.current) {
      loadSTL(stlUrl);
    }
  }, [stlUrl, loadSTL]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br from-background to-muted/20 rounded-lg overflow-hidden ${className}`}
    >
      <div
        ref={mountRef}
        className="w-full h-full"
        style={{ minHeight: "400px", touchAction: "none", userSelect: "none" }}
        onWheel={handleWheel}
        onDragStart={(e) => e.preventDefault()}
        onSelectStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-sm text-destructive mb-2">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => stlUrl && loadSTL(stlUrl)}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* No STL URL */}
      {!stlUrl && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              No 3D model available
            </p>
          </div>
        </div>
      )}

      {/* 3D Viewer Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleZoomIn}
          disabled={loading}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleZoomOut}
          disabled={loading}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          disabled={loading}
        >
          <Move3D className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleReset}
          disabled={loading}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        {stlUrl && (
          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => window.open(stlUrl, "_blank")}
            disabled={loading}
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-md px-3 py-1">
          <div
            className={`w-2 h-2 rounded-full ${
              loading
                ? "bg-yellow-500 animate-pulse"
                : error
                  ? "bg-destructive"
                  : isDragging
                    ? "bg-primary animate-pulse"
                    : isAutoRotating
                      ? "bg-primary animate-pulse"
                      : "bg-muted"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {loading
              ? "Loading..."
              : error
                ? "Error"
                : isDragging
                  ? "Dragging"
                  : isAutoRotating
                    ? "Auto-rotating"
                    : "Manual control"}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-xs text-muted-foreground max-w-48">
          <p>
            Drag to rotate, scroll to zoom. Use controls for precise
            adjustments.
          </p>
        </div>
      </div>
    </div>
  );
}
