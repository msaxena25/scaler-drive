//! 1207. Unique Number of Occurrences

// https://leetcode.com/problems/unique-number-of-occurrences/description/

//Given an array of integers arr, return true if the number of occurrences of each value in the array is unique, or false otherwise.

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (A) {
    const map = {};
    for (let i = 0; i < A.length; i++) {
        if (map[A[i]]) {
            map[A[i]]++;
        } else {
            map[A[i]] = 1;
        }
    }
    const values = Object.values(map);
    for (let i = 0; i < values.length; i++) {
        if (values.indexOf(values[i]) != values.lastIndexOf(values[i])) {
            return false;
        }
    }

    // const temp = []
    // for(let i = 0; i < values.length;i++) {
    //     if(temp.includes(values[i])) {
    //        return false;
    //     } else {
    //          temp.push(values[i]);
    //     }
    // }
    return true;

};


//! 1748. Sum of Unique Elements

// https://leetcode.com/problems/sum-of-unique-elements/description/

/* You are given an integer array nums. The unique elements of an array are the elements that appear exactly once in the array.

Return the sum of all the unique elements of nums. */

/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums.indexOf(nums[i]) == nums.lastIndexOf(nums[i])) {
            sum += nums[i];
        }
    }
    return sum;
};