import * as THREE from 'three';

/**
 * Procedural texture generator for ultra-realistic mattress materials in Three.js
 * Generates high-resolution canvas textures without relying on large external texture downloads.
 */

// 1. Quilted Belgian Damask Knit Texture (Top Cover)
export function createQuiltedFabricTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm ivory background
  ctx.fillStyle = '#FAF7F0';
  ctx.fillRect(0, 0, size, size);

  // Micro-weave woven fabric noise
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Diamond Quilting Pattern with Pillow Shading
  const gridSize = 128;
  ctx.lineWidth = 2.5;

  for (let y = 0; y <= size + gridSize; y += gridSize) {
    for (let x = 0; x <= size + gridSize; x += gridSize) {
      // Soft radial gradient for embossed pillow puffiness
      const radGrad = ctx.createRadialGradient(x, y, 5, x, y, gridSize * 0.7);
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      radGrad.addColorStop(0.6, 'rgba(250, 245, 235, 0.1)');
      radGrad.addColorStop(1, 'rgba(215, 205, 190, 0.25)');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.moveTo(x, y - gridSize * 0.5);
      ctx.lineTo(x + gridSize * 0.5, y);
      ctx.lineTo(x, y + gridSize * 0.5);
      ctx.lineTo(x - gridSize * 0.5, y);
      ctx.closePath();
      ctx.fill();

      // Stitch lines
      ctx.strokeStyle = 'rgba(189, 139, 67, 0.35)'; // Champagne gold fine stitch
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x - gridSize * 0.5, y);
      ctx.lineTo(x, y - gridSize * 0.5);
      ctx.lineTo(x + gridSize * 0.5, y);
      ctx.lineTo(x, y + gridSize * 0.5);
      ctx.closePath();
      ctx.stroke();

      // Tufting button / indentation at intersections
      const tuftGrad = ctx.createRadialGradient(x, y, 0, x, y, 7);
      tuftGrad.addColorStop(0, 'rgba(120, 100, 80, 0.5)');
      tuftGrad.addColorStop(0.5, 'rgba(180, 165, 145, 0.3)');
      tuftGrad.addColorStop(1, 'rgba(250, 245, 235, 0)');
      ctx.fillStyle = tuftGrad;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 4);
  return texture;
}

// 2. High-Resilience EP Foam Texture
export function createEPFoamTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Pale warm cream
  ctx.fillStyle = '#F4EFE6';
  ctx.fillRect(0, 0, size, size);

  // Cellular pores
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.2 + 0.5;
    const alpha = Math.random() * 0.12 + 0.04;
    ctx.fillStyle = `rgba(180, 165, 145, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// 3. High-Rebound Ortho Foam Texture
export function createReboundFoamTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft sage-ivory base
  ctx.fillStyle = '#E8ECE6';
  ctx.fillRect(0, 0, size, size);

  // Mottled high-density composite speckles
  const colors = ['#D4DDD1', '#DCE3D9', '#C8D4C5', '#F0F3EF'];
  for (let i = 0; i < 1800; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const w = Math.random() * 9 + 3;
    const h = Math.random() * 7 + 2;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.globalAlpha = Math.random() * 0.4 + 0.2;
    ctx.beginPath();
    ctx.ellipse(x, y, w / 2, h / 2, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// 4. Cooling Visco-Elastic Memory Foam Texture
export function createMemoryFoamTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft pearl cream
  ctx.fillStyle = '#E4DFD3';
  ctx.fillRect(0, 0, size, size);

  // Micro-gel cooling beads (subtle cyan/aquamarine flecks)
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.5 + 0.8;
    ctx.fillStyle = 'rgba(125, 175, 185, 0.45)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft sponge density shading
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.8 + 0.4;
    ctx.fillStyle = 'rgba(160, 150, 135, 0.12)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// 5. Pin-Core Natural Aerated Latex Texture
export function createLatexPincoreTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Natural organic latex ivory base
  ctx.fillStyle = '#DCE6DC';
  ctx.fillRect(0, 0, size, size);

  // Regular grid of pin-core aeration micro-columns
  const gridStep = 32;
  for (let y = gridStep / 2; y < size; y += gridStep) {
    for (let x = gridStep / 2; x < size; x += gridStep) {
      // Aeration hole depth shadow
      const holeGrad = ctx.createRadialGradient(x, y, 1, x, y, 7.5);
      holeGrad.addColorStop(0, '#5C7462');
      holeGrad.addColorStop(0.65, '#849E8A');
      holeGrad.addColorStop(0.85, '#B8CCBC');
      holeGrad.addColorStop(1, '#DCE6DC');

      ctx.fillStyle = holeGrad;
      ctx.beginPath();
      ctx.arc(x, y, 7.5, 0, Math.PI * 2);
      ctx.fill();

      // Rim highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 8, Math.PI * 0.8, Math.PI * 1.8);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 5);
  return texture;
}

// 6. Pocket Spring Grid Assembly Texture
export function createPocketSpringTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Breathable spunbond fabric background
  ctx.fillStyle = '#E5E8EA';
  ctx.fillRect(0, 0, size, size);

  // Cylindrical pocket rows with steel spring coil shadows
  const step = 64;
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      // Fabric pocket border
      ctx.strokeStyle = 'rgba(150, 160, 165, 0.45)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, y + 2, step - 4, step - 4);

      // Helical spring contour inside the pocket
      ctx.strokeStyle = 'rgba(80, 95, 105, 0.38)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(x + step / 2, y + step / 2, step * 0.36, step * 0.36, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Metallic highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x + step / 2, y + step / 2, step * 0.32, -Math.PI * 0.4, Math.PI * 0.2);
      ctx.stroke();

      // Stitch line between pockets
      ctx.strokeStyle = 'rgba(120, 130, 135, 0.3)';
      ctx.setLineDash([3, 2]);
      ctx.strokeRect(x, y, step, step);
      ctx.setLineDash([]);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 4);
  return texture;
}

// 7. Organic Coconut Coir Texture
export function createNaturalCoirTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Dark amber brown earthy base
  ctx.fillStyle = '#735234';
  ctx.fillRect(0, 0, size, size);

  // Intertwined coconut fiber strands
  const strandColors = ['#8C633E', '#5D4129', '#A27349', '#4E3621', '#B88554'];
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const len = Math.random() * 32 + 10;
    const angle = Math.random() * Math.PI * 2;
    const color = strandColors[Math.floor(Math.random() * strandColors.length)];

    ctx.strokeStyle = color;
    ctx.lineWidth = Math.random() * 1.8 + 0.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(
      x + Math.cos(angle) * (len * 0.5) + (Math.random() - 0.5) * 6,
      y + Math.sin(angle) * (len * 0.5) + (Math.random() - 0.5) * 6,
      x + Math.cos(angle) * len,
      y + Math.sin(angle) * len
    );
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

// 8. Mattress Border Tape with Champagne Gold Double Piping & MINDFREE Badge
export function createMattressBorderTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm ivory vertical quilted border
  ctx.fillStyle = '#FAF7F1';
  ctx.fillRect(0, 0, width, height);

  // Vertical stitch stripes
  ctx.strokeStyle = 'rgba(189, 139, 67, 0.25)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Double piping border bands at top and bottom (Forest green + Champagne Gold)
  ctx.fillStyle = '#0A2E73'; // Deep Forest Green band
  ctx.fillRect(0, 0, width, 14);
  ctx.fillRect(0, height - 14, width, 14);

  ctx.fillStyle = '#E3262E'; // Champagne Gold accent band
  ctx.fillRect(0, 14, width, 4);
  ctx.fillRect(0, height - 18, width, 4);

  // MINDFREE Embroidered Luxury Brand Badge in Center
  const badgeW = 240;
  const badgeH = 74;
  const badgeX = (width - badgeW) / 2;
  const badgeY = (height - badgeH) / 2;

  // Badge background (Deep evergreen leather/woven patch)
  ctx.fillStyle = '#0C2D22';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 8);
  ctx.fill();

  // Fine gold border around badge
  ctx.strokeStyle = '#E3262E';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Embroidered text "Mindfree"
  ctx.fillStyle = '#FBF8F2';
  ctx.font = 'bold 26px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Mindfree', width / 2, height / 2 - 8);

  ctx.fillStyle = '#E3262E';
  ctx.font = '600 10px sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('SLEEP PURE · LIVE BETTER', width / 2, height / 2 + 18);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
