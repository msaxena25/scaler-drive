/**
 *! why array start with 0?
 *
 * There is no any specific reason of this.
 * All compiler and data structure has been created based on 0 indices.
 * In array, the index tells the distance from the starting element. So, the first
 * element is at 0 distance from the starting element. So, that's why array start from 0.
 */

//! Given an array A of N integers. Count the number of elements that have at least 1 elements greater than itself.

function countElements(arr) {
    // find max element
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    let maxCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === max) {
            maxCount++;
        }
    }

    console.log('max element of given array & its occurance - ', max, maxCount);
    console.log('Answer is', arr.length - maxCount)
    return arr.length - maxCount;
}
countElements([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9])
// 8 , Number of Iteration -  2n,  TC - O(n), SC(1)

//! Same above program with Brute Force solution -

function countElementsBFSolution(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[i]) {
                count++;
                break;
            }

        }
    }
    console.log('countElementsBFSolution', count);
}
countElementsBFSolution([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9])
// 8 , Number of Iteration -  n*n,  TC - O(n^2)
countElementsBFSolution([9, 2, 3, 5]) // 3

//! Lets try to solve above problem with single for loop but that will increase space complexity

function countElementsWithSingleForLoop(arr) {
    let map = {};
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        if (ele > max) {
            max = ele;
        }
        if (map[ele]) {
            map[ele]++;
        } else {
            map[ele] = 1;
        }
    }
    console.log('countElementsWithSingleForLoop - map', map);
    console.log(arr.length - map[max]);
}
countElementsWithSingleForLoop([9, 2, 3, 5, -1, -1, 9]) // 5
countElementsWithSingleForLoop([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9]) // 8
// Number of Iteration  -  n times
// TC - O(n)
// SC - O(n)

/***************************** */

//! Given an array A and an integer B. A pair(i, j) in the array is a good pair if i != j and (A[i] + A[j] == B).
//! Check if any good pair exist or not. Return 1 if good pair exist otherwise return 0.

//Brute force solution -
// Number of iteration - n * n
// TC - O(n^2)
function checkPairs(A, B) {
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            if (A[i] + A[j] === B) {
                return 1;
            }
        }
    }
    return 0;
}
console.log(checkPairs([1, 2, 3, 4], 7))
console.log(checkPairs([2, 3, 4], 1))
console.log(checkPairs([9, 4, 3, 7, -1, 0, 9, 2, 1, 6, 9], 15))

/*
i = 0, j will run 1 to (n-1) times , iteration here (n - 1)
i = 1 , j will run 2 to n-1
i = 2 , j will run 3 to n-1
i = 3 , j will run 4 to n-1
i = 10 , j will run 11 to n-1
i = k , j will run k to n-1
i = (n-1) , j will run 0
*/

/* Below is the Optimized way to check pairs with single for loop using hash map
We can do three things with same program
return 1 if any pair exists.
return count of pairs.
returns pairs. */

function checkPairs1(A, B) {
    const map = {};
    //let pairs = []; // if want to return pairs , we can save all pairs into this.
    // let count = 0;
    for (let i = 0; i < A.length; i++) {
        const element = A[i];
        if (map[element]) {
            //pairs.push([element, map[element]]);
            // count++;
            return 1;
        } else {
            map[B - element] = element;
        }
    }
    return 0;

}

// TC - O(n)
// SC - O(n)

console.log(checkPairs1([9, 4, 3, 8, -1, 0, 9, 2, 1, 6, 9], 7))
console.log(checkPairs1([9], 7))
console.log(checkPairs1([1, 1, 1, 2], 2))

/***************************** */

// Reverse an array with space complexity - O(1)

function reverseArray(arr) {
    // here will use two pointer technique
    let i = 0;
    let j = arr.length - 1;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap smart way
        i++;
        j--;
    }
    console.log(arr);
}

// number of iteration = n / 2
// TC - O(n)

reverseArray([1, 2, 3, 4, 5, 6, 7, 8]) // [8, 7, 6, 5, 4, 3, 2, 1]
reverseArray([1, 2, 3])
reverseArray([3])

// Reverse an array in given range with space complexity - O(1)
// 0 <= s <= e <= N - 1

// Given an array A of N integers. Also given are two integers s and e. Reverse the array A in the given range [s, e]

function reverseArrayWithRange(arr, s, e) {
    let i = s;
    let j = e;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap smart way
        i++;
        j--;
    }
    console.log(arr);
}
reverseArrayWithRange([1, 2, 3, 4, 5, 6, 7, 8], 2, 5)
reverseArrayWithRange([1, 2, 3, 4, 5, 6, 7, 8], 6, 7)


/**
 * ! In special case, the time complexity of inserting/deleting elements at the end of dynamic array is __________.
 * In general, the time complexity of inserting or deleting elements at the end of dynamic array is O (1).
 * Elements are added at reserved space of dynamic array. If this reserved space is exceeded, then the physical size of the dynamic array is reallocated and every element is copied from original array. This will take O(n) time to add new element at the end of the array.
 *
 * ! What is the time complexity for inserting/deleting at the beginning of the array?
 * ? O(n)
 */

/********************* */

/*
! Given an integer array A of size N and an integer B, you have to return the same array after rotating it B
! times towards the right.
? 1 <= N <= 105
? 1 <= A[i] <=10^9
? 1 <= B <= 10^9
 */
function rotate(A, B) {
    reverseArrayWithRange(A, 0, A.length - 1); // reverse origional array.
    reverseArrayWithRange(A, 0, B - 1);
    reverseArrayWithRange(A, B, A.length - 1);
    console.log('rotated array ', A);
}
rotate([1, 2, 3, 4, 5], 1); //   [5, 1, 2, 3, 4]
rotate([1, 2, 3, 4, 5], 5); //  [1, 2, 3, 4, 5]

rotate([1, 2, 3, 4, 5], 6); //  [undefined, 1, 2, 3, 4, 5]

/* If B is greater than array.length then above program gives wrong result.
rotate([1, 2, 3, 4, 5], 5);  gives result ->  [1, 2, 3, 4, 5], So Now rotate one more time means 6th times
>  [5, 1, 2, 3, 4] & this result is same as first rotation.
Means we have to use modular technique here Like B = B % Array.length */

function rotate1(A, B) {
    B = B % A.length;
    reverseArrayWithRange(A, 0, A.length - 1); // reverse origional array.
    reverseArrayWithRange(A, 0, B - 1); // reverse 0 to B-1
    reverseArrayWithRange(A, B, A.length - 1); // reverse B to n-1
    console.log('rotated array ', A);
}
rotate1([1, 2, 3, 4, 5], 6); //[5, 1, 2, 3, 4]

/********************* */

// called from run1
function run2(arr) {
    arr[3] = 98;
    return;
}

function run1() {
    const arr = [10, 20, 30, 40, 50];
    run2(arr);
    console.log(arr[3]);
}
run1(); // 98 because array works with call by references.


//! You are given an integer array A. You have to find the second largest element/value
//!in the array or report that no such element exists with -1.


//@ TLE Error for large set of data. 
function secondLargestElement(arr) {
    arr = [...new Set(arr)]; // first remove duplicate by using Set data structure.
    if (arr.length < 2) {
        console.log(arr, -1)
        return -1;
    }
    arr.sort((a, b) => parseInt(a) - parseInt(b)); // sort array

    console.log(arr, arr[arr.length - 2]) // return second last element
    return arr[arr.length - 2];
}
// secondLargestElement([])
// secondLargestElement([3])
// secondLargestElement([3, 3])
// secondLargestElement([3, 3, 1, 1, 1, 2, 3, 2, 3, 2])
// secondLargestElement([1, 2, 2, 3, 2, 4]);
secondLargestElement([3, 2, 4, 5, 6, 1, 1, 1, 1, 3, 5, 6, 78, 9, 9, 12, 3, 3, 5, 6, 5, 12, 23, -2, -4, -3]);
secondLargestElement([13, 7, 16, 18, 14, 17, 18, 8, 10])

/* secondLargestElement(
    [771682316, 941109598, 576418705, 577696440, 540309450, 809680924, 509204729, 17284079, 323527868, 973170623, 305709455, 806717261, 162558239, 689875747, 38223430, 542123181, 184572408, 383786202, 659252930, 449123973, 302111888, 175268818, 430712654, 549241251, 107189291, 82265497, 516552827, 237510804, 157886714, 242260070, 745641327, 546683852, 836716303, 624880477, 623952795, 473843387, 878024940, 559295994, 121992633, 540699706, 517610235, 550079445, 194305769, 398431689, 529515036, 591462739, 864464438, 57534727, 27084066, 850083923, 930554438, 588663537, 84264313, 405517113, 155947377, 266854189, 577724916, 371356522, 897119657, 453793360, 797078758, 259757541, 6012760, 788370245, 598089547, 822783037, 342567576, 479517629, 291921152, 946049026, 186582240, 486720125, 441504489, 368128711, 634221332, 596716324, 10932158, 521524288, 331519125, 576664653, 526205285, 551489279, 447879114, 564749194, 366477735, 720650598, 93013240, 981065660, 350773521, 120396796, 477543093, 327103322, 713837730, 328746105, 394482167, 921717563, 582651823, 511127748, 806542885, 10333250, 853367073, 531766594, 506504226, 427338857, 50430863, 380524537, 970107046, 559493543, 132717311, 759200626, 472951940, 376212029, 244002410, 615741316, 219785891, 368293799, 48059888, 849918491, 150148862, 920973146, 742332058, 217369257, 913567089, 349246729, 980148720, 560154404, 472908454, 293626602, 404016908, 173286235, 943266649, 809909488, 712499874, 423308353, 845884851, 325788565, 896977352, 575179715, 132374428, 734264147, 560004550, 929544968, 514531248, 215776261, 645253904, 228833078, 749884583, 460731818, 317231155, 243096777, 868625979, 326232838, 370788394, 334854369, 69538503, 15170288, 357977283, 498906342, 35455050, 229443760, 477337238, 12911979, 807751030, 257214181, 666163304, 890956736, 222579233, 549127118, 98860903, 837925351, 883271815, 294509530, 641279279, 364151999, 461366767, 364798954, 936512647, 493508546, 29805596, 71481796, 587087654, 887697654, 148226880, 482827597, 609160075, 446924276, 348204923, 858939236, 151782592, 844167970, 761281610, 810064616, 996194649, 162294593, 828980294, 61390446, 442824962, 273127771, 339464712, 664831469, 108863798, 567119008, 137704334, 705791268, 347941175, 876746399, 866031024, 278893386, 743282898, 342981251, 449894530, 902865711, 172748218, 102693610, 120642976, 76864164, 123811342, 508402060, 541261151, 97577244, 116703848, 331056302, 930412121, 885031537, 633410829, 71246550, 365881627, 500577504, 325496499, 821205466, 742925721, 697544161, 32995527, 162702226, 527551074, 568015551, 699127907, 243564183, 738169083, 87207058, 838639210, 436245674, 280530963, 880037384, 240830104, 318460834, 691331491, 161366938, 239098770, 681894912, 762142646, 819408452, 905662749, 643816406, 334579430, 624547324, 849719827, 752271918, 926168003, 300809668, 465059053, 262709819, 577071016, 197360844, 280224726, 359805584, 962018950, 651262917, 567984406, 721239982, 506001788, 586992123, 783588921, 615606521, 485920462, 919289965, 851440613, 147726628, 712536057, 326002864, 416423559, 62274157, 448936185, 558923175, 857345461, 39828972, 620745575, 568935704, 313575400, 477932993, 168285723, 59361084, 13931213, 355818645, 599615433, 911748505, 548859303, 934941421, 164454866, 14372863, 165699728, 227114774, 151928581, 652684274, 904534430, 405437315, 482185129, 222246575, 828917558, 363125935, 35891168, 944426714, 65757043, 595228520, 136402830, 102107935, 310011430, 290743981, 920040044, 5892120, 859422844, 464041039, 139807558, 275557299, 158391363, 563430558, 553085117, 539766994, 840671441, 919404459, 384612188, 207130128, 410205919, 451712483, 307775992, 658734123, 136326942, 391877597, 250326050, 809316805, 407268094, 760774589, 321952875, 399439384, 822001743, 806850461, 545578556, 435013710, 301882230, 900174433, 840879420, 784641663, 322226482, 963124131, 417300490, 138061487, 91475166, 487482356, 826518836, 920772681, 124353853, 793813612, 405644615, 1605973, 604048236, 214713729, 330284141, 732090585, 870666425, 283569523, 80801228, 394484296, 23077101, 27834027, 940890643, 842435674, 222771629, 168617740, 784961316, 226162088, 815524596, 566241977, 619317615, 246309974, 574476740, 150760727, 510172249, 929388557, 943712405, 704685647, 305261240, 115738820, 934924637, 222472988, 786190931, 211784044, 747650612, 558333725, 907554570, 415017736, 182167346, 507587114, 847710087, 757089604, 987999432, 116832312, 523413632, 592873853, 422775167, 822325025, 969929959, 171666315, 188378292, 182587014, 42739738, 102824045, 166884276, 213941205, 185514534, 112361817, 4416250, 269818422, 986991830, 83856701, 664384153, 128160843, 189841171, 198908555, 640763926, 278510470, 730029226, 165969974, 712669931, 150871573, 149472617, 538334127, 918178383, 740429461, 908038084, 478771959, 843639014, 171510124, 18069024, 630001621, 900498223, 517146381, 825753846, 735455944, 369590195, 970390714, 705592999, 992779913, 109061024, 136289952, 287707560, 174852774, 879213632, 251276151, 157491224, 516347297, 2801253, 677643002, 132849595, 760024723, 409408414, 316175063, 293152905, 692249776, 272992713, 464283795, 668739924, 171886088, 63505485, 642748487, 707061233, 519343224, 515352151, 692654634, 866118140, 728401050, 965675937, 256552733, 761272172, 801218761, 782287813, 485121089, 118624068, 81458399, 777388601, 556409311, 653492631, 525383216, 537020091, 330630566, 614923097, 651385798, 45380800, 8514208, 766468454, 359583413, 350684453, 41046803, 380011523, 467638799, 683539889, 346053630, 179248145, 957442972, 347358374, 943705401, 975264748, 466943810, 720634437, 666664791, 165694782, 318884015, 136481564, 435370140, 67270926, 92193074, 962518411, 187589933, 865060599, 878855365, 981883418, 316650491, 642955849, 115663279, 132279973, 463157292, 258928174, 535450153, 652794646, 97367222, 960441991, 215338297, 461688440, 177714429, 837849017, 375650976, 407789757, 461645733, 631885459, 606293113, 83603974, 705439457, 77567668, 595471523, 872173585, 197898737, 396560786, 454379365, 863142044, 962902260, 656599348, 371801462, 276375838, 496848275, 188714600, 184115941, 233940872, 258070854, 33159364, 358389525, 861144046, 734896613, 251388328, 994208065, 976494342, 106993029, 55115867, 573512401, 961416430, 123680877, 602012113, 891058229, 841363233, 573715566, 511220358, 611834254, 254902295]
) */


//@ Solved with two parellel for loop, First find largest number and then find second largest number.
//@ Incase of kth largest number we need to use heap data structure, that will do in future class.
function secondLargestElement1(arr) {
    let max = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    let secondMax = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > secondMax && arr[i] < max) {
            secondMax = arr[i];
        }
    }
    console.log('secondLargestElement1', max, secondMax)
}
secondLargestElement1([13, 17, 16, 18, 14, 17, 18, 8, 10])
secondLargestElement1([13, 13])
secondLargestElement1([1, 1, 2])

//! remove duplicate items from an array with space complexity O(1) - no idea??

// Space C - O(n)
function removeDuplicate(arr) {
    const out = []; // creating extra space
    for (let i = 0; i < arr.length; i++) {
        if (!out.includes(arr[i])) {
            out.push(arr[i]);
        }
    }
    console.log(out)
    return out;
}
removeDuplicate([1, 1, 2, 2, 1, 3, 4, 3, 6])




//! Return Unique number of elements from an sorted array.
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

/**
 * HINT -
They don't really want you to remove the duplicates. They want you to sort the uniques at the front, then return the length of the sorted part. Behind the scenes, they slice the array at the length you give them and the result of that is what they check.
 */

function removeDuplicate1(arr) {
    if (arr.length < 1) {
        return 0;
    }
    let c = 0;
    for (let i = 1; i < arr.length; i++) {  // started from index 1 because var c is already on 0th index.
        console.log(arr[c], arr[i])
        if (arr[c] != arr[i]) {
            arr[++c] = arr[i];
        }
    }
    console.log(c + 1, arr)
    return c + 1;
}
removeDuplicate1([4, 3, 1, 3]) // not worked because array is not sorted.
removeDuplicate1([4, 4, 4, 3, 2, 2, 1]) // 4



//! Check how pre and post increment works in arrays index.

function run3() {
    const a = [];
    let i = 0;
    a[i] = 1;
    a[++i] = 2; // i will increase first. i = 1;
    a[++i] = 3; // i will increase first. i = 2;
    a[i++] = 4; // First assignment will work on i = 2, then i will increse to 3 .
    console.log(a);
    return a;
}
run3(); // [1, 2, 4]


/********************** */


/**
 * You are given an integer array A of length N.
You are also given a 2D integer array B with dimensions M x 2, where each row denotes a [L, R] query.
For each query, you have to find the sum of all elements from L to R indices in A (1 - indexed).
More formally, find A[L] + A[L + 1] + A[L + 2] +... + A[R - 1] + A[R] for each query.

1 <= N, M <= 10^3
1 <= A[i] <= 10^5
1 <= L <= R <= N

A = [1, 2, 3, 4, 5]
B = [[1, 4], [2, 3]]
output > [10, 5]
 */

//@ 1-indexed problem -
function sumOfQueriesElements(A, B) {
    const sum = [];
    for (let i = 0; i < B.length; i++) {
        let temp = 0;
        let [l, r] = B[i];
        while (l <= r) {
            temp += A[l - 1];
            l++;
        }
        sum.push(temp);
    }
    console.log(sum);
    return sum;
}
sumOfQueriesElements([1], [[1, 1]]) // [1]
sumOfQueriesElements([1, 2], [[1, 2], [2, 2]]) // [3,2]
sumOfQueriesElements([1, 2, 3], [[1, 2], [1, 3]]) // [3,6]

//? using prefix sum
function sumOfQueriesElementsUsingPF(A, B) {
    const sum = [];
    const pf = [];
    pf[0] = A[0]; // first item
    for (let i = 1; i < A.length; i++) {
        pf[i] = pf[i - 1] + A[i];
    }
    for (let j = 0; j < B.length; j++) {
        const [l, r] = B[j];
        if (l === 1) {
            sum.push(pf[r - 1])
        } else {
            sum.push(pf[r - 1] - pf[l - 1 - 1]) // formula is > pf[r] - pf[l-1], this is 1-indexed problem so did -1 aswell.
        }
    }
    console.log(sum);
    return sum;
}
sumOfQueriesElementsUsingPF([1, 2, 3], [[1, 2], [1, 3], [3, 3], [1, 1]]) //[3, 6, 3, 1]
sumOfQueriesElementsUsingPF([1], [[1, 1]]) //[1]
sumOfQueriesElementsUsingPF([1, -1], [[1, 2]]) //[1]


/*********************************** */

//! Time to equality

/**
Given an integer array A of size N. In one second, you can increase the value of one element by 1.
Find the minimum time in seconds to make all elements of the array equal.

1 <= N <= 1000000
1 <= A[i] <= 1000

Return an integer denoting the minimum time to make all elements equal.

A = [2, 4, 1, 3, 2]
output - 8
Exp: We can change the array A = [4, 4, 4, 4, 4]. The time required will be 8 seconds.
 */

function timeToEquality(A) {
    const max = Math.max(...A) // O(n)
    let time = 0;
    let i = 0;
    while (i < A.length) {
        time += max - A[i];
        i++;
    }
    console.log(time);
    return time;
}
timeToEquality([2, 4, 1, 3, 2]) // 8
timeToEquality([2]) // 0
timeToEquality([2, 2]) // 0
timeToEquality([2, -2]) // 4


/**************************************************** */

//! Linear Search - Multiple Occurences

// Given an array A and an integer B, find the number of occurrences of B in A.
//  A = [1, 2, 2], B = 2 output > 2


function checkOccurences(A, B) {
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        if (A[i] == B) {
            count++;
        }
    }
    console.log(A, B, count)
}
checkOccurences([1, 2, 2], 2)
checkOccurences([2, 2], 2)
checkOccurences([3, 2, 4, 5, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 3, 6], 6)
