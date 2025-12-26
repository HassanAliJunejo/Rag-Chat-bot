---
sidebar_position: 3
---

# Chapter 3: Humanoid Structure with URDF

## Learning Objectives
- Understand what URDF is and why it matters for humanoid robots
- Describe the relationship between links, joints, and coordinate frames
- Explain how to model a basic humanoid robot structure
- Understand how URDF connects ROS 2, simulation, and control systems

## Introduction

In the previous chapters, we explored ROS 2 as the communication middleware that acts as a robotic nervous system and learned how to connect Python AI agents to this system. Now, we'll examine the structural aspect of humanoid robots using URDF (Unified Robot Description Format).

URDF is an XML-based format that describes the physical structure of a robot, including its links (rigid bodies), joints (connections), and other properties. For humanoid robots, which have complex kinematic structures, URDF is essential for simulation, visualization, and control. It defines the robot's physical properties, which enables ROS 2 tools to understand and interact with the robot correctly.

## What is URDF and Why It Matters for Humanoids

### Definition of URDF

URDF stands for Unified Robot Description Format. It's an XML-based file format that describes a robot in terms of:

- **Links**: Rigid bodies that make up the robot (e.g., torso, head, arms, legs, feet)
- **Joints**: Connections between links that allow motion (e.g., hinges, prismatic joints)
- **Properties**: Physical characteristics like inertial properties, visual appearance, and collision properties

### Why URDF is Critical for Humanoid Robots

Humanoid robots are especially complex because they have many degrees of freedom (DOF) and multiple limbs. URDF is essential for humanoid robots because:

1. **Kinematic Chain Representation**: Humanoid robots have complex kinematic chains (e.g., arm: torso → shoulder → upper arm → elbow → lower arm → wrist → hand)
2. **Multiple Degrees of Freedom**: Humanoids typically have 20+ joints that need to be coordinated
3. **Simulation**: URDF enables accurate physics simulation of the robot's movement
4. **Visualization**: URDF allows tools like RViz to display the robot in 3D
5. **Control**: Controllers use URDF to understand the robot's structure when computing movements

### URDF in the ROS 2 Ecosystem

URDF integrates with multiple ROS 2 tools:

- **Robot State Publisher**: Publishes the robot's joint states as transforms
- **TF2**: Provides coordinate frame transformations based on URDF
- **Gazebo/other simulators**: Simulate the robot based on URDF
- **MoveIt**: Uses URDF for motion planning
- **RViz**: Visualizes the robot based on URDF

## Links, Joints, and Coordinate Frames

### Links

Links represent the rigid bodies of a robot. Each link has:

- **Inertial properties**: Mass, center of mass, and inertia tensor
- **Collision properties**: Shape definition for collision detection
- **Visual properties**: How the link appears in visualization tools

Here's an example of a simple link definition in URDF:

```xml
<link name="base_link">
  <inertial>
    <mass value="1.0"/>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01"/>
  </inertial>
  <visual>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <geometry>
      <cylinder length="0.1" radius="0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1"/>
    </material>
  </visual>
  <collision>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <geometry>
      <cylinder length="0.1" radius="0.2"/>
    </geometry>
  </collision>
</link>
```

### Joints

Joints connect links and define how they can move relative to each other. Common joint types:

- **Revolute**: Rotational joint with limited range (like an elbow)
- **Continuous**: Rotational joint with unlimited range (like a wheel)
- **Prismatic**: Linear sliding joint (like a telescoping arm)
- **Fixed**: No movement (connects links rigidly)
- **Floating**: 6 degrees of freedom (for mobile bases)
- **Planar**: Movement on a plane

Example joint definition:

```xml
<joint name="shoulder_joint" type="revolute">
  <parent link="torso"/>
  <child link="upper_arm"/>
  <origin xyz="0 0.1 0.3" rpy="0 0 0"/>
  <axis xyz="0 1 0"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="3.0"/>
</joint>
```

### Coordinate Frames

URDF defines a tree structure of coordinate frames, where each link has its own coordinate frame. The frames are connected through joints and enable:

- **TF2 transformations**: Allowing any frame to be transformed to any other frame
- **Sensor referencing**: Understanding where sensors are located on the robot
- **Control coordination**: Coordinating movements across multiple joints

The base frame (usually `base_link`) serves as the root of the coordinate system tree.

## Modeling a Basic Humanoid Robot Structure

Let's look at how to model a simplified humanoid robot using URDF. A basic humanoid typically has:

- A torso with a head
- Two arms (each with shoulder, elbow, and wrist)
- Two legs (each with hip, knee, and ankle)
- Optionally hands with fingers

### Skeleton Structure Example

Here's a simplified URDF for a basic humanoid skeleton:

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Base link -->
  <link name="base_link">
    <inertial>
      <mass value="10.0"/>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <geometry>
        <box size="0.2 0.2 1.0"/>
      </geometry>
      <material name="grey">
        <color rgba="0.5 0.5 0.5 1.0"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <geometry>
        <box size="0.2 0.2 1.0"/>
      </geometry>
    </collision>
  </link>

  <!-- Torso -->
  <link name="torso">
    <inertial>
      <mass value="5.0"/>
      <origin xyz="0 0 0.3" rpy="0 0 0"/>
      <inertia ixx="0.5" ixy="0.0" ixz="0.0" iyy="0.5" iyz="0.0" izz="0.5"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0.3" rpy="0 0 0"/>
      <geometry>
        <box size="0.3 0.2 0.6"/>
      </geometry>
      <material name="red">
        <color rgba="1.0 0.0 0.0 1.0"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.3" rpy="0 0 0"/>
      <geometry>
        <box size="0.3 0.2 0.6"/>
      </geometry>
    </collision>
  </link>

  <!-- Joint between base and torso -->
  <joint name="base_to_torso" type="fixed">
    <parent link="base_link"/>
    <child link="torso"/>
    <origin xyz="0 0 1.0" rpy="0 0 0"/>
  </joint>

  <!-- Head -->
  <link name="head">
    <inertial>
      <mass value="2.0"/>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <sphere radius="0.15"/>
      </geometry>
      <material name="white">
        <color rgba="1.0 1.0 1.0 1.0"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <sphere radius="0.15"/>
      </geometry>
    </collision>
  </link>

  <!-- Joint between torso and head -->
  <joint name="neck_joint" type="revolute">
    <parent link="torso"/>
    <child link="head"/>
    <origin xyz="0 0 0.6" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-0.5" upper="0.5" effort="10" velocity="2"/>
  </joint>

  <!-- Left arm (simplified) -->
  <link name="left_upper_arm">
    <inertial>
      <mass value="1.0"/>
      <origin xyz="0 0 -0.15" rpy="0 0 0"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.05"/>
    </inertial>
    <visual>
      <origin xyz="0 0 -0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder length="0.3" radius="0.05"/>
      </geometry>
      <material name="blue">
        <color rgba="0.0 0.0 1.0 1.0"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 -0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder length="0.3" radius="0.05"/>
      </geometry>
    </collision>
  </link>

  <joint name="left_shoulder_joint" type="revolute">
    <parent link="torso"/>
    <child link="left_upper_arm"/>
    <origin xyz="0.2 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="20" velocity="2"/>
  </joint>

  <!-- Additional joints and links for complete humanoid would continue similarly... -->
</robot>
```

### Key Considerations for Humanoid URDF

1. **Kinematic Chains**: Humanoids have multiple kinematic chains (arms, legs). Each chain should be properly connected from base to tip.
2. **Joint Limits**: Realistic joint limits are important for simulation and control.
3. **Inertial Properties**: Accurate inertial properties are crucial for physics simulation.
4. **Gearing and Transmission**: Real robots often have transmissions that should be modeled.
5. **Sensors**: Sensor frames should be properly defined in the URDF.

## How URDF Connects ROS 2, Simulation, and Control

### URDF in the ROS 2 Toolchain

URDF serves as a common format that connects different parts of the ROS 2 ecosystem:

#### Robot State Publisher

The robot_state_publisher node takes joint states and the URDF to publish TF transforms:

```python
# Example of how robot_state_publisher uses URDF
# It takes joint state messages and uses URDF to calculate transforms between links
```

#### TF2 (Transform Library)

TF2 uses the URDF to understand how coordinate frames relate to each other:

```python
import rclpy
from tf2_ros import TransformListener

# TF2 allows you to get transforms between any two frames defined in URDF
# For example, converting a point from "left_hand" frame to "base_link" frame
```

### URDF in Simulation

Simulation environments like Gazebo use URDF to:

- **Physics Simulation**: Calculate collisions and dynamics based on inertial properties
- **Visual Simulation**: Render the robot based on visual properties
- **Sensor Simulation**: Simulate sensors mounted on the robot

### URDF in Control Systems

Control systems use URDF for:

- **Forward Kinematics**: Calculating end-effector positions from joint angles
- **Inverse Kinematics**: Calculating joint angles needed to reach desired positions
- **Dynamics Computation**: Calculating required torques for movements
- **Motion Planning**: Planning collision-free paths through space

### URDF Best Practices

1. **Start Simple**: Begin with a basic skeleton and add complexity gradually
2. **Verify with Visualization**: Use RViz to visualize your URDF and check for errors
3. **Realistic Inertial Properties**: Use CAD tools to compute accurate inertial properties
4. **Check Joint Limits**: Ensure joint limits match your physical robot
5. **Use Standard Frames**: Follow ROS conventions for frame naming (e.g., `base_link`, `odom`, `map`)

## Working with URDF Files

### Loading URDF in ROS 2

URDF files are typically loaded using launch files:

```xml
<!-- In a launch file -->
<node name="robot_state_publisher" pkg="robot_state_publisher" exec="robot_state_publisher">
  <param name="robot_description" value="$(find-pkg-share my_robot_description)/urdf/my_robot.urdf"/>
</node>
```

### Validating URDF

You can check the validity of your URDF using the check_urdf command:

```bash
# Check if URDF is valid
check_urdf my_robot.urdf

# This will show you the tree structure and any errors
```

### Visualizing URDF

Use RViz to visualize your robot:

```bash
# Launch RViz and add RobotModel display to see your URDF
rviz2
```

## Summary

In this chapter, we've explored URDF (Unified Robot Description Format) and its critical role in humanoid robotics:

- We learned what URDF is and why it's essential for humanoid robots with their complex structures
- We examined the relationship between links (rigid bodies), joints (connections), and coordinate frames
- We looked at how to model a basic humanoid robot structure with proper kinematic chains
- We explored how URDF connects ROS 2, simulation, and control systems

URDF provides the structural foundation that enables ROS 2 tools to understand and work with your robot's physical properties. With this knowledge, you can now create complete robotic systems that integrate communication (ROS 2), intelligence (Python AI agents), and structure (URDF) effectively.

## Further Reading
- [ROS URDF Documentation](https://wiki.ros.org/urdf)
- [URDF Tutorials](https://wiki.ros.org/urdf/Tutorials)
- [xacro: XML Macros for URDF](https://wiki.ros.org/xacro)

## Next Steps

This concludes Module 1 of the Physical AI & Humanoid Robotics Book. You now understand the fundamental components of ROS 2-based humanoid robots:
1. The communication middleware (ROS 2 as the nervous system)
2. How to connect AI agents (Python and rclpy)
3. The physical structure (URDF)

Continue to Module 2 to learn about perception and control systems for humanoid robots.