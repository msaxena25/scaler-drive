/*
@ What is array?

An array is a linear collection of values stored at contiguous memory locations.

@ What is subarray?

A subarray is nothing but a slice of these contiguous memory locations of the actual array. In simpler terms, a subarray is nothing but any contiguous part of a given array.
The subarray has the same sequence of elements (order of the elements) as it is in the array.

* Example: Let the array be: arr = [1, 2, 3, 4, 5]
- All subarrays -

[1]
[2]
[3]
[1, 2]
[1, 3]
[2, 3]
[1, 2, 3]

@ What is subset?

Subset is nothing but any possible combination of the original array (or a set).

For example, the subsets of array arr = [1, 2, 3, 4, 5] can be:

[3, 1]
[2, 5]
[1, 2], etc.

@ What is subsequence?

A subsequence is a sequence of the elements of the array but not contiguous.

* For example, the subsequences of the array arr : [1, 2, 3, 4] can be:

[1, 3]
[1, 3, 4]
[1, 4]
[2, 4]
[1, 2, 3, 4], etc.

* NOTE: All subarrays are Subsequences. But not all subsequences are subarrays.

*/

/*
@ Array = [4, 1, 9, 2, 3, -1, 6]

                Subarray    SubSet  Subsequence
[4, 1]             ✔️       ✔️      ✔️
[1, 9, 2]          ✔️	    ✔️      ✔️
[4, 2, 6]          ❌       ✔️      ✔️
[3, 2, 9]          ❌       ✔️      ❌

* NOTE:  All subsequences are subset. But not all subsets are subsequences.


* = number of subsets > number of subsequences If subset elements are not distinct then-

*/

/*

* Two subsets that have same elements are known as Same subset.

@ arr = [1, 2, 3]

Subset -> [2, 3] & [3, 2] are same because both have same elements.

Subset => [1, 3] & [3, 1] are same.

Subset => [1, 2, 3] & [3, 2, 1] are same.

? Some of subsets from above array-

[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]

But Actually they are all same subset with same elements,
so all will count as 1 and We will consider a subset [1,2,3] only.   

*/

/*
* For Distinct elements => no. of subsets = no. of subsequences.

@ Arr  = [1, 2, 3]

SubSequence         SubSet
[]                    []
[1]                   [1]
[2]                   [2]
[3]                   [3]
[1,2]                 [1,2]
[1,3]                 [1,3]
[2,3]                 [2,3]
[1,2,3]               [1,2,3]

Subsets like [3,1], [3, 2] or [3,2,1] will not consider because they have same elements from one of above subset, just order change.

* So total number of subsequences are subset = 2^n

Here n = 3 , so 2^3 = 8.

? IF empty subsequence does not consider then no of subsequences are 2^n - 1.

*/


/*
Type            Continuity  Order   Count

Subarray            Yes     Yes     n*(n+1) / 2
Subsequence         Yes     No      2^n
Subset              No      No      2^n

*/


