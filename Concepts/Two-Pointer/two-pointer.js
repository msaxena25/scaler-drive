
//! Pairs with given sum II
// https://www.scaler.com/academy/mentee-dashboard/class/47681/assignment/problems/5097?navref=cl_tt_lst_nm

/*
Given a sorted array of integers (not necessarily distinct) A and an integer B, find and return how many pair of integers ( A[i], A[j] ) such that i != j have sum equal to B.

Since the number of such pairs can be very large, return number of such pairs modulo (109 + 7).
 */

function pairSum(A, B) {
    let count = 0;
    let i = 0;
    let j = A.length - 1;
    while (i < j) { // i and j are different so dont need to check  i<=j
        if (A[i] + A[j] == B) {
            count = count + 1;
            if (A[j] == A[j - 1] && A[i] == A[i + 1]) {
                count += 3;
                i += 2;
                j -= 2;
            }
            else if (A[j] == A[j - 1]) {
                j--;
            } else {
                i++;
            }
        }
        else if (A[i] + A[j] > B) {
            j--;
        } else {
            i++;
        }

    }
    return count % Math.pow(10, 7);
}

// console.log(pairSum([1, 2, 6, 6, 7, 9, 9], 13)) //2
// console.log(pairSum([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 9, 10], 5)) //6
console.log(pairSum([1, 1, 3, 3, 5, 5, 6, 6, 6, 9, 10], 9)) //6


//! Container With Most Water

/*
Given n non-negative integers A[0], A[1], ..., A[n-1] , where each represents a point at coordinate (i, A[i]).

N vertical lines are drawn such that the two endpoints of line i is at (i, A[i]) and (i, 0).

Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container.

A = [1, 5, 4, 3]
output: 6
*/

function findArea(A) {
    let n = A.length;
    let i = 0;
    let j = n - 1;
    let area = 0;
    while (i < j) {
        /* Area = height * width
        For Height , we will take min value from A[i] & A[j] because water can be store in min height wall.
        For Width, We have to take Absolute value of index j - index i */
        let tempArea = 0;
        let minHeight = A[i] < A[j] ? BigInt(A[i]) : BigInt(A[j]);
        tempArea = minHeight * BigInt(Math.abs(j - i));
        if (tempArea > area) {
            area = tempArea;
        }
        /*
            If A[i] > A[j] means A[i] wall is bigger then A[j]. Bigger wall can give most area instead of lower wall. So move j-- for next wall processing.
            If A[j] > A[i] means A[j] wall is bigger. So move i++ to process next wall.
            In Case both walls are same - then we have to take new wall from both side.
        */
        if (A[i] > A[j]) {
            j--;
        } else if (A[j] > A[i]) {
            i++;
        } else {
            i++;
            j--;
        }
    }
    return Number(area);
}

console.log(findArea([1, 5, 4, 3]))

const inputArr = [3273, 4325, 7503, 3709, 9257, 6554, 5467, 1052, 6396, 74, 2097, 3640, 720, 9016, 9862, 7735, 2743, 4050, 9353, 5451, 1346, 6622, 6923, 1067, 4076, 4208, 4639, 9415, 4784, 799, 9391, 1806, 924, 1737, 1000, 3097, 8580, 3321, 3529, 7705, 8852, 2440, 3184, 9171, 6451, 4474, 3150, 3387, 5897, 5238, 1272, 6012, 762, 7902, 4941, 7633, 926, 2767, 3, 9320, 1279, 7819, 2510, 8137, 742, 1734, 8829, 6174, 7041, 2506, 3710, 6649, 2306, 6147, 5418, 147, 6021, 6415, 8679, 9450, 2166, 615, 1740, 3444, 7465, 299, 4742, 8771, 7068, 9288, 548, 2248, 6757, 4410, 2822, 7126, 8836, 8088, 8855, 6985, 4759, 8971, 6231, 1354, 3307, 1856, 5317, 5352, 7512, 5213, 244, 5312, 2321, 5755, 7902, 5140, 2861, 1022, 97, 5530, 2464, 9248, 1, 8455, 2264, 8185, 9405, 6535, 8214, 4548, 8255, 492, 1305, 2738, 78, 3511, 4718, 1137, 1691, 5071, 1462, 4190, 2119, 7903, 9629, 2842, 7236, 7732, 2440, 3813, 4776, 5554, 7434, 7376, 666, 4347, 6159, 1229, 6615, 4078, 9701, 1714, 4532, 2953, 9571, 2908, 4821, 743, 3181, 6638, 2874, 9646, 2827, 7446, 6797, 7443, 1520, 5373, 2471, 1803, 9284, 9748, 1926, 7633, 3535, 1044, 8660, 9031, 3698, 803, 1356, 4758, 7779, 7648, 4666, 8264, 4302, 8315, 141, 5225, 8547, 1428, 3706, 7574, 9659, 6173, 8292, 7440, 9534, 6588, 7535, 5345, 3302, 2241, 7402, 6450, 6469, 4456, 9960, 6277, 3634, 9369, 3383, 8139, 3589, 1154, 678, 5536, 1635, 4424, 639, 9552, 3340, 3616, 3353, 1693, 1691, 3846, 2859, 8197, 4916, 199, 6444, 9454, 2360, 9213, 4586, 8371, 2765, 3829, 3839, 6498, 3227, 5666, 8311, 6180, 8330, 1302, 4504, 9321, 691, 3038, 3489, 934, 6068, 981, 1283, 2468, 5860, 6331, 1924, 9375, 5796, 9572, 4109, 1204, 9443, 8961, 5384, 7912, 4811, 2058, 3515, 184, 9258, 9613, 6821, 4087, 6000, 462, 2796, 3903, 6689, 4048, 4447, 589, 7527, 6685, 1617, 6785, 3607, 9018, 8063, 7891, 5361, 30, 8007, 9819, 1055, 6227, 5313, 5351, 7275, 8850, 9731, 7113, 8830, 290, 5271, 3940, 7980, 4028, 986, 6448, 8236, 6152, 9353, 8092, 938, 2680, 7973, 7525, 7952, 1004, 1510, 7060, 9983, 6400, 1712, 3791, 7595, 6391, 6062, 5815, 7934, 1168, 6897, 2736, 4161, 4536, 4024, 538, 8725, 8031, 483, 8037, 5791, 9084, 9496, 1887, 665, 8409, 2745, 7393, 8544, 8837, 4307, 5340, 4418, 5598, 2747, 5253, 1545, 2993, 7263, 895, 7522, 8284, 8915, 8065, 6696, 3629, 9093, 4867, 40, 4898, 918, 9579, 4198, 5545, 534, 8777, 4343, 981, 4160, 4542, 2586, 2014, 5666, 4371, 5967, 9316, 3940, 8084, 7375, 1275, 3171, 9775, 3171, 7889, 2061, 251, 8610, 4357, 6166, 2670, 4608, 3302, 7597, 3895, 5333, 1311, 9629, 2748, 6831, 694, 9996, 6611, 7742, 8912, 30, 5673, 1027, 4946, 9017, 4455, 7050, 8163, 1057, 6548, 685, 9311, 8839, 8356, 1824, 1418, 3784, 2237, 3553, 4498, 90, 9671, 5160, 5357, 3999, 3175, 4321, 21, 2473, 4835, 7026, 3451, 5489, 2494, 4906, 9930, 766, 4907, 1741, 7053, 8739, 8540, 4537, 3374, 7361, 7055, 5461, 5199, 6477, 5600, 8487, 1149, 962, 4807, 714, 7426, 1347, 1402, 5737, 7281, 5920, 2739, 7896, 2306, 3575, 5220, 9491, 467, 7163, 6702, 587, 1901, 4967, 3799, 3460, 1044, 6317, 4876, 5889, 5978, 6636, 339, 8888, 1129, 4089, 7987, 6029, 9899, 5922, 9963, 1707, 9030, 6531, 6466, 6340, 1561, 3910, 1867, 8516, 8411, 2722, 848, 9811, 8402, 4065, 1302, 7213, 4045, 8923, 7608, 126, 4673, 8610, 74, 5861, 3879, 3160, 7772, 2344, 4981, 2419, 8528, 6263, 8702, 1527, 533, 2272, 7270, 6590, 4376, 748, 2962, 7208, 9646, 9004, 3224, 5792, 8898, 7578, 2101, 8122, 853, 922, 3128, 8988, 1467, 7247, 5633, 4166, 1126, 8467, 9755, 2816, 9043, 6125, 6631, 6030, 1249, 8217, 9134, 921, 4252, 796, 8535, 8863, 7810, 309, 6263, 5443, 4611, 7211, 1560, 6453, 8032, 4941, 6127, 6614, 5857, 6730, 1862, 9754, 8773, 4173, 4503, 9044, 9327, 6848, 7385, 217, 5478, 2372, 3940, 3215, 2305, 5002, 6333, 8750, 4854, 14, 3308, 4303, 8757, 80, 4595, 5791, 4994, 7552, 3226, 3631, 9980, 7531, 2111, 726, 1013, 6085, 5710, 7582, 4281, 4040, 8145, 1940, 3596, 1605, 960, 9867, 5283, 650, 8342, 7101, 3485, 8767, 689, 9487, 8651, 6590, 3470, 7978, 3460, 7322, 6633, 2506, 4392, 8105, 6091, 8037, 1653, 4442, 8865, 9015, 6763, 318, 7482, 7468, 1738, 6131, 9188, 3355, 8953, 747, 269, 5361, 3191, 3719, 4752, 3623, 2722, 9381, 5210, 2791, 8291, 7962, 7925, 1482, 3775, 7067, 9518, 4253, 1626, 1907, 1411, 4092, 557, 8931, 8175, 6613, 6443, 1214, 6307, 1534, 8496, 9916, 8833, 6969, 9152, 8575, 6317, 4391, 8463, 5460, 6430, 2362, 1282, 6718, 254, 3940, 7719, 8612, 8945, 2313, 2137, 8405, 7101, 488, 6968, 1932, 5383, 4569, 5258, 112, 4817, 7005, 3283, 1300, 7258, 304, 5582, 2156, 2538, 5396];

console.log(findArea(inputArr))
//6962572


//! Pairs with Given Difference

/*
Given an one-dimensional integer array A of size N and an integer B.

Count all distinct pairs with difference equal to B.

Here a pair is defined as an integer pair (x, y), where x and y are both numbers in the array and their absolute difference is B.

A = [1, 5, 3, 4, 2]
B = 3
output: 2
*/

function findPairDifference(A, B) {
    console.log('findPairDifference :', A, B);
    let n = A.length;
    let i = 0;
    let j = n - 1;
    let count = 0;
    while (i < j) {
        const diff = Math.abs(A[j] - A[i]);
        if (diff == B) {
            count++;
        }
        if (diff < B) {
            if (A[j] < A[i]) {
                j--;
            } else {
                i++;
            }
        } else {
            if (A[j] < A[i]) {
                i++;
            } else {
                j--;
            }
        }
    }
    return count;
}

console.log(findPairDifference([1, 5, 3, 4, 2], 3))


//! Closest Sum of three integer

/*
Given an array A of N integers, find three integers in A such that the sum is closest to a given number B. Return the sum of those three integers.

Assume that there will only be one solution.

A = [-1, 2, 1, -4]
B = 1
output: 2  The sum that is closest to the target is 2. (-1 + 2 + 1 = 2)
 */

function closestSum(A, B) {
    console.log('closestSum :', A, B);
    let pf = [];
    pf[0] = A[0];
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    let i = 0;
    let j = i + 2;
    let n = pf.length;
    while (j < n) {
        let sum = 0;
        if (i == 0) {
            sum = pf[j];
        } else {
            sum = pf[j] - pf[i - 1];
        }
        if (sum == B || sum == (B - 1) || sum == (B + 1)) {
            return sum;
        } else {
            i++;
            j++;
        }
    }
    return 0;
}
// console.log(closestSum([3, 2, 1, 5, 6, 7], 10))

let arr = [-5, 1, 4, -7, 10, -7, 0, 7, 3, 0, -2, -5, -3, -6, 4, -7, -8, 0, 4, 9, 4, 1, -8, -6, -6, 0, -9, 5, 3, -9, -5, -9, 6, 3, 8, -10, 1, -2, 2, 1, -9, 2, -3, 9, 9, -10, 0, -9, -2, 7, 0, -4, -3, 1, 6, -3];

console.log(closestSum(arr, -1));



//! Subarray with given sum

/*
Given an array of positive integers A and an integer B, find and return first continuous subarray which adds to B.

If the answer does not exist return an array with a single element "-1".

First sub-array means the sub-array for which starting index in minimum.

1 <= length of the array <= 100000
1 <= A[i] <= 10^9
1 <= B <= 10^9

 A = [1, 2, 3, 4, 5]
 B = 5
 output:  [2, 3]
 */

//? TC - O(n)
function subarrayWithGivenSum(A, B) {
    console.log('subarrayWithGivenSum :', A);
        let i = 0; // start i from 0
        let j = 0; // start j from 0
    let sum = BigInt(A[0]); // single element is also a subarray so take first item as initial sum
    while (j < A.length) {
        if (Number(sum) == B) { // break the loop
            break;
        }
        /*
        1. sum < B, It means we need more elements to add to reach B, so increase j by 1 and add jth value to sum.
        2. sum > B, It means we reached more then B, so dedect current ith value from sum & increase i.
            Why dedect ith value from sum?
                - Sum has been increased more then B by current jth value, not before means starting value is not contributing to reach B.
        */
        if (Number(sum) < B) {
            j++; // Here j can go beyound limit of array thats why added (|| 0)
            sum = sum + BigInt(A[j] || 0)
        } else if (Number(sum) > B) {
            sum = sum - BigInt(A[i]);
            i++;
        }
    }

    // below code just to get subarray from i to j
    if (Number(sum) == B) {
        const ans = [];
        while (i <= j) {
            ans.push(A[i]);
            i++;
        }
        return ans;
    }
    return [-1]; // return -1 in array if not found subarray


}
console.log(subarrayWithGivenSum([1, 2, 3, 4, 5], 5)) // [2,3]
console.log(subarrayWithGivenSum([3, 1, 2, 4, 9, 7, 4], 22)) //[2, 4, 9, 7]
console.log(subarrayWithGivenSum([3, 1, 2], 22)) //-1
console.log(subarrayWithGivenSum([3], 3))
console.log(subarrayWithGivenSum([5, 10, 20, 100, 105], 101))