function cyclicSort(arr){
    let i = 0
    while(i < arr.length && i >= 0){
        const correctIndex = arr[i]

        if(arr[i] < arr.length && arr[correctIndex] !== arr[i]){
            [arr[i] , arr[correctIndex]] = [arr[correctIndex] , arr[i]]
        }
        else{
            i++
        }
    }
    return arr
}

console.log(cyclicSort([1,0,4,3,2]))


function findDubMissing(arr){
    let i = 0
    const dublicates = [] , missing = []

    while(i < arr.length){
        const correctIndex = arr[i]
        if(arr[i] < arr.length && arr[correctIndex] !== arr[i]){
            [arr[i] , arr[correctIndex]] = [arr[correctIndex] , arr[i]]
        }
        else{
            if(i !== correctIndex && !dublicates.includes(i)){
                dublicates.push(i)
            }
            i++
        }
    }

    for(let i=0; i < arr.length; i++){
        if(arr[i] !== i){
            missing.push(i)
        }
    }

    // for 1 to N
  for(let i = 0; i < arr.length; i++){
    if(arr[i] !== i + 1){
        dublicates.push(arr[i])
        missing.push(i+1)
        break;
    }
  }

    return {
        dublicates,
        missing
    }
}
console.log(findDubMissing([1,2,2,4]))


// find first positive number cor = arr[i] - 1 , arr[i] !== i + 1 
function firstPositiveFirstNumber(arr){
    let i = 0

    while(i < arr.length){
        const correctIndex = arr[i] - 1
        if(arr[i] <= arr.length && arr[correctIndex] !== arr[i] && arr[i] > 0){
            [arr[i] , arr[correctIndex]] = [arr[correctIndex] , arr[i]]
        }
        else{
            i++
        }
    }

    for(let i=0; i < arr.length; i++){
        if(arr[i] !== i+1){
            return i+1
        }
    }
}
console.log(firstPositiveFirstNumber([3,4,-1,1]))

// find kth element (actual binary search) formula to check missing before that arr[mid] - (mid + 1)
function findKthPosition(arr , k){
    let low = 0 , high = arr.length -1

    while(low <= high){
        const mid = Math.floor((low + high) / 2)

        const missing = arr[mid] - (mid + 1)

        if(missing < k){
            low = mid + 1
        }
        else{
            high = mid - 1
        }
    }

    return low + k
}

console.log(findKthPosition([2,3,4,7,11] , 5))

// find kth elelement by using linear + two pointer
function kthFirstElement(arr , k){
    let current = 1
    let missingCount = 0
    let i = 0

    while(missingCount < k){
        if(i < arr.length && arr[i] === current){
            i++
        }
        else{
            missingCount++
            if(missingCount === k) return current
        }
        current++
    }
    return current
}
console.log(kthFirstElement([2,3,4,7,11] , 5))


// Split Array     - Largest Sum Minimize maximum partition sum
// Allocate Books	- Minimize max pages per student
// Ship Packages	- Minimize max ship capacity
// Painter’s Partition	- Minimize max time
// Aggressive Cows	- Maximize minimum distance

// capacity - allocate book , shiping pacjage , painter , split array
// speed - koko
// distance - aggressive cows (maximie the minimize) , mangnetic force between two balls , router placement
// time - painter

function cyclicSort(arr) {
    let i = 0
    while (i < arr.length) {
        const correctIndex = arr[i]

        if (arr[i] < arr.length && arr[correctIndex] !== arr[i]) {
            [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]]
        }
        else {
            i++
        }
    }
    return arr
}

console.log(cyclicSort([1, 0, 4, 3, 2]))


function findDubMissing(arr) {
    let i = 0
    const dublicates = [], missing = []

    while (i < arr.length) {
        const correctIndex = arr[i]
        if (arr[i] < arr.length && arr[correctIndex] !== arr[i]) {
            [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]]
        }
        else {
            if (i !== correctIndex && !dublicates.includes(i)) {
                dublicates.push(i)
            }
            i++
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i) {
            missing.push(i)
        }
    }

    // for 1 to N
    // for 1 to N
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) {
            dublicates.push(arr[i])
            missing.push(i + 1)
            break;
        }
    }

    return {
        dublicates,
        missing
    }
}
console.log(findDubMissing([1, 2, 2, 4]))

// find first positive number cor = arr[i] - 1 , arr[i] !== i + 1 
function firstPositiveFirstNumber(arr) {
    let i = 0

    while (i < arr.length) {
        const correctIndex = arr[i] - 1
        if (arr[i] <= arr.length && arr[correctIndex] !== arr[i] && arr[i] > 0) {
            [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]]
        }
        else {
            i++
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) {
            return i + 1
        }
    }
}
console.log(firstPositiveFirstNumber([3, 4, -1, 1]))

// find kth element (actual binary search) formula to check missing before that arr[mid] - (mid + 1)
function findKthPosition(arr, k) {
    let low = 0, high = arr.length - 1

    while (low <= high) {
        const mid = Math.floor((low + high) / 2)

        const missing = arr[mid] - (mid + 1)

        if (missing < k) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }

    return low + k
}

console.log(findKthPosition([2, 3, 4, 7, 11], 5))

// find kth elelement by using linear + two pointer
function kthFirstElement(arr, k) {
    let current = 1
    let missingCount = 0
    let i = 0

    while (missingCount < k) {
        if (i < arr.length && arr[i] === current) {
            i++
        }
        else {
            missingCount++
            if (missingCount === k) return current
        }
        current++
    }
    return current
}
console.log(kthFirstElement([2, 3, 4, 7, 11], 5))

// partition by range we  < pivot | pivot | pivot >
function partitionRange(arr, L, R) {
    let low = 0, mid = 0, high = arr.length - 1

    while (mid <= high) {
        if (arr[mid] < L) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]]
            low++
            mid++
        }
        else if (arr[mid] > R) {
            [arr[high], arr[mid]] = [arr[mid], arr[high]]
            high--
        }
        else {
            mid++
        }
    }
    return arr
}
console.log(partitionRange([1, 4, 3, 2, 5, 6, 3, 8], 3, 5))

// quick sort low, mid , high
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }

    const low = [], mid = [], high = []
    const pivot = arr[Math.floor(arr.length / 2)]

    for (const n of arr) {
        if (n < pivot) {
            low.push(n)
        }
        else if (n > pivot) {
            high.push(n)
        }
        else {
            mid.push(n)
        }
    }

    return [...quickSort(low), ...mid, ...quickSort(high)]
}
console.log(quickSort([1, 4, 3, 2, 5, 6, 3, 8]))

// find the kth element
function quickSelect(arr, k) {
    if (k < 1 || k > arr.length) throw new Error("Invalid kth element")
    if (arr.length === 1) return arr[0]

    let low = [], high = [], pivot = arr[arr.length - 1]

    for (let i = 0; i < arr.length - 1; i++) { // skip pivot itself
        const n = arr[i];
        if (n < pivot) low.push(n);
        else high.push(n);
    }

    if (k <= low.length) {
        return quickSelect(low, k)
    }
    else if (k === low.length + 1) {
        return pivot
    }
    else {
        return quickSelect(high, k - low.length - 1)
    }
}

console.log(quickSelect([7, 3, 9, 1, 5], 2))


function partition(arr, left, right) {
    const pivot = arr[right]
    let i = 0

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++
        }
    }

    [arr[right], arr[i]] = [arr[i], arr[right]]
    return i
}

function selection(arr, left, right, k) {
    const part = partition(arr, left, right)
    if (part === k) return arr[part]
    if (part < k) {
        return selection(arr, left, part - 1, k)
    }
    else {
        return selection(arr, part + 1, right, k)
    }
}

function quickSelect(arr, k) {
    return selection(arr, 0, arr.length - 1, k - 1)
}
console.log(quickSelect([7, 3, 9, 1, 5], 2))

// custom sorting
function mergeSort(arr, compare) {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSort(left, compare), mergeSort(right, compare), compare)
}
function merge(left, right, compare) {
    let i = 0, j = 0, result = []

    while (i < left.length && j < right.length) {
        if (compare(left[i], right[j]) <= 0) {
            result.push(left[i++])
        }
        else {
            result.push(right[j++])
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j))
}

console.log(mergeSort(["prem", "prasath", "sam"], (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" })))
const a = [new Date("2026-01-01"), new Date("2025-12-30")]
console.log(mergeSort(a, (a, b) => b.getTime() - a.getTime()))


function spiralTraversal(mat) {
    let top = 0, bottom = mat.length - 1, left = 0, right = mat[0].length - 1
    const result = []

    while (top <= bottom && left <= right) {
        // top
        for (let t = left; t <= right; t++) {
            result.push(mat[top][t])
        }
        top++


        // right
        for (let ri = top; ri <= bottom; ri++) {
            result.push(mat[ri][right])
        }
        right--

        // bottom
        for (let b = right; b >= 0; b--) {
            result.push(mat[bottom][b])
        }
        bottom--

        // left
        for (let l = bottom; l > 0; l--) {
            result.push(mat[l][left])
        }
        left++

        console.log(top, bottom, left, right)

    }
    return result
}

const mat = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

console.log(spiralTraversal(mat))
