---
sidebar_position: 1
---

# ROS 2 Communication Concepts: Nodes, Topics, Services

## Overview
This reference page provides detailed information about the core communication concepts in ROS 2: nodes, topics, and services. These concepts form the foundation of the ROS 2 communication model and understanding them is essential for working with humanoid robots.

## Nodes

A node is a process that performs computation. In ROS 2, nodes are the basic units of computation. Each node typically performs a specific function, such as controlling a sensor, processing data, or commanding actuators.

### Key Characteristics
- Nodes are designed to be modular, meaning they can be developed, tested, and maintained independently
- Multiple nodes can run simultaneously on one or more devices
- Nodes communicate with other nodes by exchanging messages
- Each node is intended to perform a specific, modular function
- Nodes can be written in different programming languages (C++, Python, etc.) and still communicate seamlessly

### Common Node Examples in Humanoid Robotics
- Camera processing nodes
- Joint control nodes
- Path planning nodes
- Collision detection nodes
- Voice recognition nodes
- Sensor fusion nodes

## Topics

Topics are named buses over which nodes exchange messages. The communication is based on a publish-subscribe model:

- Publishers send data to a topic
- Subscribers receive data from a topic
- Multiple nodes can publish and/or subscribe to the same topic
- Communication is asynchronous and unidirectional

### Key Characteristics
- Topics follow a publish-subscribe communication pattern
- Communication is asynchronous
- Multiple publishers and subscribers can exist for a single topic
- Topics are identified by string names (e.g., "/camera/image_raw", "/cmd_vel")

### Common Topic Examples in Humanoid Robotics
- `/joint_states` - Current positions of robot joints
- `/tf` - Transformations between coordinate frames
- `/camera/image_raw` - Raw image data from a camera
- `/scan` - LIDAR scan data
- `/imu/data` - Inertial measurement unit data

## Services

Services provide a request-response communication pattern. A client node sends a request to a service, and the service returns a response. This is synchronous communication.

### Key Characteristics
- Services follow a request-response communication pattern
- Communication is synchronous
- There is typically one service server, but multiple clients can make requests
- Services are identified by string names
- Services are appropriate for tasks that have a clear request-response pattern

### Common Service Examples in Humanoid Robotics
- `/set_parameters` - Set configuration parameters
- `/get_map` - Retrieve a map from a mapping node
- `/move_base/make_plan` - Request a path plan
- `/gazebo/reset_simulation` - Reset a simulation

### When to Use Services vs Topics

Use services when:
- You need a direct request-response interaction
- The operation is typically completed quickly
- You need to ensure that a request has been processed before proceeding
- You need to return data that is computed on-demand

Use topics when:
- You need continuous data flow
- You have multiple publishers or subscribers to the same data
- It's acceptable for data to be occasionally missed (asynchronous)
- You need to broadcast information to multiple nodes simultaneously

## Summary

Nodes, topics, and services form the core communication model of ROS 2. Understanding these concepts is essential for building humanoid robots:

- **Nodes** provide the modular architecture
- **Topics** enable asynchronous data sharing
- **Services** enable synchronous request-response interactions

These three concepts work together to create the "nervous system" that allows different components of a humanoid robot to communicate and coordinate effectively.