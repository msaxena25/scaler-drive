# SQL Database

SQL databases are relational databases which consist of tables related to each other and every table has a fixed set of columns. You can query across tables to retrieve related information.


# Biggest feature of SQL Database

## Normalization

Normalization is a process in database design that organizes data into tables in such a way that redundancy is minimized and data integrity is maintained. The goal of normalization is to ensure that the database structure is efficient, flexible, and scalable.

One of the requirements of SQL databases is to store the data in normalized form to avoid data redundancy and achieve consistency across tables.

## Drawbacks of Normalization:

### Complex Queries:

Highly normalized databases may require complex joins to retrieve data, which can sometimes reduce performance and high latency.

### Overhead:

Splitting data into multiple tables can introduce overhead, both in terms of storage (for indexes) and in processing time for complex queries.


# ACID

ACID stands for Atomicity, Consistency, Isolation and Durability.

● Atomicity means that either a transaction must be all or none. There should not be any partial states of execution of a transaction. Either all statements of a transaction are completed successfully or all of them are rolled back.

● Consistency refers to the property of a database where data is consistent before and after a transaction is executed. It may not be consistent while a transaction is being executed, but it should achieve consistency eventually.

● Isolation means that any two transactions must be independent of each other to avoid problems such as dirty reads.

● Durability means that the database should be durable, i.e. the changes committed by a transaction must persist even after a system reboot or crash.


# Defined Schema

In SQL Each table has a fixed set of columns and the size and type of each column is well-known. However, there are a few features that are not supported by a SQL database.

## Shortcomings of SQL Databases

### Fixed Schema might not fit every use case.

Let’s design the schema for an e-commerce website and just focus on the Product table. There are a couple of pointers here:

● Every product has a different set of attributes. For example, a t-shirt has a collar type, size, color, neck-type, etc.. However, a MacBook Air has RAM size, HDD size, HDD type, screen size, etc.

● These products have starkly different properties and hence couldn’t be stored in a single table. If you store attributes in the form of a string, filtering/searching becomes inefficient.

● However, there are almost 100,000 types of products, hence maintaining a separate table for each type of product is a nightmare to handle.

SQL is designed to handle millions of records within a single table and not millions of tables itself.

Hence, there is a requirement of a flexible schema to include details of various products in an efficient manner.


### Sharding in SQL database


● If there is a need of sharding due to large data size, performing a SQL query becomes very difficult and costly.
● Doing a JOIN operation across machines nullifies the advantages offered by SQL.

As a result most sql database does not support Sharding at all.


# NoSQL Databases

Sharding and Denormalization are the main thing to develop NOSQL database.

# Sharding Key

Sharding key is the main term of sharding system & that's why we need to choose the sharding key carefully.

For Messenger application , User id is sharding key.

For Banking system where situation is mainly balance check, transaction history, accounts of user, create new transaction, User id best sharding key.

For uber like system where use-case is finding near by cab drivers. In this case, Driver Id is not a good sharding key because driver can be on any location. So City Id seems good sharding key.

For IRCTC where main use case is ticket booking (stop double ticket booking). In this case, date of booking is not good sharding key because it cannot balance the load. User id is not good sharding key here because same ticket could be assigned to multiple users. Train Id is good sharding key. Loads get split among trains. Within a train, it knows which user has been allocated a particular berth. 

**Note**: Composite sharding keys can also be a good choice.

# Few points to keep in mind while choosing Sharding Keys:

● Load should be distributed uniformly across all machines as much as possible.
● Most frequent operations should be performed efficiently.
● Minimum machines should be updated when the most-frequent operation is performed. This helps in maintaining the consistency of the database.
● Minimize redundancy as much as possible.

# Types of NoSQL databases

- NoSQL databases are designed to handle large volumes of data, support flexible data models, and provide high scalability and availability.

-  NoSQL databases don't rely on a fixed schema, making them ideal for handling unstructured or semi-structured data.

There are several types of NoSQL databases, each suited to different use cases:

## Key-Value Stores

● Data is stored simply in the form of key-value pairs, exactly like a hashmap.
Use Cases: Caching, session management, user preferences, and shopping carts.
Examples -  Redis, Amazon DynamoDB

## Document-Oriented Databases

● Document DB structures data in the form of JSON format.
● Every record is like a JSON object and all records can have different attributes.
● You can search the records by any attribute.
● Examples include: MongoDB, CouchDB and AWS ElasticSearch, etc.

Use Cases: Content management systems, user profiles, catalogs, blogs, and applications that require schema flexibility.

## Column-Family Stores

These databases store data in columns rather than rows, which allows for efficient storage and retrieval of sparse data.
In every column family, you can store multiple strings like a record of that column family.
Every column family in a CF DB is like a table which consists of only two columns timestamp and a string.

Use Cases: Time-series data, event logging, recommendation engines, and applications with large datasets that require efficient read and write operations.

Example - Apache Cassandra, HBase, ScyllaDB

## Graph database

Description: Store data in nodes and edges, where nodes represent entities, and edges represent relationships between them. Useful for querying complex relationships.
Examples: Neo4j, Amazon Neptune, ArangoDB
Use Cases: Social networks, recommendation engines, fraud detection

## Time series database

Description: Optimized for storing and querying time-series data, where data points are associated with timestamps.
Examples: InfluxDB, TimescaleDB, OpenTSDB
Use Cases: IoT applications, financial data, monitoring systems


# Manual Sharding

## What is the replication level in the distributed system?

In a distributed system, the replication level (or replication factor) refers to the number of copies of data that are stored across different nodes or machines within the system. Replication is a crucial aspect of distributed systems, as it enhances data availability, fault tolerance, and reliability by ensuring that copies of data are maintained even if some nodes fail.

### Key Concepts of Replication Level:

1. **Replication Factor**: If the replication factor is 3, there will be three copies of the data distributed across different nodes.

2. **Data Availability**: Higher replication levels increase data availability.

3. **Fault Tolerance**: Replication helps in achieving fault tolerance by allowing the system to continue operating correctly even when some of the replicas fail.

4. **Consistency**: Maintaining consistency across replicas is a critical challenge. Depending on the system's design, it may implement strong consistency (where all replicas are kept synchronized) or eventual consistency (where replicas are allowed to diverge temporarily).

### Example in Practice:

- **Google BigTable**: Typically, Bigtable uses a replication factor of three, where data is replicated across three different data centers.
- **Hadoop Distributed File System (HDFS)**: By default, HDFS uses a replication factor of three, meaning each block of data is stored on three different nodes within the cluster.

# Google BigTable - NoSQL database

Google BigTable is a distributed, scalable, and high-performance NoSQL database service provided by Google Cloud. It's designed to handle massive amounts of structured data, enabling applications to store, manage, and retrieve large datasets with low latency and high throughput.

# Utilize Standby Machines

Standby machines in a distributed system are backup nodes that are not actively processing tasks but are ready to take over in case of a failure or increased load. Utilizing standby machines effectively can enhance the system's reliability, availability, and scalability.


# What is Orchestration in distributed system?

Orchestration in a distributed system refers to the automated coordination, management, and scheduling of complex tasks and services across multiple machines or components in the system. 

Examples of Orchestration Tools:

Kubernetes: The most widely used container orchestration platform. Kubernetes automates the deployment, scaling, and management of containerized applications across a cluster of machines.

Apache Mesos: A cluster manager that provides resource isolation and sharing across distributed applications or frameworks.

Docker Swarm: Native clustering and orchestration tool for Docker. It manages containers across multiple Docker hosts and allows for scaling and scheduling of containerized services.

Ansible: Primarily a configuration management tool but can also be used for orchestrating complex deployments and workflows across multiple machines.


# In a Multi-Master distributed database system, what is the relationship between "R," "W," and "X"?

- **R (Read Quorum)**: The minimum number of replicas that must respond to a read operation for it to be considered successful.
- **W (Write Quorum)**: The minimum number of replicas that must acknowledge a write operation for it to be considered successful.
- **X (Total Number of Replicas)**: The total number of replicas in the system where a piece of data is stored.

### Relationship Between R, W, and X:

The relationship between "R," "W," and "X" is governed by the quorum rules, which are essential for ensuring different levels of consistency and availability in the system.

### Key Points:

1. **Consistency**:
   - When `R + W > X`, there is an overlap between the nodes involved in read and write operations, ensuring that the read quorum will always include at least one node that has the latest write, thereby providing strong consistency.

   - If `R + W ≤ X`, there may be scenarios where the read operation could miss the most recent write, leading to potential inconsistencies (e.g., eventual consistency).

2. **Availability**:
   - Lower values of "R" or "W" can increase system availability by allowing reads and writes to succeed even if only a few replicas are reachable. However, this may compromise consistency.

   - Higher values of "R" or "W" ensure better consistency but may reduce availability, especially in the presence of network partitions or node failures.

3. **Latency**:

   - Higher "R" or "W" values can lead to increased latency because the system must wait for more nodes to respond.
   - Lower "R" or "W" values can reduce latency but may affect the accuracy or reliability of the data.

### Example:
- Assume `X = 5` (5 replicas):
  - If `R = 3` and `W = 3`, then `R + W = 6`, which is greater than `X`, ensuring strong consistency.
  - If `R = 2` and `W = 2`, then `R + W = 4`, which is less than `X`, leading to potential consistency issues but possibly higher availability and lower latency.
