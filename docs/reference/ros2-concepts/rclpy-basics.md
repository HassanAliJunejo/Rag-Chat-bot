---
sidebar_position: 2
---

# rclpy Basics: Python Client Library for ROS 2

## Overview
`rclpy` is the Python client library for ROS 2, providing Python APIs to interact with ROS 2 systems. It allows Python developers to create ROS 2 nodes, publish and subscribe to topics, make service calls, and provide services.

## Installing rclpy

`rclpy` is part of the core ROS 2 installation. When you install ROS 2, rclpy is automatically included. To use it in your Python code, simply import it:

```python
import rclpy
from rclpy.node import Node
```

## Creating a Node

A node is the fundamental building block of a ROS 2 system. Here's how to create a basic node:

```python
import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__('my_node_name')
        self.get_logger().info('Node has been started')

def main(args=None):
    rclpy.init(args=args)  # Initialize ROS communications
    node = MyNode()        # Create an instance of the node
    rclpy.spin(node)       # Keep the node running
    node.destroy_node()    # Clean up before shutting down
    rclpy.shutdown()       # Shutdown ROS communications

if __name__ == '__main__':
    main()
```

## Publishers

Publishers send messages to topics. Here's how to create and use a publisher:

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

## Subscribers

Subscribers receive messages from topics:

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

## Services

Services allow for request-response communication patterns:

### Service Server
```python
from example_interfaces.srv import AddTwoInts
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

### Service Client
```python
from example_interfaces.srv import AddTwoInts
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

## Parameters

Nodes can have configurable parameters:

```python
import rclpy
from rclpy.node import Node

class ParamNode(Node):
    def __init__(self):
        super().__init__('param_node')
        
        # Declare parameters with default values
        self.declare_parameter('my_param', 'default_value')
        self.declare_parameter('threshold', 0.5)
        
        # Get parameter value
        my_param = self.get_parameter('my_param').value
        threshold = self.get_parameter('threshold').value
        
        self.get_logger().info(f'My param: {my_param}, Threshold: {threshold}')

def main(args=None):
    rclpy.init(args=args)
    node = ParamNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Timers

Timers allow you to execute functions at regular intervals:

```python
import rclpy
from rclpy.node import Node

class TimedNode(Node):
    def __init__(self):
        super().__init__('timed_node')
        
        # Create a timer that executes a callback every 0.5 seconds
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.counter = 0

    def timer_callback(self):
        self.get_logger().info(f'Timer callback executed {self.counter} times')
        self.counter += 1

def main(args=None):
    rclpy.init(args=args)
    node = TimedNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Working with Different Message Types

ROS 2 provides many standard message types. Here are examples of using some common ones:

### Geometry Messages (Twist for robot movement)
```python
from geometry_msgs.msg import Twist

def create_twist_message(linear_x, angular_z):
    msg = Twist()
    msg.linear.x = linear_x
    msg.angular.z = angular_z
    return msg
```

### Sensor Messages (LaserScan from LIDAR)
```python
from sensor_msgs.msg import LaserScan

def process_laser_scan(scan_msg):
    # scan_msg.ranges contains distance measurements
    min_distance = min(scan_msg.ranges)
    return min_distance
```

## Error Handling and Best Practices

### Error Handling
```python
def safe_publish(self, msg):
    try:
        self.publisher.publish(msg)
    except Exception as e:
        self.get_logger().error(f'Failed to publish message: {e}')
```

### Graceful Shutdown
Always properly clean up resources:
```python
def destroy_node(self):
    # Clean up any resources here
    super().destroy_node()
```

## Common Patterns

### Publisher with QoS settings
```python
from rclpy.qos import QoSProfile

# Create a custom QoS profile
qos_profile = QoSProfile(depth=10)

publisher = self.create_publisher(String, 'topic', qos_profile)
```

### Node with custom logging
```python
def __init__(self):
    super().__init__('my_node')
    
    # Create a custom logger
    self.get_logger().set_level(rclpy.logging.LoggingSeverity.INFO)
```

## Summary

This reference covers the fundamental aspects of using rclpy to interact with ROS 2 systems:

- Creating ROS 2 nodes in Python
- Publishing and subscribing to topics
- Creating and using services
- Working with parameters
- Using timers for periodic tasks
- Best practices and error handling

With this foundation, you can develop Python nodes that integrate seamlessly with ROS 2-based robotic systems.