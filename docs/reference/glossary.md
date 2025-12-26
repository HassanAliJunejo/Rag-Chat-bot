---
sidebar_position: 100
---

# Glossary of ROS 2 Terms

## A

### Action
A communication pattern in ROS 2 for long-running tasks that might take time to complete and can be canceled. Actions have three parts: goal, feedback, and result.

### Architecture
The structural design of a software system. In ROS 2, the architecture is distributed, allowing different components to run on different machines.

## B

### Build System
Tools and processes that compile source code into executable programs. ROS 2 uses colcon as its build system.

## C

### Client
A node that calls a service provided by another node.

### Communication Pattern
The method by which nodes exchange information in ROS 2. The main patterns are topics (publish/subscribe), services (request/response), and actions (goal-oriented).

### Coordinate Frame
A system for specifying positions and orientations in 3D space. ROS 2 uses the TF2 library to manage transforms between coordinate frames.

## D

### DDS (Data Distribution Service)
The middleware standard that ROS 2 is built on. DDS provides the underlying communication infrastructure for ROS 2.

### Dependency
A required component or library that another component needs to function.

### Distributed System
A system where components are located on different networked computers but coordinate to achieve a common goal. ROS 2 is designed for distributed robotics systems.

## E

### Execution Time
The time a system takes to complete a task. In robotics, predictable execution time is important for real-time control.

## F

### Framework
A platform for developing software applications. ROS 2 is a framework for robotics development.

## G

### Graph
A representation of the nodes and their connections in a ROS 2 system. The graph shows how nodes communicate with each other.

## H

### Hardware Abstraction Layer
Software layer that allows the same code to run on different hardware by providing a common interface.

## I

### Interface
A contract between different parts of a system that defines how they communicate with each other. In ROS 2, interfaces include messages, services, and actions.

### Inertial Properties
Physical properties of an object including mass, center of mass, and inertia tensor, used for physics simulation.

## J

### Joint
In URDF, a connection between two links that allows motion. Different joint types allow different kinds of movement (revolute, prismatic, fixed, etc.).

## L

### Launch File
An XML or Python file that starts multiple ROS 2 nodes with specific parameters and configurations.

### Link
In URDF, a rigid body that is part of the robot structure. Links have visual, collision, and inertial properties.

### Logger
A component that records events and messages for debugging and monitoring purposes.

## M

### Message
Data exchanged between nodes in ROS 2. Messages are defined in .msg files and have specific data types.

### Middleware
Software that provides common services to applications. In ROS 2, the middleware is built on DDS (Data Distribution Service).

### Module
A self-contained component of a larger system. In this book, we organize content into modules focused on specific aspects of humanoid robotics.

## N

### Node
A process that performs computation in ROS 2. Nodes are the basic units of computation and communicate with other nodes by exchanging messages.

### Node.js
A JavaScript runtime environment. Node.js is used by Docusaurus to build the documentation site.

## O

### Operating System
Software that manages computer hardware and software resources. Despite its name, ROS 2 is not an operating system but a framework that runs on top of operating systems like Linux, Windows, and macOS.

## P

### Parameter
Configurable values that nodes can use to customize their behavior. Parameters can be set at launch time or during execution.

### Publisher
A node that sends messages to a topic.

### Python Agent
A software program written in Python that performs specific tasks, such as processing sensor data or controlling robot actions.

## R

### Robot Operating System 2 (ROS 2)
A flexible framework for writing robot software. It provides libraries, tools, and conventions that simplify the development of complex, robust robot applications.

### rclpy
The Python client library for ROS 2, providing Python APIs to interact with ROS 2 systems.

### Reference Page
A documentation page that provides detailed information about a specific concept, tool, or API.

### Repository
A storage location for software code. In the context of ROS 2, repositories contain packages and documentation.

### Review Phase
A stage in content development where content is examined for quality, accuracy, and compliance with requirements.

### ROS 2 Ecosystem
The collection of tools, packages, libraries, and conventions that make up the ROS 2 development environment.

## S

### Service
A communication pattern in ROS 2 that provides a request-response interaction between nodes.

### Service Server
A node that provides a service for other nodes to call.

### Simulation
The computational modeling of a real-world process or system. In robotics, simulation is used to test algorithms and robot behavior before deployment.

### State Publisher
A ROS 2 node that publishes the state of robot joints as transforms between coordinate frames.

### Subscriber
A node that receives messages from a topic.

## T

### TF2 (Transform Library)
A library in ROS 2 that keeps track of multiple coordinate frames over time and provides transforms between them.

### Topic
A named bus over which nodes exchange messages. The communication follows a publish-subscribe model.

### Transform
A mathematical representation of the position and orientation of one coordinate frame relative to another.

## U

### URDF (Unified Robot Description Format)
An XML format used to describe robots in terms of links, joints, and other properties needed for simulation, visualization, and control.

## V

### Visualization
The process of creating visual representations of data or systems. In ROS 2, visualization tools like RViz help understand robot state and sensor data.

## W

### Workspace
A directory containing one or more ROS 2 packages that are built together.

## X

### XML
Extensible Markup Language, used for URDF files and launch files in ROS 2.

## Y

### YAML
YAML Ain't Markup Language, a human-readable data serialization format often used for configuration files in ROS 2.

## Z

### Zero-Copy
A feature of DDS that allows data to be shared between processes without copying, improving performance.