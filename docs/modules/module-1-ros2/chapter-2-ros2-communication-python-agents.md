---
sidebar_position: 2
---

# Chapter 2: ROS 2 Communication & Python Agents

## Learning Objectives
- Explain ROS 2 nodes, publishers, and subscribers in practice
- Understand when to use services vs topics
- Use `rclpy` to connect Python AI agents to robot controllers
- Describe message flow between perception, planning, and actuation

## Introduction

In Chapter 1, we introduced ROS 2 as the middleware that functions as a robotic nervous system. Now, we'll explore how to implement this system in practice, with a focus on connecting Python-based AI agents to the ROS 2 communication framework.

Python is one of the most popular languages in AI and robotics, and ROS 2 provides excellent Python support through `rclpy` - the Python client library for ROS 2. This chapter bridges the conceptual understanding from Chapter 1 with practical implementation skills.

## ROS 2 Nodes, Publishers, and Subscribers in Practice

In this section, we'll work with actual ROS 2 nodes and see how publishers and subscribers operate in practice using Python.

### Creating a ROS 2 Node with Python

Every ROS 2 program starts by creating a node. Here's a basic example of how to create a node in Python:

```python
import rclpy
from rclpy.node import Node

class BasicNode(Node):
    def __init__(self):
        super().__init__('basic_node')
        self.get_logger().info('Basic node started')

def main(args=None):
    rclpy.init(args=args)
    node = BasicNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This code creates a minimal ROS 2 node named "basic_node". The `rclpy.init()` function initializes the ROS 2 client library, and `rclpy.spin()` keeps the node running and responsive to messages.

### Publishers

Publishers send messages to topics. Here's how to create a publisher in a node:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    talker = Talker()
    rclpy.spin(talker)
    talker.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This publisher sends "Hello World" messages to the "topic" every 0.5 seconds. The publisher is created using `self.create_publisher()` with the message type (`String`), topic name (`'topic'`), and a queue size (10).

### Subscribers

Subscribers receive messages from topics. Here's how to create a subscriber in a node:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    listener = Listener()
    rclpy.spin(listener)
    listener.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This subscriber listens to the "topic", and whenever a message is received, the `listener_callback` function is called with the received message.

## Services vs Topics: When to Use Each

In Chapter 1, we discussed that topics use a publish-subscribe pattern, while services use a request-response pattern. Now let's look at practical considerations for choosing between them.

### Use Topics When:

1. **Continuous Data Flow**: When you need to continuously send data between nodes (e.g., camera images, sensor readings)
2. **Broadcasting**: When multiple nodes need to receive the same information simultaneously
3. **Asynchronous Communication**: When it's acceptable for messages to be occasionally missed
4. **State Publishing**: When you want to share the current state of something (e.g., robot position, sensor values)

### Use Services When:

1. **Request-Response Pattern**: When you need to request specific information or task and receive a response
2. **Synchronous Operation**: When you need to ensure a request has been processed before proceeding
3. **Task Execution**: When you want to execute a specific task and get results back
4. **Configuration**: When setting or retrieving configuration parameters

### Example: Services in Practice

Here's how to create a service server in Python:

```python
from add_two_ints_srv.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request\na: {request.a}, b: {request.b}')
        return response

def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    minimal_service.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

And here's how to call that service from a client:

```python
from add_two_ints_srv.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class MinimalClient(Node):
    def __init__(self):
        super().__init__('minimal_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClient()
    response = minimal_client.send_request(1, 2)
    minimal_client.get_logger().info(f'Result of add_two_ints: {response.sum}')
    minimal_client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Using rclpy to Connect Python AI Agents to Robot Controllers

Now we'll look at how to use Python AI agents with ROS 2. In this context, an "AI agent" refers to any Python program that processes information and makes decisions.

### AI Agent as a ROS 2 Node

An AI agent can be implemented as a ROS 2 node that subscribes to sensor data, processes it using AI algorithms, and publishes commands to robot controllers:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from geometry_msgs.msg import Twist

class AIAgent(Node):
    def __init__(self):
        super().__init__('ai_agent')
        
        # Subscribe to sensor data
        self.image_subscriber = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.image_callback,
            10)
        
        # Publisher for robot commands
        self.cmd_publisher = self.create_publisher(
            Twist,
            '/cmd_vel',
            10)
        
        # Timer for AI processing loop
        self.timer = self.create_timer(0.1, self.ai_processing_loop)
        
        self.latest_image = None
    
    def image_callback(self, msg):
        # Store the latest image for AI processing
        self.latest_image = msg
    
    def ai_processing_loop(self):
        if self.latest_image is not None:
            # Process the image using your AI algorithm
            # This is a placeholder for actual AI processing
            processed_result = self.run_ai_algorithm(self.latest_image)
            
            # Create and publish a robot command based on AI output
            cmd_msg = Twist()
            cmd_msg.linear.x = processed_result.linear_speed
            cmd_msg.angular.z = processed_result.angular_speed
            self.cmd_publisher.publish(cmd_msg)
    
    def run_ai_algorithm(self, image_msg):
        # Placeholder for actual AI algorithm implementation
        # This would typically involve neural networks, computer vision, etc.
        class Result:
            linear_speed = 0.5
            angular_speed = 0.0
        return Result()

def main(args=None):
    rclpy.init(args=args)
    ai_agent = AIAgent()
    rclpy.spin(ai_agent)
    ai_agent.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This example shows an AI agent that subscribes to camera images, processes them using an AI algorithm, and publishes velocity commands to control a robot's movement.

## Message Flow Between Perception, Planning, and Actuation

In a complete robotic system, information flows between three main components:

### Perception Layer
- Sensors (cameras, LIDAR, IMU, etc.) publish sensor data to topics
- Perception nodes subscribe to sensor data and process it
- Examples: object detection, mapping, localization

### Planning Layer
- Planner nodes subscribe to perception outputs
- Planner nodes make decisions about what to do
- Examples: path planning, motion planning, task planning

### Actuation Layer
- Controller nodes receive planning commands
- Controller nodes send commands to actuators
- Examples: motor controllers, servo controllers

Here's an example of this flow in a navigation scenario:

```
Camera -> Image Processing Node -> Object Detection -> Path Planner -> Velocity Controller -> Wheels
         (perception)              (perception)       (planning)      (actuation)
```

1. Camera publishes images to `/camera/image_raw`
2. Perception node subscribes to images and detects obstacles, publishing them to `/obstacles`
3. Planning node subscribes to obstacles and current position, computing a safe path to publish to `/path`
4. Control node subscribes to path and robot state, publishing velocity commands to `/cmd_vel`
5. Robot hardware executes the velocity commands

## Code Examples for Python AI Agents

### Practical Example: Simple Object-Following Agent

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from geometry_msgs.msg import Twist
from cv_bridge import CvBridge
import cv2
import numpy as np

class ObjectFollowerAgent(Node):
    def __init__(self):
        super().__init__('object_follower_agent')
        
        # Create OpenCV bridge for converting ROS images to OpenCV format
        self.bridge = CvBridge()
        
        # Subscribe to camera images
        self.image_sub = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.image_callback,
            10)
        
        # Publisher for movement commands
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        
        # Timer to process images at regular intervals
        self.timer = self.create_timer(0.1, self.process_image)
        
        self.current_image = None

    def image_callback(self, msg):
        # Convert ROS image message to OpenCV image
        try:
            cv_image = self.bridge.imgmsg_to_cv2(msg, "bgr8")
            self.current_image = cv_image
        except Exception as e:
            self.get_logger().error(f'Could not convert image: {e}')

    def process_image(self):
        if self.current_image is not None:
            # Simple color-based object detection (red object)
            hsv = cv2.cvtColor(self.current_image, cv2.COLOR_BGR2HSV)
            
            # Define range for red color
            lower_red = np.array([0, 50, 50])
            upper_red = np.array([10, 255, 255])
            mask1 = cv2.inRange(hsv, lower_red, upper_red)
            
            lower_red = np.array([170, 50, 50])
            upper_red = np.array([180, 255, 255])
            mask2 = cv2.inRange(hsv, lower_red, upper_red)
            
            mask = mask1 + mask2
            
            # Find contours of red objects
            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            if contours:
                # Find the largest contour
                largest_contour = max(contours, key=cv2.contourArea)
                
                # Find the center of the contour
                M = cv2.moments(largest_contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    
                    # Send movement commands based on object position
                    cmd_msg = Twist()
                    
                    # Calculate horizontal position relative to center of image
                    image_width = self.current_image.shape[1]
                    horizontal_error = cx - image_width / 2
                    
                    # Proportional control for turning
                    cmd_msg.angular.z = -horizontal_error * 0.005
                    cmd_msg.linear.x = 0.2  # Move forward
                    
                    self.cmd_pub.publish(cmd_msg)
                else:
                    # No object detected, stop robot
                    cmd_msg = Twist()
                    self.cmd_pub.publish(cmd_msg)
            else:
                # No object detected, stop robot
                cmd_msg = Twist()
                self.cmd_pub.publish(cmd_msg)

def main(args=None):
    rclpy.init(args=args)
    agent = ObjectFollowerAgent()
    rclpy.spin(agent)
    agent.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Summary

In this chapter, we've explored how to connect Python AI agents to the ROS 2 communication system:

- We learned how to create ROS 2 nodes using Python's `rclpy`
- We examined the differences between topics and services and when to use each
- We implemented practical examples of publishers, subscribers, and services
- We demonstrated how AI agents can be structured as ROS 2 nodes that integrate perception, planning, and actuation
- We created a complete example of an object-following AI agent

This knowledge positions you to understand how to structure complete robotic systems with ROS 2 as the communication backbone.

## Further Reading
- [ROS 2 Python Client Library (rclpy) Documentation](https://docs.ros.org/en/rolling/p/rclpy/)
- [ROS 2 Tutorials for Python](https://docs.ros.org/en/rolling/Tutorials.html)
- [Python AI Libraries Compatible with ROS 2](https://discourse.ros.org/)

## Next Steps

Continue to [Chapter 3: Humanoid Structure with URDF](./chapter-3-urdf-humanoid-structure.md) to learn how to model humanoid robot structure using URDF.