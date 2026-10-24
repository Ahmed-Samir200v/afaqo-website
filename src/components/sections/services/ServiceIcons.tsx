import React from "react";
import { AFAQO_ICON_STROKE } from "@/components/icons/AfaqoIcon";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// 01 - XR Icons
export function IconVRHeadset({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <path d="M7 14c1.5-1 3-1 5 0 2-1 3.5-1 5 0" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <circle cx="8" cy="11" r="1.5" />
      <circle cx="16" cy="11" r="1.5" />
      <path d="M2 10V8c0-.6.4-1 1-1" />
      <path d="M22 10V8c0-.6-.4-1-1-1" />
    </svg>
  );
}

export function IconMobileAR({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <line x1="11" y1="18" x2="13" y2="18" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M12 5.5v1.5M12 13v1.5M7.5 10H9M15 10h1.5" />
    </svg>
  );
}

export function IconMixedReality({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Isometric 3D Cube with spatial anchor dots */}
      <path d="M12 2.5L20.5 7.4V16.6L12 21.5L3.5 16.6V7.4L12 2.5Z" />
      <path d="M12 2.5V12M12 12L20.5 7.4M12 12L3.5 7.4" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="7.5" cy="5" r="1" fill={color} />
      <circle cx="16.5" cy="5" r="1" fill={color} />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  );
}

export function IconCrossPlatform({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Desktop Screen + Mobile Device */}
      <rect x="2" y="3" width="15" height="11" rx="2" />
      <line x1="6" y1="18" x2="13" y2="18" />
      <line x1="9.5" y1="14" x2="9.5" y2="18" />
      <rect x="15" y="8" width="7" height="13" rx="1.5" />
      <circle cx="18.5" cy="18" r="0.75" fill={color} />
    </svg>
  );
}

// 02 - Interactive 3D & Digital Environments
export function Icon3DExplorers({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Isometric Cube with Wireframe Vertices */}
      <path d="M12 2.5L20.5 7.4V16.6L12 21.5L3.5 16.6V7.4L12 2.5Z" />
      <path d="M12 2.5V12M12 12L20.5 7.4M12 12L3.5 7.4" />
      <circle cx="12" cy="2.5" r="1.25" fill={color} />
      <circle cx="20.5" cy="7.4" r="1.25" fill={color} />
      <circle cx="3.5" cy="7.4" r="1.25" fill={color} />
      <circle cx="20.5" cy="16.6" r="1.25" fill={color} />
      <circle cx="3.5" cy="16.6" r="1.25" fill={color} />
      <circle cx="12" cy="21.5" r="1.25" fill={color} />
    </svg>
  );
}

export function IconDigitalReplicas({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Twin Synchronized Digital Replicas */}
      <rect x="2" y="4" width="8" height="8" rx="2" />
      <rect x="14" y="12" width="8" height="8" rx="2" />
      <path d="M10 8h4a2 2 0 0 1 2 2v2" />
      <polyline points="14 10 16 12 18 10" />
      <path d="M14 16H10a2 2 0 0 1-2-2v-2" />
      <polyline points="10 14 8 12 6 14" />
    </svg>
  );
}

export function IconComponentInspection({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Precision Mechanical Gear */}
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function IconWebGLApps({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Desktop Screen with WebGL 3D Geometry */}
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 12l3.5-3 3.5 3-3.5 3z" />
      <line x1="10.5" y1="9" x2="10.5" y2="15" />
    </svg>
  );
}

// 03 - Real-Time 3D Production
export function Icon3DEnvironments({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 3D Environment Geometry / Architectural Cube */}
      <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
      <path d="M12 2V12" />
      <path d="M12 12L21 7" />
      <path d="M12 12L3 7" />
      <line x1="7.5" y1="14.5" x2="7.5" y2="19.5" />
      <line x1="16.5" y1="14.5" x2="16.5" y2="19.5" />
    </svg>
  );
}

export function IconMaterialsLighting({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Material Sphere with Light Rays & Specular Highlight */}
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="20" y1="4" x2="18.5" y2="5.5" />
      <line x1="23" y1="12" x2="21" y2="12" />
      <circle cx="15" cy="9" r="1" fill={color} />
    </svg>
  );
}

export function IconOptimization({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Performance Optimization Gauge / Dial */}
      <path d="M4.5 16.5A8.5 8.5 0 1 1 19.5 16.5" />
      <line x1="12" y1="12" x2="16.5" y2="7.5" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="3.5" x2="12" y2="5.5" />
      <line x1="6" y1="6" x2="7.5" y2="7.5" />
      <line x1="18" y1="6" x2="16.5" y2="7.5" />
    </svg>
  );
}

export function IconCinematics({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* High-Resolution Cinematic Video Sequence / Play Icon */}
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

// 04 - Simulation & Immersive Training
export function IconScenarioTraining({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Scenario-based Training 3D Equipment Cube */}
      <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
      <path d="M12 2V12" />
      <path d="M12 12L21 7" />
      <path d="M12 12L3 7" />
    </svg>
  );
}

export function IconWalkthroughs({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Waypoint Path / Spatial Walkthrough Navigation */}
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 17C12 16 11 11 15.5 8" />
      <polyline points="13 6 18 6 18 11" />
      <circle cx="11.5" cy="13.5" r="1" fill={color} />
    </svg>
  );
}

export function IconGuidedLearning({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Guided Learning Flows / Open Instructional Guide */}
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function IconMultiPlatform({
  size = 32,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Multi-Platform Deployment (Screen + Tablet/Headset) */}
      <rect x="2" y="3" width="16" height="12" rx="2" />
      <rect x="14" y="9" width="8" height="12" rx="1.5" />
      <line x1="6" y1="19" x2="12" y2="19" />
      <line x1="9" y1="15" x2="9" y2="19" />
    </svg>
  );
}

export function IconArrowRight({
  size = 18,
  color = "currentColor",
  strokeWidth = AFAQO_ICON_STROKE,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// S06 — System Architecture 5 Process Stage Icons (#20A6FF, size: 38–42px)
// ---------------------------------------------------------------------------

export function IconStageDiscovery({
  size = 40,
  color = "#20A6FF",
  strokeWidth = 1.8,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 01 — Discovery & Strategy: Strategic Idea / Lightbulb with rays */}
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="10" y1="8" x2="14" y2="8" />
    </svg>
  );
}

export function IconStageArchitecture({
  size = 40,
  color = "#20A6FF",
  strokeWidth = 1.8,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 02 — Experience Architecture: Layered Spatial Systems */}
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}

export function IconStageProduction({
  size = 40,
  color = "#20A6FF",
  strokeWidth = 1.8,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 03 — 3D & Spatial Asset Production: Isometric Wireframe Asset Cube */}
      <path d="M12 2.5L20.5 7.4V16.6L12 21.5L3.5 16.6V7.4L12 2.5Z" />
      <path d="M12 2.5V12" />
      <path d="M12 12L20.5 7.4" />
      <path d="M12 12L3.5 7.4" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

export function IconStageEngineering({
  size = 40,
  color = "#20A6FF",
  strokeWidth = 1.8,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 04 — Real-Time Engineering: Interactive Screen & System Logic */}
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <polyline points="7 9 10 11 7 13" />
      <line x1="12" y1="13" x2="16" y2="13" />
    </svg>
  );
}

export function IconStageValidation({
  size = 40,
  color = "#20A6FF",
  strokeWidth = 1.8,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 05 — Validation & Deployment: Quality Verification Shield with Check */}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
