const MEDIA = "/images/projects/industrial-training/oil%20and%20gas/";

export const sumedMedia = {
  hero: `${MEDIA}industrial-training.png`,
  scope: `${MEDIA}Project%20Scope.png`,
  pid: `${MEDIA}95ae18b8-9180-4c82-b6f0-458551ddd4b5.png`,
  spatial: `${MEDIA}fc3f5f13-4e7f-4d91-85b7-110f8d37f1f9.png`,
  exploded: `${MEDIA}30a2d880-c678-4853-95a7-c734bd0934d6.png`,
  training: `${MEDIA}691669b8-34da-4ef1-9349-1b0c6ba4b234.png`,
  internal: `${MEDIA}efb53474-9b4b-4db3-a3eb-18053181c2ca.png`,
  quest: `${MEDIA}Quest%203.png`,
  pico: `${MEDIA}Pico%204.png`,
  overviewVideo: `${MEDIA}Creating_industrial_showcase_video_1080p_20261018000805.mp4`,
  overviewPoster: `${MEDIA}Image%20Sequence_001_0000.jpg`,
  trainingVideo: `${MEDIA}Create_interactive_plant_sequence_1080p_20261018000344.mp4`,
  trainingPoster: `${MEDIA}691669b8-34da-4ef1-9349-1b0c6ba4b234.png`,
};

export const gallery = [
  { src: `${MEDIA}de83fd7a-6c84-434f-9cb3-f29c64f9ae2b.png`, title: "Multi-Skid Pumping Complex", label: "Facility Overview", caption: "Wide perspective of assembled pump skids, structural steel framework, and overhead piping manifolds.", icon: "facility" },
  { src: `${MEDIA}42c031f4-e7d3-495f-8e4d-5b7b397c2d82.png`, title: "Pump Skid & Local Control Cabinet", label: "Equipment Detail", caption: "Close equipment view showing the pump skid, electric drive and local controls.", icon: "settings" },
  { src: `${MEDIA}8a47c34f-a8b4-49c4-9d2a-37954110d509.png`, title: "Piping & Distribution", label: "Pipe Routing", caption: "A spatial view of connected piping, utility distribution and valve stations.", icon: "route" },
  { src: `${MEDIA}f310aca6-30d4-4587-8fdc-3a82bb09199b.png`, title: "Structural & Access Context", label: "Structural Context", caption: "Equipment, access space and structural framing understood as one environment.", icon: "structure" },
  { src: `${MEDIA}8c9e6730-aec3-4309-857d-47dc96db0384.png`, title: "Facility Support Systems", label: "Control Systems", caption: "Supporting infrastructure positioned within the complete facility context.", icon: "controls" },
] as const;

export const metadata = [
  ["building", "Client", "SUMED — Arab Petroleum Pipelines Company"],
  ["facility", "Facility", "LPG Handling Station"],
  ["pin", "Location", "Ain Sukhna, Egypt"],
  ["industry", "Industry", "Oil & Gas / Petroleum Infrastructure"],
  ["cube", "Project Type", "Industrial Digital Facility"],
  ["layers", "AFAQO Role", "3D Facility Reconstruction & Interactive Exploration"],
] as const;

export const deliverables = [
  ["equipment", "Industrial Equipment Models", "Detailed 3D models of equipment, valves, tanks, and project assets."],
  ["facility", "LPG Facility Environment", "A coherent, fully navigable 3D environment of the facility."],
  ["layers", "Mechanical Assemblies", "Structured assemblies with explorable valves, pumps and components."],
  ["data", "Real-Time Data Integration", "Connection with Hisense for operational data and system status."],
  ["route", "Process Route Visualization", "Interactive process paths and system relationships."],
  ["tank", "Interactive Tank Operations", "Internal tank processes represented for exploration and understanding."],
  ["headset", "Immersive Training Experience", "Interactive training application for VR and desktop."],
  ["package", "Complete Deliverables", "EXE and APK applications for desktop, Android, Meta Quest 3 and Pico 4."],
] as const;

export const platforms = [
  ["desktop", "Windows (EXE)", "Full interactive desktop application", null],
  ["mobile", "Android (APK)", "Mobile & tablet application", null],
  ["headset", "Meta Quest 3", "VR immersive experience", sumedMedia.quest],
  ["headset", "Pico 4", "VR immersive experience", sumedMedia.pico],
] as const;
