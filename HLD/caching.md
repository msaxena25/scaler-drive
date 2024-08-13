# What is Caching?

Caching is a technique used to store a copy of frequently accessed data in a temporary storage location, known as a cache, so that future requests for that data can be served faster. The goal of caching is to reduce the time and resources needed to retrieve data, thereby improving performance and efficiency.

# Caching in Load Balancer

Caching in a load balancer refers to the practice of storing frequently accessed data or content temporarily in the load balancer itself to reduce the need to repeatedly fetch it from backend servers. This helps improve performance, reduce latency, and lighten the load on backend servers. 

# CDN & its benefits

A Content Delivery Network (CDN) is a system of distributed servers strategically located across various geographic regions. The primary purpose of a CDN is to deliver web content and other digital assets to users more efficiently by serving them from a server that is geographically closer to the user, reducing latency and load times.

Here are the benefits of using a Content Delivery Network (CDN):

1. **Reduced Latency**: 
   - Delivers content from a server closest to the user, minimizing the time it takes for data to travel and resulting in faster page load times.

2. **Improved Website Performance**:
   - Offloads traffic from the origin server to edge servers, reducing server load and enhancing overall website performance, especially during peak traffic.

3. **Scalability**:
   - Helps handle large volumes of traffic more efficiently by distributing the load across multiple servers, ensuring that the website can scale during high-demand periods.

4. **Reliability and Redundancy**:
   - Provides fault tolerance with multiple servers. If one server fails, another server can take over, ensuring continuous availability of content.

5. **Global Reach**:
   - Ensures fast content delivery to users around the world, providing a consistent and high-quality experience regardless of their geographic location.

6. **Enhanced Security**:
   - Offers built-in security features such as DDoS protection, SSL/TLS encryption, and Web Application Firewall (WAF), helping to safeguard websites from various cyber threats.

7. **Reduced Bandwidth Costs**:
   - Caches content closer to users, reducing the amount of data that needs to be sent from the origin server, which can lower bandwidth consumption and costs.

8. **Improved SEO**:
   - Faster loading times and better performance can positively impact search engine rankings, contributing to improved visibility and SEO performance.

9. **Optimized Content Delivery**:
   - Supports the delivery of various types of content, including videos, images, and dynamic content, with optimizations that reduce buffering and enhance user experience.

10. **Customizable Caching**:
    - Allows fine-tuning of caching strategies, such as setting Time to Live (TTL) values, to balance freshness and performance based on specific needs.

# Types

1. In Browser Caching
2. Local Caching
3. Global Caching

## IN Browser Caching

Browser caches DNS and static information like images, videos, and JavaScript files. This is why a website takes time to load for the first time but loads quickly because the browser caches the information.

## Local Caching

It is caching done on the application server so that we don't have to hit the database repeatedly
to access data.

## Global Caching

This is also termed In-memory caching. In practice, systems like Redis and Memcache help to
fetch actual or derived kinds of data quickly.
The main scenarios where global caching is used are:
1. Caching something that is queried often.
2. Storing derived information, which might be expensive to compute on DB.

# Stale data

Stale data refers to old or outdated data that remains in a cache after the data has been modified elsewhere in the system. If a cache returns stale data to a client or application, it can cause errors or unexpected behavior.

# Problems related to caching

- Cache is limited in size
- It is not the actual source of truth; that is, the actual data is somewhere else. It stores a
replica of data.

There are a few problems that you may face:
- Data can become stale and inconsistent with time (Data in Database - actual source of
truth - changes. But is not reflected in cache)
- The cache can become full due to its small storage capacity

# Cache Invalidation Strategy

## TTL  - Time to Live

Entries in the cache will be valid for only a period. And after that, to again get the entries, you need to fetch them again.

## Keeping cache and DB in sync

This can be done by the strategies like Write through cache, Write back cache, or Write around
the cache.

Write through Cache -  First write into cache (there can be multiple cache machines) and then updating it to the database and returning success. If failed, changes will be reverted in the cache.
 
 Write back cache - First, the write is written in the cache. The moment write in the cache
succeeds, you return success to the client. Data is then synced to the database asynchronously
(without blocking current ongoing request). 
Good side is low latency. This method is preferred where you don't care about the data loss immediately. Example analytics systems when we can generate data again in case of any loss.

Write around cache: Here, the writes are done directly in the database, and the cache might
be out of sync with the database. Hence we can use TTL or any similar mechanism to fetch the
data from the database to cache to sync with it.


# cache coherence issues

Cache coherence issues in a distributed system arise when multiple copies of the same data are stored in different caches across the system. These issues occur when the data in one cache is updated but the corresponding data in other caches is not, leading to inconsistencies and potentially incorrect results when data is accessed.
Various protocols and strategies, like MESI (Modified, Exclusive, Shared, Invalid) Protocol, directory-based coherence, and snooping protocols, are used to manage and maintain cache coherence.


# Redis

In the context of distributed systems, **Redis** is an open-source, in-memory data store that is widely used for caching, message brokering, and as a database. It plays a crucial role in distributed systems by providing fast access to data, supporting high availability, and enabling horizontal scaling. Here's how Redis fits into a distributed system:

### Key Roles of Redis in Distributed Systems:

1. **Caching:**
   - **High-Speed Data Access:** Redis is often used as a cache to store frequently accessed data, reducing the load on databases and speeding up response times. By keeping hot data in memory, Redis allows distributed systems to handle large volumes of read requests quickly.
   - **Example:** In a web application, Redis might cache user session data or the results of expensive database queries, so subsequent requests can be served faster.

2. **Data Storage:**
   - **In-Memory Database:** Redis can be used as a primary data store for applications that require fast read and write operations. It supports various data structures like strings, lists, sets, hashes, and more, making it flexible for different use cases.
   - **Persistence Options:** Redis offers persistence through snapshotting (RDB) and logging (AOF), allowing data to be recovered after a crash, even though it is primarily an in-memory database.

3. **Distributed Data Storage:**
   - **Redis Cluster:** Redis can be deployed in a clustered mode, where data is automatically partitioned across multiple nodes. This setup allows Redis to scale horizontally, handling large datasets and high throughput by distributing the load across multiple servers.
   - **Data Partitioning:** Redis Cluster uses a technique called hash slot partitioning, where keys are mapped to specific nodes based on a hash function. This enables the system to distribute data evenly across nodes while still maintaining fast access times.

4. **High Availability:**
   - **Redis Sentinel:** Redis Sentinel is a system designed to manage Redis instances in a distributed environment, providing high availability. It monitors Redis instances, detects failures, and automatically promotes a slave node to master if the master node goes down.
   - **Replication:** Redis supports master-slave replication, where data from a master node is copied to one or more slave nodes. This setup ensures that read operations can continue even if the master fails, and it provides redundancy for data availability.

5. **Message Brokering (Pub/Sub):**
   - **Publish/Subscribe Messaging:** Redis includes a lightweight publish/subscribe (pub/sub) messaging system, where clients can publish messages to channels and other clients can subscribe to those channels to receive the messages. This is useful for real-time messaging and event-driven architectures in distributed systems.
   - **Example:** In a microservices architecture, Redis pub/sub can be used to broadcast events like updates to shared data or system status changes to multiple services simultaneously.

6. **Distributed Locking:**
   - **Concurrency Control:** Redis can be used to implement distributed locks, ensuring that only one process can access a critical section of code at a time in a distributed system. This is essential for avoiding race conditions and ensuring data integrity.
   - **Redlock Algorithm:** Redis provides a distributed locking mechanism through the Redlock algorithm, which is designed to be safe and reliable in distributed environments.

7. **Real-Time Analytics and Metrics:**
   - **Counting and Aggregation:** Redis's ability to perform fast in-memory operations makes it ideal for real-time analytics, such as counting events, tracking metrics, and aggregating data across a distributed system.
   - **Example:** An e-commerce platform might use Redis to track user activity in real time, updating counters for views, clicks, or purchases as they happen.

### Summary:

In a distributed system, Redis serves as a versatile tool that can be used for caching, real-time data storage, message brokering, and more. Its ability to operate in a clustered mode, combined with its support for replication and high availability through Redis Sentinel, makes it an essential component in building scalable and resilient distributed architectures. Redis helps improve system performance, reliability, and scalability, making it a popular choice in modern distributed systems.

