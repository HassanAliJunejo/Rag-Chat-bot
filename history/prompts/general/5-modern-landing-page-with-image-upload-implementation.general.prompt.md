---
id: 5
title: Modern Landing Page with Image Upload Implementation
stage: general
date: '2025-12-21'
model: 'GPT-4'
feature: 'none'
branch: 'main'
user: 'user'
command: '/sp.implement Create a modern landing page for "Physical AI & Humanoid Robotics Book" with the following specifications:\n\nOVERALL LAYOUT:\n- Full-width, full-height page layout\n- Split into two sections: 60% left content, 40% right side\n- Dark gradient background from #0f172a to #1e293b\n- Minimum height: 100vh\n- Padding: 40px around the container\n- Gap between left and right sections: 60px\n\nLEFT SIDE CONTENT SECTION:\nMaximum width: 650px\n\n1. Main Heading:\n   - Text: "Physical AI & Humanoid Robotics Book"\n   - Font size: 3.5rem\n   - Font weight: 700 (bold)\n   - Gradient text effect: linear gradient from #06b6d4 (cyan) to #3b82f6 (blue)\n   - Line height: 1.2\n   - Margin bottom: 20px\n   - Animation: Slide in from left on page load (0.8s ease-out)\n\n2. Subheading:\n   - Text: "Module 1: The Robotic Nervous System (ROS 2)"\n   - Font size: 1.5rem\n   - Color: #94a3b8 (light gray)\n   - Font weight: 500\n   - Margin bottom: 15px\n\n3. Tagline:\n   - Text: "ROS 2 • Intelligent Agents • Humanoid Systems"\n   - Font size: 1.1rem\n   - Color: #06b6d4 (cyan)\n   - Font weight: 400\n   - Margin bottom: 40px\n\n4. CTA Button:\n   - Text: "Read Module 1 - ROS 2 Concepts"\n   - Padding: 18px horizontal, 40px vertical\n   - Background: Linear gradient from #06b6d4 to #0891b2\n   - Border radius: 12px\n   - Font size: 1.1rem\n   - Font weight: 600\n   - Box shadow: 0 10px 30px rgba(6, 182, 212, 0.3)\n   - Margin bottom: 50px\n   - Hover effect: Lift up by 3px, increase shadow to 0 15px 40px rgba(6, 182, 212, 0.5)\n   - Transition: 0.3s ease\n\n5. Three Feature Cards (Grid layout with 20px gap):\n\n   Card Design (applies to all three):\n   - Background: rgba(255, 255, 255, 0.05) with backdrop blur (glassmorphism)\n   - Border: 1px solid rgba(255, 255, 255, 0.1)\n   - Border radius: 16px\n   - Padding: 30px\n   - Hover effect: Background changes to rgba(255, 255, 255, 0.08), slides 10px to the right, border color changes to rgba(6, 182, 212, 0.5)\n   - Transition: 0.3s ease\n\n   Card 1 - ROS 2 Fundamentals:\n   - Title: "ROS 2 Fundamentals" (Font size: 1.4rem, Color: #06b6d4, Font weight: 600, Margin bottom: 12px)\n   - Description: "Learn the core concepts of ROS 2 as the middleware nervous system" (Color: #cbd5e1, Font size: 1rem, Line height: 1.6)\n\n   Card 2 - Python Agents:\n   - Title: "Python Agents" (Same styling as Card 1)\n   - Description: "Connect your Python-based AI agents to the ROS 2"\n\n   Card 3 - Humanoid Structure:\n   - Title: "Humanoid Structure" (Same styling as Card 1)\n   - Description: "Understand how to define the structural properties of humanoid systems"\n\nRIGHT SIDE SECTION:\n- Display centered content\n- Animation: Slide in from right on page load (0.8s ease-out)\n\nImage Upload Area:\n- Width: 100%, Max-width: 500px\n- Height: 500px\n- Border: 3px dashed rgba(6, 182, 212, 0.5)\n- Border radius: 20px\n- Background: rgba(255, 255, 255, 0.03)\n- Display: Flex column, centered items\n- Cursor: pointer\n\nUpload Area Content (before image is uploaded):\n- Camera emoji icon: 📷 (Font size: 4rem, Margin bottom: 20px)\n- Text: "Click to Upload Robot Image" (Font size: 1.3rem, Color: #06b6d4, Font weight: 600, Margin bottom: 10px)\n- Hint text: "PNG, JPG up to 10MB" (Font size: 0.9rem, Color: #94a3b8)\n\nUpload Area Hover Effect:\n- Border color changes to #06b6d4\n- Background: rgba(6, 182, 212, 0.1)\n- Scale: 1.02\n- Transition: 0.3s ease\n\nRobot Image Display (after upload):\n- Width: 100%\n- Max-width: 500px\n- Height: auto\n- Border radius: 20px\n- Box shadow: 0 20px 60px rgba(0, 0, 0, 0.5)\n- Hover effect: Scale to 1.05\n- Transition: 0.3s ease\n- Replaces upload area when image is selected\n\nRESPONSIVE DESIGN:\n\nAt 1024px and below:\n- Container changes to column layout (vertical stacking)\n- Padding: 30px\n- Main heading: 2.5rem\n- Left content max-width: 100%\n\nAt 768px and below:\n- Main heading: 2rem\n- Subheading: 1.2rem\n- CTA button padding: 15px 30px\n- CTA button font size: 1rem\n\nTYPOGRAPHY:\n- Font family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif\n\nINTERACTIONS:\n- File input accepts image/* formats\n- When file is selected, image displays and upload area hides\n- All transitions are smooth with 0.3s ease timing'
labels:
  - 'ui'
  - 'landing-page'
  - 'design'
  - 'implementation'
  - 'robotics'
  - 'image-upload'
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - 'src/css/modern-landing-page.module.css'
  - 'src/pages/index.js'
tests_yaml: []
prompt_text: "Create a modern landing page for \"Physical AI & Humanoid Robotics Book\" with the following specifications:\n\nOVERALL LAYOUT:\n- Full-width, full-height page layout\n- Split into two sections: 60% left content, 40% right side\n- Dark gradient background from #0f172a to #1e293b\n- Minimum height: 100vh\n- Padding: 40px around the container\n- Gap between left and right sections: 60px\n\nLEFT SIDE CONTENT SECTION:\nMaximum width: 650px\n\n1. Main Heading:\n   - Text: \"Physical AI & Humanoid Robotics Book\"\n   - Font size: 3.5rem\n   - Font weight: 700 (bold)\n   - Gradient text effect: linear gradient from #06b6d4 (cyan) to #3b82f6 (blue)\n   - Line height: 1.2\n   - Margin bottom: 20px\n   - Animation: Slide in from left on page load (0.8s ease-out)\n\n2. Subheading:\n   - Text: \"Module 1: The Robotic Nervous System (ROS 2)\"\n   - Font size: 1.5rem\n   - Color: #94a3b8 (light gray)\n   - Font weight: 500\n   - Margin bottom: 15px\n\n3. Tagline:\n   - Text: \"ROS 2 • Intelligent Agents • Humanoid Systems\"\n   - Font size: 1.1rem\n   - Color: #06b6d4 (cyan)\n   - Font weight: 400\n   - Margin bottom: 40px\n\n4. CTA Button:\n   - Text: \"Read Module 1 - ROS 2 Concepts\"\n   - Padding: 18px horizontal, 40px vertical\n   - Background: Linear gradient from #06b6d4 to #0891b2\n   - Border radius: 12px\n   - Font size: 1.1rem\n   - Font weight: 600\n   - Box shadow: 0 10px 30px rgba(6, 182, 212, 0.3)\n   - Margin bottom: 50px\n   - Hover effect: Lift up by 3px, increase shadow to 0 15px 40px rgba(6, 182, 212, 0.5)\n   - Transition: 0.3s ease\n\n5. Three Feature Cards (Grid layout with 20px gap):\n\n   Card Design (applies to all three):\n   - Background: rgba(255, 255, 255, 0.05) with backdrop blur (glassmorphism)\n   - Border: 1px solid rgba(255, 255, 255, 0.1)\n   - Border radius: 16px\n   - Padding: 30px\n   - Hover effect: Background changes to rgba(255, 255, 255, 0.08), slides 10px to the right, border color changes to rgba(6, 182, 212, 0.5)\n   - Transition: 0.3s ease\n\n   Card 1 - ROS 2 Fundamentals:\n   - Title: \"ROS 2 Fundamentals\" (Font size: 1.4rem, Color: #06b6d4, Font weight: 600, Margin bottom: 12px)\n   - Description: \"Learn the core concepts of ROS 2 as the middleware nervous system\" (Color: #cbd5e1, Font size: 1rem, Line height: 1.6)\n\n   Card 2 - Python Agents:\n   - Title: \"Python Agents\" (Same styling as Card 1)\n   - Description: \"Connect your Python-based AI agents to the ROS 2\"\n\n   Card 3 - Humanoid Structure:\n   - Title: \"Humanoid Structure\" (Same styling as Card 1)\n   - Description: \"Understand how to define the structural properties of humanoid systems\"\n\nRIGHT SIDE SECTION:\n- Display centered content\n- Animation: Slide in from right on page load (0.8s ease-out)\n\nImage Upload Area:\n- Width: 100%, Max-width: 500px\n- Height: 500px\n- Border: 3px dashed rgba(6, 182, 212, 0.5)\n- Border radius: 20px\n- Background: rgba(255, 255, 255, 0.03)\n- Display: Flex column, centered items\n- Cursor: pointer\n\nUpload Area Content (before image is uploaded):\n- Camera emoji icon: 📷 (Font size: 4rem, Margin bottom: 20px)\n- Text: \"Click to Upload Robot Image\" (Font size: 1.3rem, Color: #06b6d4, Font weight: 600, Margin bottom: 10px)\n- Hint text: \"PNG, JPG up to 10MB\" (Font size: 0.9rem, Color: #94a3b8)\n\nUpload Area Hover Effect:\n- Border color changes to #06b6d4\n- Background: rgba(6, 182, 212, 0.1)\n- Scale: 1.02\n- Transition: 0.3s ease\n\nRobot Image Display (after upload):\n- Width: 100%\n- Max-width: 500px\n- Height: auto\n- Border radius: 20px\n- Box shadow: 0 20px 60px rgba(0, 0, 0, 0.5)\n- Hover effect: Scale to 1.05\n- Transition: 0.3s ease\n- Replaces upload area when image is selected\n\nRESPONSIVE DESIGN:\n\nAt 1024px and below:\n- Container changes to column layout (vertical stacking)\n- Padding: 30px\n- Main heading: 2.5rem\n- Left content max-width: 100%\n\nAt 768px and below:\n- Main heading: 2rem\n- Subheading: 1.2rem\n- CTA button padding: 15px 30px\n- CTA button font size: 1rem\n\nTYPOGRAPHY:\n- Font family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif\n\nINTERACTIONS:\n- File input accepts image/* formats\n- When file is selected, image displays and upload area hides\n- All transitions are smooth with 0.3s ease timing"
response_text: "Successfully implemented a modern landing page for the \"Physical AI & Humanoid Robotics Book\" with all requested features:\n\n1. Created a new CSS module (src/css/modern-landing-page.module.css) with:\n   - Full-width, full-height layout with dark gradient background\n   - Split into two sections: 60% left content, 40% right side\n   - Proper styling for all text elements with the requested color palette\n   - Glassmorphism effects on feature cards\n   - Hover effects and animations as specified\n   - Responsive design for different screen sizes\n\n2. Updated the landing page component (src/pages/index.js) with:\n   - Left side (60% width) containing all requested content:\n     * Main heading with gradient text effect (3.5rem)\n     * Subheading and tagline with proper colors and styling\n     * CTA button with gradient background, hover effects, and proper styling\n     * Three feature cards with glassmorphism effects and hover animations\n   - Right side (40% width) containing an image upload area with:\n     * Camera icon and upload instructions\n     * File input functionality for image uploads\n     * Robot image display with hover effects after upload\n   - Added state management for image uploads\n\nThe implementation follows modern design principles with glassmorphism effects, smooth animations, and responsive layout that works on all device sizes. The image upload functionality allows users to upload their own robot images which are then displayed with the proper styling and hover effects."
outcome: 'Successfully implemented the modern landing page with image upload functionality as requested.'
evaluation: 'The implementation fully satisfies all requirements: split screen layout (60/40), dark gradient background, all specified content with correct styling, feature cards with glassmorphism and hover effects, image upload functionality with proper styling and interactions, and responsive design for different screen sizes.'
---

# Modern Landing Page with Image Upload Implementation

## Prompt
Create a modern landing page for "Physical AI & Humanoid Robotics Book" with the following specifications:

OVERALL LAYOUT:
- Full-width, full-height page layout
- Split into two sections: 60% left content, 40% right side
- Dark gradient background from #0f172a to #1e293b
- Minimum height: 100vh
- Padding: 40px around the container
- Gap between left and right sections: 60px

LEFT SIDE CONTENT SECTION:
Maximum width: 650px

1. Main Heading:
   - Text: "Physical AI & Humanoid Robotics Book"
   - Font size: 3.5rem
   - Font weight: 700 (bold)
   - Gradient text effect: linear gradient from #06b6d4 (cyan) to #3b82f6 (blue)
   - Line height: 1.2
   - Margin bottom: 20px
   - Animation: Slide in from left on page load (0.8s ease-out)

2. Subheading:
   - Text: "Module 1: The Robotic Nervous System (ROS 2)"
   - Font size: 1.5rem
   - Color: #94a3b8 (light gray)
   - Font weight: 500
   - Margin bottom: 15px

3. Tagline:
   - Text: "ROS 2 • Intelligent Agents • Humanoid Systems"
   - Font size: 1.1rem
   - Color: #06b6d4 (cyan)
   - Font weight: 400
   - Margin bottom: 40px

4. CTA Button:
   - Text: "Read Module 1 - ROS 2 Concepts"
   - Padding: 18px horizontal, 40px vertical
   - Background: Linear gradient from #06b6d4 to #0891b2
   - Border radius: 12px
   - Font size: 1.1rem
   - Font weight: 600
   - Box shadow: 0 10px 30px rgba(6, 182, 212, 0.3)
   - Margin bottom: 50px
   - Hover effect: Lift up by 3px, increase shadow to 0 15px 40px rgba(6, 182, 212, 0.5)
   - Transition: 0.3s ease

5. Three Feature Cards (Grid layout with 20px gap):

   Card Design (applies to all three):
   - Background: rgba(255, 255, 255, 0.05) with backdrop blur (glassmorphism)
   - Border: 1px solid rgba(255, 255, 255, 0.1)
   - Border radius: 16px
   - Padding: 30px
   - Hover effect: Background changes to rgba(255, 255, 255, 0.08), slides 10px to the right, border color changes to rgba(6, 182, 212, 0.5)
   - Transition: 0.3s ease

   Card 1 - ROS 2 Fundamentals:
   - Title: "ROS 2 Fundamentals" (Font size: 1.4rem, Color: #06b6d4, Font weight: 600, Margin bottom: 12px)
   - Description: "Learn the core concepts of ROS 2 as the middleware nervous system" (Color: #cbd5e1, Font size: 1rem, Line height: 1.6)

   Card 2 - Python Agents:
   - Title: "Python Agents" (Same styling as Card 1)
   - Description: "Connect your Python-based AI agents to the ROS 2"

   Card 3 - Humanoid Structure:
   - Title: "Humanoid Structure" (Same styling as Card 1)
   - Description: "Understand how to define the structural properties of humanoid systems"

RIGHT SIDE SECTION:
- Display centered content
- Animation: Slide in from right on page load (0.8s ease-out)

Image Upload Area:
- Width: 100%, Max-width: 500px
- Height: 500px
- Border: 3px dashed rgba(6, 182, 212, 0.5)
- Border radius: 20px
- Background: rgba(255, 255, 255, 0.03)
- Display: Flex column, centered items
- Cursor: pointer

Upload Area Content (before image is uploaded):
- Camera emoji icon: 📷 (Font size: 4rem, Margin bottom: 20px)
- Text: "Click to Upload Robot Image" (Font size: 1.3rem, Color: #06b6d4, Font weight: 600, Margin bottom: 10px)
- Hint text: "PNG, JPG up to 10MB" (Font size: 0.9rem, Color: #94a3b8)

Upload Area Hover Effect:
- Border color changes to #06b6d4
- Background: rgba(6, 182, 212, 0.1)
- Scale: 1.02
- Transition: 0.3s ease

Robot Image Display (after upload):
- Width: 100%
- Max-width: 500px
- Height: auto
- Border radius: 20px
- Box shadow: 0 20px 60px rgba(0, 0, 0, 0.5)
- Hover effect: Scale to 1.05
- Transition: 0.3s ease
- Replaces upload area when image is selected

RESPONSIVE DESIGN:

At 1024px and below:
- Container changes to column layout (vertical stacking)
- Padding: 30px
- Main heading: 2.5rem
- Left content max-width: 100%

At 768px and below:
- Main heading: 2rem
- Subheading: 1.2rem
- CTA button padding: 15px 30px
- CTA button font size: 1rem

TYPOGRAPHY:
- Font family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

INTERACTIONS:
- File input accepts image/* formats
- When file is selected, image displays and upload area hides
- All transitions are smooth with 0.3s ease timing

## Response
Successfully implemented a modern landing page for the "Physical AI & Humanoid Robotics Book" with all requested features:

1. Created a new CSS module (src/css/modern-landing-page.module.css) with:
   - Full-width, full-height layout with dark gradient background
   - Split into two sections: 60% left content, 40% right side
   - Proper styling for all text elements with the requested color palette
   - Glassmorphism effects on feature cards
   - Hover effects and animations as specified
   - Responsive design for different screen sizes

2. Updated the landing page component (src/pages/index.js) with:
   - Left side (60% width) containing all requested content:
     * Main heading with gradient text effect (3.5rem)
     * Subheading and tagline with proper colors and styling
     * CTA button with gradient background, hover effects, and proper styling
     * Three feature cards with glassmorphism effects and hover animations
   - Right side (40% width) containing an image upload area with:
     * Camera icon and upload instructions
     * File input functionality for image uploads
     * Robot image display with hover effects after upload
   - Added state management for image uploads

The implementation follows modern design principles with glassmorphism effects, smooth animations, and responsive layout that works on all device sizes. The image upload functionality allows users to upload their own robot images which are then displayed with the proper styling and hover effects.

## Outcome
Successfully implemented the modern landing page with image upload functionality as requested.

## Evaluation
The implementation fully satisfies all requirements: split screen layout (60/40), dark gradient background, all specified content with correct styling, feature cards with glassmorphism and hover effects, image upload functionality with proper styling and interactions, and responsive design for different screen sizes.