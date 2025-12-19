/** When to use two pointer:
 * ordered + predictable + linear (only use if the array is sorted)
 * don't use if that negative number involved
 */

// Nsum == target (check pair and j < arr.ln - N + 1)
function Nsum(arr , target , N , start){
    if(N < 2 || arr.length - start < N) return []
    
    if(N === 2){
        let res = []
        let i = start , j = arr.length - 1
        while(i < j){
            const sum = arr[i] + arr[j]
            if(sum === target){
                res.push([arr[i] , arr[j]])
                i++
                j--
                while(i < j && arr[i] === arr[i-1]) i++
                while(i < j && arr[j] === arr[j+1]) j--
            }
            else if(sum < target){
                i++
            }
            else{
                j--
            }
        }
        return res
    }
    let result=[]
    
    for(let i=start; i < arr.length - N + 1;   i++){
        if(i > start && arr[i] === arr[i-1]) continue;
        const sum = Nsum(arr , target - arr[i] , N - 1 , i+1)
        for(const c of sum){
            result.push([arr[i] , ...c])
        }
    }
     return result

}
console.log(Nsum([1, 4, 45, 6, 10, 8].sort((a,b)=> a -b), 13, 3, 0))

// Nsum close to target (target - sum) j <= arr.ln - N)
function Ncloser(arr , target , N , start){
    if(N < 2 || arr.length  - start < N){
        return {res:[] , total:Infinity}
    }
    
    if(N === 2){
        let i=start , j=arr.length - 1 
        let res = [] , total = Infinity
        while(i < j){
            const sum = arr[i] + arr[j]
            if(Math.abs(target - sum) < Math.abs(target - total)){
                res = [arr[i] , arr[j]]
                total = sum
            }
            else if(sum < target){
                i++
            }
            else{
                j--
            }
        }
        return {res , total}
    }
    
    let res = Infinity , total = []
    for(let i=start; i <= arr.length - N; i++){
        const c = Ncloser(arr , target - arr[i] , N - 1, i+1)
        const sum = arr[i] + c.total
        if(Math.abs(target - sum) < Math.abs(target - res)){
            res = sum
            total = [arr[i] , ...c.res]
        }
    }
    return {res , total}
}

const ar = [10, 30, 20, 5]
console.log(Ncloser(ar.sort((a, b) => a - b), 25, 3, 0))


// Nsum less / greater to target (target - sum) j <= arr.ln - N)
function nLess(arr, target, N, start) {
    if (N < 2 || arr.length - start < N) return []

    if (N === 2) {
        let res = []
        let left = start, right = arr.length - 1
        while (left < right) {
            const sum = arr[left] + arr[right]
            if (sum < target) {
                 // counter+= right - left
                for (let j = right; j > left; j--) {
                    res.push([arr[left], arr[j]]);
                }
                left++
            }
            else {
                right--
            }
        }
        return res
    }

    let res = []
    for (let i = start; i <= arr.length - N; i++) {
        if (i > start && arr[i] === arr[i - 1]) continue
        const sum = nLess(arr, target - arr[i], N - 1, i + 1)
        for (const a of sum) {
            res.push([arr[i], ...a])
        }
    }

    return res

}

const arr = [1, 4, 45, 6, 10, 8]
console.log(nLess(arr.sort((a, b) => a - b), 13, 3, 0));

// N Grater
function nGrater(arr , target , N , start){
    if(N < 2 || arr.length - start < N){
        return {res:[] , output:0}
    }
    
    if(N === 2){
        let i = start , j = arr.length - 1
        let output = 0 , res = []
        while(i < j){
            const sum = arr[i] + arr[j]
            if(sum > target){
                output += j - i
                for(let k=i; k < j; k++){
                    res.push([arr[k] , arr[j]])
                }
                                j--

            }
            else{
                i++
            }
        }
        return {res , output}
    }
    
    let output = 0 , res = []
    for(let j=start ; j <= arr.length - N; j++){
        if(j > start && arr[j] === arr[j - 1]) continue;
        
        const g = nGrater(arr , target - arr[j], N - 1 , j+1)
        output+= g.output
        for(const s of g.res){
            res.push([arr[j] , ...s])
        }
    }
    return  {res , output}
}

console.log(nGrater([1, 4, 45, 6, 10, 8].sort((a, b) => a - b), 13, 3, 0));


// container with water (h * w) find the max area
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let max = 0;

    while (left < right) {
        const h = Math.min(height[left], height[right]);
        const width = right - left;
        const area = h * width;
        max = Math.max(max, area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max;
}
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49


// trapping water (h) find max else result += max - arr[i]
function trapWater(arr) {
    let i = 0, j = arr.length - 1, lMax = 0, rMax = 0, res = 0

    while (i < j) {
        if (arr[i] < arr[j]) {
            if (arr[i] >= lMax) {
                lMax = arr[i]
            }
            else {
                res += lMax - arr[i]
            }
            i++
        }
        else {
            if (arr[j] >= rMax) {
                rMax = arr[j]
            }
            else {
                res += rMax - arr[j]
            }
            j--
        }
    }
    return res
}
console.log(trapWater([4, 2, 0, 3, 2, 5]));


// reverse array
function reverseVowel(str) {
    const vowal = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
    const s = str.split('')
    let l = 0, r = s.length

    while (l < r) {
        if (!vowal.has(str[l])) l++
        else if (!vowal.has(str[r])) r--
        else {
            [s[l], s[r]] = [s[r], s[l]]
            l++, r--
        }
    }
    return s.join('')
}
console.log(reverseVowel('programming'))

// sorted square -crate a new empty array and fill from end of max square
function squaresort(arr){
    let i =0 , j = arr.length - 1,pos= arr.length -1 ,result = new Array(arr.length)
    
    while(i <= j){
        const lSquare = arr[i] * arr[i]
        const rSquare = arr[j] * arr[j]
        
        if(lSquare > rSquare){
            result[pos] = lSquare
            i++
        }else{
            result[pos] = rSquare
            j--
        }
        pos--
    }
    return result
}
console.log(squaresort([-7, -3, 2, 3, 11]))

// swap the based on the condition
function swapOdd(arr){
    let i =0 , j = arr.length
    
    while(i < j){
        while(i < j && arr[i] % 2 === 0) i++
        while(i < j && arr[j] % 2 !== 0) j--
        
        if(i < j){
            [arr[i] , arr[j]] = [arr[j] , arr[i]]
            i++
            j--
        }
    }
    
    return arr
}
console.log(swapOdd([1,2,3,4,5,6]))

// merge two sorted array ( get from end check which is greater and fill from end)
function mergeArray(arr1 , arr2){
    let i = arr1.length - 1
    let j = arr2.length - 1
    let k = arr1.length + arr2.length - 1
    
    while(i >= 0 && j >=0){
        if(arr1[i] > arr2[j]){
            arr1[k] = arr1[i]
            k--
            i--
        }
        else{
            arr1[k] = arr2[j]
            k--
            j--
        }
    }
    
    while(j >= 0){
        arr1[k] = arr2[j]
        j--
        k--
    }
    return arr1
}

console.log(mergeArray([0,1,3,5] , [2,4,6]))
