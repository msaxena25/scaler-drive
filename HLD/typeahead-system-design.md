
# What points keep in mind to start on design.

- Figure out the MVP (Minimum Viable Product) - Minimum functional requirement that are viable means sufficient for a product.

- The design solution also depends on the scale of implementation. Lets estimate scale.

    - Storage requirements (Is sharding needed?).
    - Read-heavy or write-heavy system
        - Write operations block read requests because they acquire a lock on impacted rows.
        - If you are building a write-heavy system, then the performance of reads goes down. So, if you are building both a read and write heavy system, you have to figure out how you absorb some of the reads or writes somewhere else.
    - Query Per Second (QPS)
        - If your system will address 1 million queries/second and a single machine handles 1000 queries/second, you have to provision for 1000 active machines.

- Design Goal
    - Highly Consistent or Highly Available System (CAP theorem)
    - Latency requirements
    - Can you afford data loss?

- How is the external world going to use it? (APIs)
    - The choice of sharding key may depend on the API parameters

# Typeaheads System design

Typeaheads refers to the suggestions that come up automatically as we search for something. You may have observed this while searching on Google, Bing, Amazon Shopping App, etc.

## What is design problem?

How to build a search typeahead system? And scale it to google.

## MVP

- Maximum number of suggestions required? -- 5
- How to rank suggestions? - Choose the most popular ones.
- Definition of Popularity? - how frequently do people search for that search phrase
- minimum number of characters post which suggestions will be shown - 3
- Support for special characters - No
- Personalization required (Customizable UI) - Not for MVP
- Want to include recency factor for ranks - No. For now only rank with frequency.

## Understand Recency Factor in rank suggestions (recency factor means recently higher search)

- For example, Roger Binny has the highest search frequency: 1 million searches over the last 5 years. On a daily basis, it receives 1000 searches.
- But, yesterday Roger Federer won Wimbledon and he has received 10000 queries since then. So, the algorithm should ideally rank Roger Federer higher.
- However, for now let’s move forward with frequency only.

# Need of Sharding?

First, let’s decide what we need to store.
- We can store the search terms and the frequency of these search terms.

Assumptions (Storage calculation):

- 10% of the queries received by Google every day contain new search terms.
- This translates to 1 billion new search terms every day.
- Means 365 billion new search terms every year.
- Next, assuming the system is working past 10 years:
- Total search terms collected so far: 10 * 365 Billion
- Assuming one search term to be of 32 characters (on average), it will be of 32 bytes.
- Let’s say the frequency is stored in 8 bytes. Hence, total size of a row = 40 bytes.

Total data storage size (in 10 years): 365 * 10 * 40 billion bytes = 146 TB (Sharding is needed).


# Read or Write heavy system

- Assumed 10 billion search queries every day, it means there will be 10 billion writes per day.
- Again each search query triggers 6 typeahead queries => 6 read requests.
- It means both a read and write-heavy system required.

# Design Goals

- Availability is more important than consistency.
- Super low Latency because you are competing with typing speed.

# Required APIs?

- getSuggestion(prefix_term, limit = 5)

- updateFrequency(search_term) - Asynchronous Job performed via an internal call

## Trie Approach

- Construct a trie where each node is an English alphabet (or alphanumeric if digits are also considered)
- Each node has utmost 26 children i.e. 26 letters of the English alphabet system
- Each terminal node represents a search query (alphabets along root -> terminal node).