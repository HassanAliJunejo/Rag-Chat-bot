#!/usr/bin/env python3
"""
Test script for the optimized RAG Chatbot API server.

This script tests the various features of the optimized API server:
- Basic chat functionality
- Streaming responses
- Response size limits
- Timeouts
- Caching
- Error handling
- Monitoring endpoints
"""

import asyncio
import json
import time
import uuid
from datetime import datetime

import aiohttp
import requests


# Configuration
BASE_URL = "http://localhost:8000"
HEADERS = {"Content-Type": "application/json"}


def test_health_endpoint():
    """Test the health check endpoint."""
    print("\n--- Testing Health Endpoint ---")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"Health check status: {response.status_code}")
        print(f"Health check response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False


def test_stats_endpoint():
    """Test the stats endpoint."""
    print("\n--- Testing Stats Endpoint ---")
    try:
        response = requests.get(f"{BASE_URL}/api/stats")
        print(f"Stats endpoint status: {response.status_code}")
        print(f"Stats response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Stats endpoint failed: {e}")
        return False


def test_metrics_endpoint():
    """Test the metrics endpoint."""
    print("\n--- Testing Metrics Endpoint ---")
    try:
        response = requests.get(f"{BASE_URL}/api/metrics")
        print(f"Metrics endpoint status: {response.status_code}")
        print(f"Metrics response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Metrics endpoint failed: {e}")
        return False


def test_basic_chat():
    """Test basic chat functionality."""
    print("\n--- Testing Basic Chat ---")
    try:
        payload = {
            "message": "What is ROS 2?",
            "max_tokens": 100,
            "temperature": 0.3,
            "timeout_seconds": 30
        }
        
        response = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        print(f"Basic chat status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Processing time: {data.get('processing_time', 'N/A')}s")
            print(f"Truncated: {data.get('truncated', 'N/A')}")
            print(f"Response preview: {data['reply'][:100]}...")
        else:
            print(f"Error response: {response.text}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"Basic chat failed: {e}")
        return False


def test_response_size_limit():
    """Test response size limiting."""
    print("\n--- Testing Response Size Limit ---")
    try:
        payload = {
            "message": "Explain humanoid robotics in detail",
            "max_tokens": 500,
            "temperature": 0.7,
            "max_response_length": 100,  # Limit response to 100 characters
            "timeout_seconds": 30
        }
        
        response = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        print(f"Size limit test status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response length: {len(data['reply'])} characters")
            print(f"Truncated: {data.get('truncated', 'N/A')}")
            print(f"Response preview: {data['reply'][:100]}...")
        else:
            print(f"Error response: {response.text}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"Response size limit test failed: {e}")
        return False


def test_timeout():
    """Test timeout handling."""
    print("\n--- Testing Timeout Handling ---")
    try:
        # Use a very short timeout to trigger timeout error
        payload = {
            "message": "What is ROS 2?",
            "timeout_seconds": 1  # Very short timeout
        }
        
        start_time = time.time()
        response = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        actual_time = time.time() - start_time
        
        print(f"Timeout test status: {response.status_code}")
        print(f"Actual processing time: {actual_time:.2f}s")
        print(f"Expected timeout behavior: {response.status_code == 408}")
        
        if response.status_code == 408:
            print("Timeout handled correctly")
        else:
            print(f"Unexpected response: {response.text}")
        
        return response.status_code == 408
    except Exception as e:
        print(f"Timeout test failed: {e}")
        return False


def test_caching():
    """Test caching functionality."""
    print("\n--- Testing Caching ---")
    try:
        payload = {
            "message": "What is QWEN?",
            "max_tokens": 100,
            "temperature": 0.3,
            "timeout_seconds": 30
        }
        
        # Make the same request twice to test caching
        print("Making first request...")
        start_time_1 = time.time()
        response1 = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        time_1 = time.time() - start_time_1
        
        print("Making second request (should be cached)...")
        start_time_2 = time.time()
        response2 = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        time_2 = time.time() - start_time_2
        
        print(f"First request time: {time_1:.2f}s")
        print(f"Second request time: {time_2:.2f}s")
        
        # Check if the second request was faster (indicating cache hit)
        cache_effective = time_2 < time_1 * 0.5  # Second request should be significantly faster
        
        if response1.status_code == 200 and response2.status_code == 200:
            data1 = response1.json()
            data2 = response2.json()
            
            print(f"Responses are identical: {data1['reply'] == data2['reply']}")
            print(f"Cache likely effective: {cache_effective}")
        
        return response1.status_code == 200 and response2.status_code == 200
    except Exception as e:
        print(f"Caching test failed: {e}")
        return False


def test_error_handling():
    """Test error handling with invalid requests."""
    print("\n--- Testing Error Handling ---")
    try:
        # Test with empty message
        payload = {"message": ""}
        response = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        print(f"Empty message test status: {response.status_code}")
        
        # Test with no message field
        payload = {"max_tokens": 100}
        response2 = requests.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload)
        print(f"Missing message test status: {response2.status_code}")
        
        return response.status_code == 400 and response2.status_code == 400
    except Exception as e:
        print(f"Error handling test failed: {e}")
        return False


def test_clear_cache():
    """Test cache clearing endpoint."""
    print("\n--- Testing Cache Clearing ---")
    try:
        response = requests.delete(f"{BASE_URL}/api/cache/clear")
        print(f"Cache clear status: {response.status_code}")
        print(f"Cache clear response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Cache clear test failed: {e}")
        return False


async def test_streaming_response():
    """Test streaming response functionality."""
    print("\n--- Testing Streaming Response ---")
    try:
        async with aiohttp.ClientSession() as session:
            payload = {
                "message": "What is artificial intelligence?",
                "stream": True,
                "timeout_seconds": 30
            }
            
            async with session.post(f"{BASE_URL}/api/chat", headers=HEADERS, json=payload) as response:
                print(f"Streaming response status: {response.status}")
                
                if response.status == 200:
                    full_response = ""
                    async for chunk in response.content.iter_any():
                        chunk_text = chunk.decode('utf-8')
                        full_response += chunk_text
                        print(f"Received chunk: {chunk_text[:50]}...")
                    
                    print(f"Full streamed response length: {len(full_response)}")
                    return True
                else:
                    print(f"Streaming failed with status: {response.status}")
                    return False
    except Exception as e:
        print(f"Streaming test failed: {e}")
        return False


def run_all_tests():
    """Run all tests and report results."""
    print("Starting tests for optimized RAG Chatbot API server...")
    print(f"Testing server at: {BASE_URL}")
    
    tests = [
        ("Health Endpoint", test_health_endpoint),
        ("Stats Endpoint", test_stats_endpoint),
        ("Metrics Endpoint", test_metrics_endpoint),
        ("Basic Chat", test_basic_chat),
        ("Response Size Limit", test_response_size_limit),
        ("Timeout Handling", test_timeout),
        ("Caching", test_caching),
        ("Error Handling", test_error_handling),
        ("Cache Clearing", test_clear_cache),
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\nRunning: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
            print(f"Result: {'PASS' if result else 'FAIL'}")
        except Exception as e:
            print(f"Result: ERROR - {e}")
            results.append((test_name, False))
    
    # Run async test separately
    print(f"\nRunning: Streaming Response")
    try:
        result = asyncio.run(test_streaming_response())
        results.append(("Streaming Response", result))
        print(f"Result: {'PASS' if result else 'FAIL'}")
    except Exception as e:
        print(f"Result: ERROR - {e}")
        results.append(("Streaming Response", False))
    
    # Print summary
    print("\n" + "="*50)
    print("TEST SUMMARY")
    print("="*50)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "PASS" if result else "FAIL"
        print(f"{test_name:<25} {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    return passed == total


if __name__ == "__main__":
    # Check if the server is running first
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=5)
        if response.status_code == 200:
            print("Server is running. Starting tests...")
            success = run_all_tests()
            if success:
                print("\nAll tests passed! 🎉")
            else:
                print("\nSome tests failed. Check the output above for details.")
        else:
            print(f"Server is not responding. Health check returned status {response.status_code}")
            print("Please start the optimized server before running tests.")
    except requests.exceptions.ConnectionError:
        print(f"Cannot connect to server at {BASE_URL}")
        print("Please start the optimized server before running tests.")
    except requests.exceptions.Timeout:
        print(f"Server at {BASE_URL} is not responding (timeout)")
        print("Please start the optimized server before running tests.")