# HARSH SINGH — 3D Mechanical Engineering & Robotics Portfolio

A high-performance, interactive 3D engineering portfolio inspired by *God of War* diegetic UI and precision mechanical CAD systems. Built with **React**, **Vite**, **Tailwind CSS**, and **Three.js** (zero heavy bloat, hardware-accelerated WebGL).

## Features
- **Interactive 3D Robotic Finger Hero ("The Forge"):** Full-screen `100vh` WebGL centerpiece featuring an articulated mechanical & tendon-driven robotic finger (MCP, PIP, and DIP joints). Hovering over the prosthetic triggers an active servo-engage curl, illuminates internal cyan tendon actuators, and expands a holographic rune ring.
- **Click-Through Camera Transition:** Clicking the 3D Robotic Finger or **Enter The Armory** transitions smoothly into the interactive project showcase.
- **The Armory (Interactive 3D Pedestal):** Cycle between 4 distinct engineering artifacts with real-time 3D models and interactive joint flexion controls:
  1. Robotic Finger with Enhanced Dexterity (Dual Prototypes)
  2. Custom Fabricated Go-Kart Chassis
  3. Water Fuel Cell Engine Concept
  4. North Eastern Railway Surface Operations (Abrasive Blasting)
- **Service Record & Codex:** Complete timeline of industrial training at North Eastern Railway (Gorakhpur), B.Tech Mechanical Engineering at KNIT Sultanpur, GATE Production Engineering **AIR 1110**, and technical skills.

## Quick Start (Local Development)
```bash
npm install
npm run dev
```

## Replacing Procedural Models with Your SOLIDWORKS `.glb` Files
1. Export your SOLIDWORKS assembly as `.stl` or `.step`, import into Blender, apply metallic/roughness materials, and export as `robotic-finger.glb` inside `public/models/`.
2. Load it in `src/components/RoboticCanvas.jsx` using Three.js `GLTFLoader`.

## Deploy to Vercel / GitHub Pages
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com) — it auto-detects Vite and deploys with zero configuration.
