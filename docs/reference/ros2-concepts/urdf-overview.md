---
sidebar_position: 3
---

# URDF Overview: Unified Robot Description Format

## Introduction

URDF (Unified Robot Description Format) is an XML-based format used to describe robots in ROS. It defines a robot's physical structure in terms of links (rigid bodies), joints (connections that allow motion), and other properties like inertial parameters, visual appearance, and collision properties.

URDF is essential for humanoid robotics because it provides a complete description of the robot's physical structure, which enables simulation, visualization, and control.

## Components of URDF

### Links

Links represent the rigid bodies of a robot. Each link has three main components:

1. **Inertial**: Physical properties for simulation
2. **Visual**: How the link appears in visualization tools
3. **Collision**: Shape definition for collision detection

```xml
<link name="my_link">
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

#### Inertial Properties

The inertial properties define the physical characteristics needed for dynamics simulation:

- **Mass**: The mass of the link
- **Origin**: The center of mass relative to the link frame
- **Inertia**: The inertia matrix defining how the mass is distributed

#### Visual Properties

The visual properties define how the link appears in visualization tools like RViz:

- **Origin**: Position and orientation of the visual geometry relative to the link frame
- **Geometry**: Shape definition (box, cylinder, sphere, mesh)
- **Material**: Color and appearance properties

#### Collision Properties

The collision properties define shapes for collision detection:

- **Origin**: Position and orientation relative to the link frame
- **Geometry**: Shape for collision detection (usually simplified compared to visual geometry)

### Joints

Joints connect links and define how they can move relative to each other. Each joint has:

- **Type**: The kind of motion allowed
- **Parent/Child**: Which links are connected
- **Origin**: Relative position and orientation of the joint
- **Axis**: Direction of motion (for revolute/prismatic joints)
- **Limits**: Range of motion and physical constraints

#### Joint Types

There are several types of joints available in URDF:

- **Fixed**: No movement allowed (rigid connection)
- **Revolute**: Rotational movement with limited range
- **Continuous**: Rotational movement with unlimited range
- **Prismatic**: Linear sliding movement with limited range
- **Planar**: Movement on a plane
- **Floating**: 6 degrees of freedom (no constraints)

```xml
<joint name="my_joint" type="revolute">
  <parent link="parent_link"/>
  <child link="child_link"/>
  <origin xyz="0 0 1" rpy="0 0 0"/>
  <axis xyz="0 1 0"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="3.0"/>
</joint>
```

### Transmissions

Transmissions define the connection between simulated joints and actuators/controllers. This is important for simulation and control:

```xml
<transmission name="my_transmission">
  <type>transmission_interface/SimpleTransmission</type>
  <joint name="my_joint">
    <hardwareInterface>hardware_interface/PositionJointInterface</hardwareInterface>
  </joint>
  <actuator name="my_actuator">
    <hardwareInterface>hardware_interface/PositionJointInterface</hardwareInterface>
    <mechanicalReduction>1</mechanicalReduction>
  </actuator>
</transmission>
```

## Complete URDF Example

Here's a more comprehensive example showing multiple links and joints:

```xml
<?xml version="1.0"?>
<robot name="example_robot">
  <!-- Base link -->
  <link name="base_link">
    <inertial>
      <mass value="1.0"/>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
    </collision>
  </link>

  <!-- Child link connected via a revolute joint -->
  <link name="child_link">
    <inertial>
      <mass value="0.5"/>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <inertia ixx="0.005" ixy="0.0" ixz="0.0" iyy="0.005" iyz="0.0" izz="0.005"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.1" length="0.5"/>
      </geometry>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.1" length="0.5"/>
      </geometry>
    </collision>
  </link>

  <!-- Joint connecting the links -->
  <joint name="base_to_child" type="revolute">
    <parent link="base_link"/>
    <child link="child_link"/>
    <origin xyz="0.3 0 0" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="10" velocity="1"/>
  </joint>
</robot>
```

## URDF Tools and Best Practices

### Tools for Working with URDF

- **check_urdf**: Validates URDF syntax and displays the kinematic tree
  ```
  check_urdf my_robot.urdf
  ```

- **urdf_to_graphiz**: Creates a visual graph of the URDF structure
  ```
  urdf_to_graphiz my_robot.urdf
  ```

### Common Best Practices

1. **Realistic Inertial Properties**: Use CAD tools to calculate accurate inertial properties
2. **Consistent Units**: Use SI units throughout the URDF
3. **Proper Joint Limits**: Set realistic joint limits that match your physical robot
4. **Simplified Collision Models**: Use simpler shapes for collision detection than for visualization
5. **Consistent Frame Naming**: Follow ROS conventions for frame names

## Integration with ROS 2 Ecosystem

### Robot State Publisher

The robot_state_publisher node uses URDF to publish transforms based on joint states:

```xml
<node name="robot_state_publisher" pkg="robot_state_publisher" exec="robot_state_publisher">
  <param name="robot_description" value="$(find-pkg-share my_robot_description)/urdf/my_robot.urdf"/>
</node>
```

### TF2

TF2 uses the URDF structure to understand how coordinate frames relate to each other, enabling transformations between any two frames.

### Simulation

Simulation environments like Gazebo use URDF to create physics-accurate models of your robot for testing and development.

## Summary

URDF is a critical component of the ROS 2 ecosystem, especially for humanoid robotics where complex kinematic structures must be accurately represented. Understanding URDF allows you to:

- Create accurate robot models for simulation
- Enable proper visualization in RViz
- Support motion planning and control algorithms
- Integrate your robot with the broader ROS 2 toolchain

With this foundation, you can create detailed models of humanoid robots that properly integrate with ROS 2's communication, control, and simulation systems.