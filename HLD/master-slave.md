# Master Slave

The term **Master-Slave** is not a theorem but a common architectural pattern in distributed systems and databases. This pattern is used to manage data replication, distribution, and load balancing across multiple nodes in a network.

### Master-Slave Architecture Overview:

1. **Master Node:**
   - The **Master** node is the primary node in this architecture. It is responsible for handling all write operations (insert, update, delete) and is considered the authoritative source for the data.
   - The Master node maintains the most up-to-date version of the data.
   - After processing write operations, the Master node replicates or synchronizes the changes to one or more Slave nodes.

2. **Slave Nodes:**
   - **Slave** nodes are secondary nodes that primarily handle read operations. They receive replicated data from the Master node and maintain copies of the data.
   - Slave nodes are usually read-only, meaning they do not process write operations. However, they can be configured to handle writes in certain situations, though this is less common.
   - By offloading read operations to Slave nodes, the system can balance the load more effectively and improve read performance.

### How Master-Slave Architecture Works:

1. **Write Operations:**
   - All write operations are directed to the Master node. For example, if a user wants to update a record in the database, that request is processed by the Master node.
   - Once the Master node has successfully applied the write operation, it propagates or replicates the updated data to the Slave nodes.

2. **Read Operations:**
   - Read operations can be directed to either the Master node or any of the Slave nodes. Typically, Slave nodes handle most of the read requests to distribute the load and reduce the burden on the Master node.
   - Since the Slave nodes receive updates from the Master node, they should have a consistent (though possibly slightly delayed) copy of the data.

3. **Replication:**
   - The process of copying data from the Master node to the Slave nodes is called replication. Replication can be **synchronous** (where the Master waits for confirmation that the Slave has successfully received the update) or **asynchronous** (where the Master does not wait and continues processing other requests).

### Advantages of Master-Slave Architecture:

1. **Scalability:**
   - The architecture allows the system to scale by adding more Slave nodes to handle increased read loads, which improves performance and reliability.
   
2. **High Availability:**
   - Even if the Master node fails, the Slave nodes can continue to serve read requests. Some systems are designed to promote a Slave node to the new Master in the event of Master node failure, ensuring continuous operation.

3. **Load Balancing:**
   - By distributing read operations across multiple Slave nodes, the system can handle more concurrent requests, reducing the risk of bottlenecks.

### Disadvantages of Master-Slave Architecture:

1. **Single Point of Failure (for Writes):**
   - The Master node is a single point of failure for write operations. If the Master node goes down, write operations cannot be processed until a new Master is designated or the existing one is restored.

2. **Data Consistency Issues:**
   - If replication is asynchronous, there might be a delay between when a write is applied to the Master and when the change appears on the Slave nodes. This can lead to temporary inconsistencies where a read operation on a Slave node returns outdated data.

3. **Complex Failover:**
   - Promoting a Slave node to Master during a failure can be complex and requires careful management to ensure data consistency and integrity.

### Real-World Examples of Master-Slave Architecture:

- **MySQL Replication:**
  - MySQL supports Master-Slave replication, where a Master database server replicates data to one or more Slave servers. This is often used for scaling read operations in large-scale applications.

- **Redis Master-Slave Setup:**
  - Redis, an in-memory data store, can be configured in a Master-Slave setup, where the Master handles writes and the Slave(s) handle reads.

- **Apache Hadoop HDFS:**
  - In Hadoop’s HDFS, the NameNode acts as the Master that manages the metadata, while DataNodes (which can be considered as Slave nodes in this context) store the actual data blocks.

### Summary:

The Master-Slave architecture is a popular pattern for scaling read operations and ensuring data redundancy in distributed systems. While it offers several benefits like scalability and load balancing, it also comes with challenges, particularly around ensuring data consistency and managing failover scenarios.

In Master-Slave systems,

* All writes first come to Master only.
* Reads can go to any of the machines.
* Whenever the Master system dies, a new election of the master will take place based on a different elections algorithm.


* Low Latency System - Write on Master => return => then Write on slaves.

* Low Latency + High Consistency - Write on Master => Then Write on One slave => return  response => Write on remaining slaves

* Highly Consistency system => Write on Master => Then Write on all slaves => return response.

