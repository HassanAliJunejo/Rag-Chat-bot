# Physical AI & Humanoid Robotics Book - Module 1: The Robotic Nervous System (ROS 2) + RAG Chatbot

This repository contains the documentation for Module 1 of the Physical AI & Humanoid Robotics Book, focusing on ROS 2 as the middleware nervous system for humanoid robots. It also includes a Retrieval-Augmented Generation (RAG) chatbot that allows users to ask questions about the book content.

## About This Module

Module 1 introduces ROS 2 as the middleware for humanoid robots, covering core communication concepts and humanoid modeling foundations. This module bridges software agents with physical robot components, targeting AI developers, robotics students, and engineers with basic Python knowledge transitioning into physical AI and humanoid robotics.

### Chapters Covered

1. **Introduction to ROS 2 for Humanoid Robotics** - What ROS 2 is and why it is critical for Physical AI, ROS 2 as a robotic nervous system, Nodes, topics, services, and actions (conceptual overview), How ROS 2 differs from traditional software architectures

2. **ROS 2 Communication & Python Agents** - ROS 2 nodes, publishers, and subscribers in practice, Services vs topics (when to use each), Using `rclpy` to connect Python AI agents to robot controllers, Message flow between perception, planning, and actuation

3. **Humanoid Structure with URDF** - What URDF is and why it matters for humanoids, Links, joints, and coordinate frames, Modeling a basic humanoid robot structure, How URDF connects ROS 2, simulation, and control

## RAG Chatbot Features

The repository also includes a RAG chatbot that allows users to query the book content:

- Query the Docusaurus book content using natural language
- Answers based only on retrieved documentation chunks
- Falls back to "Not found in the book." when content is not available
- Uses Qdrant for vector storage and retrieval
- Integrates with OpenAI embeddings API

### RAG Chatbot Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up your OpenAI API key:**
   ```bash
   # On Windows
   set OPENAI_API_KEY=your_actual_api_key_here

   # On Unix/Mac
   export OPENAI_API_KEY=your_actual_api_key_here
   ```

3. **Run the complete pipeline:**
   ```bash
   python main.py
   ```

For more details on the RAG chatbot, see `rag_chatbot_README.md`.

## Getting Started with Documentation

To run the documentation site locally:

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

The site will be available at http://localhost:3000.

## Accessibility

We are committed to making this documentation accessible to all users, including those with disabilities. The documentation is designed with the following accessibility considerations:

- Content written at Grade 10-12 readability level
- Proper heading hierarchy for screen readers
- Sufficient color contrast in diagrams and visual elements
- Alternative text for images (where applicable)
- Semantic HTML structure

If you encounter accessibility issues or have suggestions for improvements, please contact us through the feedback mechanism described below.

## Deployment

To build and deploy the documentation site:

### Building for Production
```bash
npm run build
```
This creates a `build` directory with the static site that can be deployed to any web server.

### GitHub Pages Deployment
The site is configured for GitHub Pages deployment:

1. Commit the changes to your repository
2. Enable GitHub Pages in the repository settings (select the `gh-pages` branch)
3. The site will be available at: `https://your-username.github.io/ros2-humanoid-book`

Alternatively, you can use the following command if you have the GitHub CLI installed:
```bash
gh-pages -d build
```

### Custom Domain
To use a custom domain:
1. Add a `CNAME` file to the `static` directory with your domain
2. Configure your DNS to point to GitHub Pages

## Contributing

We welcome contributions to improve the documentation. Please see our contribution guidelines in the community section of the documentation.