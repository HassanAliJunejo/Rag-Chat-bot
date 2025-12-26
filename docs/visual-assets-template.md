# Visual Assets Template and Guidelines

## Purpose
This document provides templates and guidelines for creating visual assets (diagrams and illustrations) for the Physical AI & Humanoid Robotics Book.

## File Format and Naming Convention
- Use SVG format when possible for scalability
- Use PNG format for complex images that can't be rendered as SVG
- Name files descriptively: `concept-name-diagram.svg` or `concept-name-diagram.png`
- Organize files in subdirectories by chapter: `static/images/chapter-1/`, `static/images/chapter-2/`, etc.

## Design Principles
- Keep diagrams clean and uncluttered
- Use consistent color scheme throughout
- Include legends when necessary
- Ensure visual elements are appropriately labeled
- Maintain adequate contrast for accessibility

## Recommended Tools
- For vector graphics: draw.io, Inkscape, or Adobe Illustrator
- For diagrams: draw.io, Lucidchart, or Visio
- For screenshots: Built-in screenshot tools or Snagit

## Chapter-Specific Visual Assets

### Chapter 1: Introduction to ROS 2 for Humanoid Robotics
- ROS 2 as a nervous system diagram
- Nodes, topics, services, and actions illustration
- Comparison diagram: ROS 2 vs traditional architectures

### Chapter 2: ROS 2 Communication & Python Agents
- Services vs topics comparison diagram
- Message flow diagram (perception, planning, actuation)
- rclpy integration diagram

### Chapter 3: Humanoid Structure with URDF
- URDF structure diagram
- Links and joints diagram
- URDF integration diagram

## Accessibility Considerations
- Include alt text for all images in markdown files
- Use sufficient color contrast (minimum 4.5:1 ratio)
- Provide text descriptions of visual content
- Consider colorblind-friendly palettes