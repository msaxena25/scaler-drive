# CAP Theorem:

- The CAP theorem, also known as Brewer's theorem.
- It is a fundamental principle in distributed systems that describes the trade-offs between three key properties: Consistency, Availability, and Partition Tolerance.

## Key Concepts of the CAP Theorem:

### Consistency (C):

This means that all nodes in the system have the same view of the data at any given time. If you write data to the system and then immediately read it, you should see your write reflected in the read.

### Availability (A):

Every request (read or write) receives a response (success or failure) without guaranteeing that it contains the most recent write. The system is always available for queries, meaning that every request receives a response, even if it might not reflect the latest data.

### Partition Tolerance (P):

Partition Tolerance (the "P" in CAP) refers to a distributed system's ability to continue functioning even if communication between some parts of the system is lost or delayed. In simpler terms, partition tolerance means that the system can handle network failures that prevent different parts of the system from communicating with each other.

## Why is Partition Tolerance Important?

Network issues are common in large distributed systems, and it’s unrealistic to assume that every server will always be able to communicate with every other server. Partition tolerance ensures that your system remains operational even when these issues occur.

# Trade-Off : 

Trade Off means which combination of system can persist (CA, CP or AP).

### CA (Consistency + Availability):

The system works only if there is no partition. If a partition happens, the system must sacrifice either consistency or availability. This is generally impractical or impossible in distributed systems, as network partitions are common.

### CP (Consistency + Partition Tolerance)

The system will maintain consistency and continue to operate correctly across all nodes, even during a network partition, but it might sacrifice availability. This means that some requests might be denied or delayed during the partition.

### AP (Availability + Partition Tolerance)

The system remains available and continues to process requests during a partition, but it might sacrifice consistency. This means that some reads might return outdated data.



# Examples of CP and AP - 

- CP systems like HBase, MongoDB (with strict write concerns), and Zookeeper prioritize data consistency, even if it means that the system might become unavailable during network partitions.

- AP systems like Cassandra, DynamoDB, and Riak prioritize availability and partition tolerance, ensuring that the system continues to operate, even if it leads to temporary inconsistencies in the data.

# Real world applications example of CP and AP - 

CP - Facebook Messengers, Whats app Or any Message application, Banking applications, ATM, Reservations or ticket booking application, Health care applications.

AP - Netflix Video streaming, E Commerce platform, Quora, Blog Sites, Logger applications, Facebook News Feeds.

Note here - E Commerce platform comes into Eventual consistent. Means They prefer to be available with less inconsistency. Based on situation they choose cp vs ap.

# PACELC Theorem:

P - Partitions
A - Availability
C - Consistency
E - Else
L - Latency
C - Consistency

It is extension of CAP theorem and says that - 

In the case of network partitioning (P) in a distributed computer system, one has to choose
between availability (A) and consistency (C).

But else (E), even when the system is running normally in the absence of partitions, one has to
choose between latency (L) and consistency (C).

So If there is no network partition, we have to choose between extremely low Latency or High consistency. They both compete with each other.
