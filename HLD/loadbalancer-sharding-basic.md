# ICANN ?

ICANN is an organization which have list of domain names.

# DNS ?

- Domain names comes from ICANN and DNS converts it to IP address.
- Google has its own domain name services.
- User request for a website and that request goes to DNS and DNS returns IP address of that domain to user. Then User contact to that IP address and serve purpose.
- 

# DNS Propagation delay

# IP Address ?

Static IP / Dynamic IP

# ISP ?

# Scaling -

Let's understand the scaling.
Suppose there is a machine that is serving 10,000 query per day but now number of users are increased so we have to serve 50,000 queries per day, So how can a single system handle such a large number of query?

There are two ways to do this one is increase the hard disk, RAM size means Memory of that particular machine and second is increase the number of systems or servers.
Adding memory in the single server is called vertical scaling while adding more number of servers is known as horizontal scaling

# Vertical / Horizontal Scaling

Example - How to manage classroom when number of students increases.
- Either increase benches to one class room but that is not best approach and cannot fit for a large number of students. This is known as vertical scaling.
- Second increase class rooms like A , B and C... That is suitable approach and it is called horizontal scaling

Vertical scaling and horizontal scaling are two approaches to improving the performance and capacity of a system.

### Vertical Scaling (Scaling Up):
- **Definition**: Increases the power of a single server by adding more resources such as CPU, RAM, or storage.
- **Pros**:
  - Easier to implement, especially with legacy systems.
  - Simplifies management since everything runs on a single machine.
- **Cons**:
  - Limited by the capacity of a single machine.
  - Can lead to higher costs for high-end hardware.
  - May result in a single point of failure.

### Horizontal Scaling (Scaling Out):
- **Definition**: Adds more servers to the system to distribute the load, essentially increasing capacity by adding more machines.
- **Pros**:
  - Better fault tolerance since the load is spread across multiple servers.
  - Easier to scale dynamically by adding or removing servers.
  - Can handle more traffic and larger datasets as you can keep adding servers.
- **Cons**:
  - More complex to manage due to the need for load balancing, synchronization, and distributed systems.
  - Requires applications to be designed to run across multiple machines (e.g., stateless design).
  - Cost

In summary, vertical scaling enhances a single machine's capability, while horizontal scaling expands capacity by adding more machines.

# Problems with Horizontal scaling

Horizontal scaling introduces several challenges:

1. **Complexity in Management**: Managing a distributed system across multiple servers is more complex, requiring careful coordination, monitoring, and maintenance.

2. **Data Consistency**: Ensuring data consistency across multiple servers, especially in distributed databases, can be difficult and may require complex replication and synchronization mechanisms.

3. **Network Latency**: Communication between multiple servers can introduce network latency, impacting the performance of distributed applications.

4. **Load Balancing**: Effective load balancing is essential to evenly distribute traffic, but configuring and maintaining load balancers can be complex.

5. **Application Design Requirements**: Applications must be designed to be stateless or capable of handling distributed states, which may require significant architectural changes.

In terms of Technology if we see the main problem of horizontal scaling is that we have number of servers and each server have different IP address so when a user request a domain name, it is difficult to manage which server need to return the response.

To handle such problem, one-man army type component comes in middle and that is called Load balancer. Load balancer is a most important piece of software. It is also a physical machine that does lot of things.

Example -  Every big places we have a reception counter. We don't know the exact office location or shop location, so we go to reception, ask them and they will provide us correct information or route us to correct location.

Similarly load balancer works. load balance is first point of contact for the back and services.
Now user will go to particular website and that request will send to DNS and DNS will return the IP address of Load Balancer and then user will communicate to Load Balancer and load balancer will distribute that request to the available machine. And that is called as distributed system.

# reverse proxy

Load Balancer does two main things one is reverse proxy and second is registry.
Reverse proxy means it receives requests and send it to other servers.

#   Load balancer Registry

A load balancer registry is a system or service that maintains a list of available servers and their statuses for a load balancer. It helps manage server discovery, registration, and health status updates, ensuring the load balancer routes traffic only to healthy and available servers.

# sticky session

Sticky sessions in load balancers ensure that a user's requests are consistently routed to the same server, preserving session-specific data and providing a seamless user experience. This simplifies session management and is especially beneficial for stateful applications where maintaining session continuity is critical.


# How do load balancers distribute requests to one of the servers?

Load balancers distribute requests to servers using various algorithms, such as:

1. **Round-Robin**: Requests are sent sequentially to each server in the pool.
2. **Least Connections**: Requests are sent to the server with the fewest active connections.
3. **IP Hash**: The client's IP address is hashed, and the request is sent to a specific server based on the hash.
4. **Weighted Round-Robin/Least Connections**: Servers are assigned weights (load factor), and requests are distributed based on those weights, favoring more powerful servers.

These methods ensure efficient resource use and balance the load across available servers.


# Auto Scaling

Autoscaling is a feature in cloud computing that automatically adjusts the number of active servers or resources in a system based on the current demand. It ensures that the system can handle varying levels of traffic by dynamically adding or removing instances to meet performance targets without manual intervention. Autoscaling is commonly used in cloud environments like AWS, Azure, and Google Cloud.

# how a load balancer knows that a particular machine is not functioning?

We have pull and push two techniques to know about server is active or not.

Pull Technique - 
A load balancer determines if a particular machine (or server) is not functioning by performing **health checks**. Here’s how it works:

1. **Health Check Configuration**: The load balancer is configured to periodically send health check requests or api to each server in its pool. These checks can be simple (e.g., pinging the server or sending an HTTP request) or more complex (e.g., checking specific application responses).

2. **Monitoring Responses**: The load balancer monitors the responses from each server. If a server fails to respond or returns an error status (e.g., 500 errors in an HTTP check), the load balancer flags that server as unhealthy.

3. **Marking a Server as Unhealthy**: After a certain number of consecutive failed health checks, the load balancer marks the server as unhealthy and stops sending traffic to it.

4. **Recovery**: If the server starts responding correctly again after failing checks, the load balancer can automatically mark it as healthy and resume sending traffic to it.

These health checks ensure that traffic is only routed to functional servers, maintaining the reliability and availability of the system.

Push Technique - Heart beat technique

Heartbeat techniques in load balancers involve periodically sending "heartbeat" signals / events / messages or health checks to servers to monitor their status.



# Sharding

Sharding is a database partitioning technique where a large dataset is divided into smaller, more manageable pieces called "shards." Each shard is stored on a different server or database instance.
This approach improves performance, scalability, and manageability by distributing the load and data across multiple servers.

# Sharding example

Let's say you have a database of 10 million users in a social media app. As the user base grows, the database becomes slow and hard to manage because all the data is stored in a single database instance.

### Without Sharding:
- All 10 million user records are stored in a single database.
- As more users join, the database struggles with performance, leading to slower query times and potential downtime.

### With Sharding:
You decide to shard the database by dividing the users based on their geographic region.

1. **Shard 1**: Stores users from North America.
2. **Shard 2**: Stores users from Europe.
3. **Shard 3**: Stores users from Asia.

Each shard is a separate database instance that only contains data relevant to users in that region.

### How It Works:
- When a user from North America logs in, their request is directed to Shard 1.
- A user from Europe is directed to Shard 2, and so on.

### Benefits:
- **Improved Performance**: Each database shard has fewer records to manage, so queries are faster.
- **Scalability**: As the user base grows, you can add more shards for new regions without overloading existing ones.
- **Fault Isolation**: If Shard 2 (Europe) experiences an issue, only European users are affected, while others continue to use the app without interruption.

Sharding allows the application to handle larger datasets more efficiently by distributing the load across multiple databases.

# How datasets are sharded in sharding technique?

Datasets can be sharded using various strategies, depending on the specific requirements of the application. Here are the common methods:

### 1. **Horizontal Sharding (Range-Based Sharding)**:
- **How It Works**: Data is divided into shards based on a specific range of values. For example, in a user database, users with IDs 1 to 1 million could be stored in one shard, 1 million to 2 million in another, and so on.
- **Example**: 
  - Shard 1: User IDs 1–1,000,000
  - Shard 2: User IDs 1,000,001–2,000,000
- **Use Case**: Works well when data can be naturally divided into ranges.

### 2. **Vertical Sharding (Attribute-Based Sharding)**:
- **How It Works**: Different tables or attributes are stored in different shards. For instance, user profiles might be stored in one shard, while user activity logs are stored in another.
- **Example**: 
  - Shard 1: User Profile Data
  - Shard 2: User Activity Logs
- **Use Case**: Useful when different parts of the dataset have different access patterns or storage requirements.

### 3. **Hash-Based Sharding**:
- **How It Works**: A hash function is applied to a key (like a user ID) to determine which shard the data should go to. The hash function distributes data more evenly across shards.
- **Example**: 
  - User ID `hash(user_id) % number_of_shards` determines which shard the user data goes to.
- **Use Case**: Provides a balanced distribution of data across shards, avoiding hotspots.

### 4. **Geographic/Location-Based Sharding**:
- **How It Works**: Data is sharded based on geographic location or region. For instance, all users in North America might be stored in one shard, while users in Europe are in another.
- **Example**: 
  - Shard 1: North America Users
  - Shard 2: Europe Users
- **Use Case**: Ideal for applications with geographically distributed users.

### 5. **Directory-Based Sharding**:
- **How It Works**: A lookup table (directory) maintains a map of data keys to shard locations. When accessing data, the system first checks the directory to find out which shard the data is stored in.
- **Example**: 
  - A central directory indicates that User ID 12345 is in Shard 3.
- **Use Case**: Flexible but adds the overhead of maintaining the directory.

Each sharding method has its pros and cons, and the choice depends on factors like data distribution, query patterns, and scalability needs.

# Consistent hashing technique for sharding

Simple hash based sharding technique does not work in case of servers adding or removing dynamically. In Simple hash, we use single hash function that works on fixed number of servers. But in consistent hashing we use two hash functions. One for user Id and second is for machine.

Consistent hashing is a technique used in sharding to evenly distribute data across multiple shards or nodes, minimizing the impact when nodes are added or removed. It is particularly useful in systems where the number of shards can change dynamically, such as in distributed databases or caching systems.

### How Consistent Hashing Works:

1. **Hash Ring**:
   - All possible shard identifiers are arranged in a circular space or "ring."
   - A hash function is applied to both the keys (e.g., user IDs) and the shard identifiers to place them on the ring.

2. **Assigning Keys to Shards**:
   - When a key is hashed, it is placed on the ring.
   - The key is then assigned to the first shard that appears in a clockwise direction from its position on the ring.

3. **Adding or Removing Shards**:
   - **Adding a Shard**: When a new shard is added, it is placed on the ring according to its hash. Only the keys that map to this new shard (i.e., those between the new shard and the next shard in the clockwise direction) need to be redistributed. All other keys remain unaffected.
   - **Removing a Shard**: When a shard is removed, the keys that were assigned to it are reallocated to the next shard in the clockwise direction.

### Example:

Imagine you have a consistent hash ring with three shards (A, B, C):

- The hash function maps key `K1` to shard A, `K2` to shard B, and `K3` to shard C.
- Now, if a new shard D is added, only the keys that hash to a position between shard C and D on the ring will be reassigned to shard D. The rest of the keys continue to go to their original shards.

### Benefits of Consistent Hashing:

- **Minimal Rebalancing**: When a shard is added or removed, only a small portion of the keys need to be rebalanced, minimizing disruptions.
- **Scalability**: Easily allows for the addition of new shards or nodes without significant reconfiguration.
- **Even Distribution**: Helps in evenly distributing data across shards, preventing hotspots.

### Use Cases:
- Distributed databases (e.g., DynamoDB, Cassandra)
- Distributed caching systems (e.g., Memcached, Redis)
- Load balancing across dynamic server pools

Consistent hashing is a powerful technique for sharding, particularly in dynamic, distributed systems where the number of shards may frequently change.


# Cascading Failure

When on shard or sever fails due to any reason, The load that was handled by the failed shard is redistributed to the remaining shards. These shards now need to handle additional requests, including those that would have gone to the failed shard.
If the remaining shards are already operating near capacity, the sudden increase in load can overwhelm them, leading to performance degradation, slower response times, and potential failure of these shards as well. If enough shards fail, the entire system may become inoperable, leading to a complete outage where the application or service is unavailable to users.

To solve this cascading failure, In consistent hashing, we use single hash function for User id and multiple hash functions for machine Ids so that Data can be stored at multiple places, when node goes down only that part of data moves to next Node.