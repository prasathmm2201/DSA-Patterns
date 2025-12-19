// k-diff pair same side pointer (i = 0 , j = 1) find diff if the diff < k j++ , diff > k i++ , diff == k count++ and move i and j to next different number
function kDiff(arr , k){
    let i=0 , j = 1 , count = 0
    
    while(i < arr.length && j < arr.length){
        const diff = arr[j] - arr[i]
        if(i === j){
            j++
            continue;
        }
        if(diff < k){
            j++
        }
        else if(diff > k){
            i++
        }
        else if(diff === k){
            count++
            const left = arr[i] , right = arr[j]
            while(i < arr.length && arr[i] === left) i++
            while(j < arr.length && arr[j] === right) j++
        }
    }
    return count
}
const a = [3,1,4,1,5].sort((a , b)=> a - b)
console.log(kDiff(a, 2))

// dutch flag (low , mid , hign - low < mid < high)
function dutchFlag(arr){
    let low = 0 , mid = 0 , high = arr.length - 1
    
    while(mid <= high){
        if(arr[mid] === 0){
            [arr[low] , arr[mid]] = [arr[mid] , arr[low]]
            low++
            mid++
        }
        else if(arr[mid] === 1){
            mid++
        }
        else{
            [arr[mid] , arr[high]] = [arr[high] , arr[mid]]
            high--
        }
    }
    return arr
}
console.log(dutchFlag([0, 1, 2, 0, 1, 2]))


// one pointer (one is reader and another is writer)
function removeDuplicates(arr) {
    let wr = 1
    for (let read = 1; read < arr.length; read++) {
        if (arr[read] !== arr[wr - 1]) {
            arr[wr] = arr[read]
            wr++
        }
    }
    arr.length = wr
    return arr
}
console.log(removeDuplicates([1, 1, 2, 2, 3]))

// move zero read and write swap
function moveZero(arr) {
    let i = 0
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] !== 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++
        }
    }
    console.log(i)
    return arr
}
console.log(moveZero([2, 0, 1, 0, 3, 0, 4]))

// max subarray sum (if sum < 0 reset sum to 0) check which is max currsum + arr[i] and currsum  
function maxSubarray(arr){
    let curSum = arr[0]
    let maxSum = arr[0]
    
    for(let i=1; i < arr.length; i++){
        curSum = Math.max(arr[i] , curSum + arr[i])
        maxSum = Math.max(maxSum , curSum)
    }
    return maxSum
}
console.log(maxSubarray([-2,1,-3,4,-1,2,1,-5,4]))

// sub array with k
// count sub array reader m writer pointer and sum the currvalue if the val > k move l and reduce the sum
// fixed size window (sum , max, avg)
function countSubarray(arr , k){
    let i = 0 , sum = 0 , count = 0
    for(let j=0; j < arr.length; j++){
        sum+=arr[j]
        while(sum >= k){
            sum-= arr[i]
            i++
        }
        count+= j - i + 1
    }
    return  count
}
console.log(countSubarray([1,2,3] , 5))

// max subarray in circular array MAX(maxsum , total sum - minsum)
function circularmax(arr){
    let totalSum = 0
    let maxSum = 0 , curMax = 0
    let minSum = 0 , curMin = 0
    
    for(let i=0; i < arr.length; i++){
        totalSum+=arr[i]
        
        curMax = Math.max(arr[i] , curMax + arr[i])
        maxSum = Math.max(curMax , maxSum)
        
        curMin = Math.min(arr[i] , curMin + arr[i])
        minSum = Math.min(minSum , curMin)
    }
    
    if(maxSum < 0){
        return maxSum
    }
    return Math.max(maxSum , totalSum - minSum)
}

console.log(circularmax([5, -3, 5]))

// min diff - diff between to elements if which one is min update the min and pair
function minDiff(arr){
    arr.sort((a , b)=> a - b)
    let min = Infinity , pair = []
    
    for(let i = 1 ; i < arr.length; i++){
        const diff = arr[i] - arr[i - 1]
        if(diff < min){
            min = diff
            pair = [arr[i] , arr[i-1] ]
        }
    }
    return pair
}
console.log(minDiff([7,1,5,3,6,4]))

// max Diff (find min price so far and profir = arr[i] - minprice)
function maxDiff(arr){
    let profit = -Infinity , minPrice = arr[0]
    
    for(let i=1; i < arr.length; i++){
        profit = Math.max(profit , arr[i] - minPrice)
        minPrice = Math.min(minPrice , arr[i])
    }
    
    return profit
}
console.log(maxDiff([7,1,5,3,6,4]))

// l and r met any condition increase the l (longest unrepeated substring)
function longestSubstring(str){
    const s = str.split("")
    const v = new Set()
    let j = 0
    let maxLen = 0
    let start = 0

    
    for(let i=0; i < s.length; i++){
        while(v.has(str[i])){
            v.delete(str[j])
            j++
        }
        v.add(str[i])
        if(i - j + 1 > maxLen){
            maxLen = i - j + 1
            start = j
        }
    }
    return s.substring(start , start + maxLen)
}
console.log(longestSubstring("aaab"))

// longest substring
function longestPalidrome(s){
    let res = ""
    for(let i=0; i < s.length; i++){
        let l = i , r = i
        while(l >=0 && r < s.length && s[l] === s[r]){
            if(r - l - 1 > res.length){
                res = s.substring(l , r + 1)
            }
            l--
            r++
        }
        
        
          l = i , r = i + 1
        while(l >=0 && r < s.length && s[l] === s[r]){
            if(r - l - 1 > res.length){
                res = s.substring(l , r + 1)
            }
            l--
            r++
        }
    }
    
    
    return res
}
console.log(long("babad"))

// at most K distinct (count of)
function AtK(arr , k){
    const map = new Map()
    let i =0 , count=0
    
    for(let j=0; j < arr.length; j++){
        map.set(arr[j] , (map.get(arr[j]) || 0) + 1)
        while(map.size > k){
            map.set(arr[i] , (map.get(arr[i]) || 0) - 1)
            if(map.get(arr[j] === 0)) map.delete(arr[i])
            i++
        }
        
        count+= j - i + 1
    }
    
    return count
}
console.log(AtK([1,2,1,2,3], 2)) // 12

// at most K distinct (count of) count
function AtExactK(arr, k) {
    function helper(k) {
        const map = new Map()
        let i = 0, count = 0

        for (let j = 0; j < arr.length; j++) {
            map.set(arr[j], (map.get(arr[j]) || 0) + 1)
            while (map.size > k) {
                map.set(arr[i], (map.get(arr[i]) || 0) - 1)
                if (map.get(arr[i] === 0)) map.delete(arr[i])
                i++
            }

            count += j - i + 1
        }
    }

    return helper(k) - helper(k - 1)
}
console.log(AtExactK([1, 2, 1, 2, 3], 2)) // 12

//longest substring with at most k distict (longest)
function atMostString(str , k){
    let map = new Map() , count = 0 , j = 0
    for(let i=0; i < str.length; i++){
        map.set(str[i] , (map.get(str[i]) || 0) + 1)
        
        while(map.size > k){
            map.set(str[j] , (map.get(str[j]) || 0) - 1)
            if(map.get(str[j]) === 0) map.delete(str[j])
            j++
        }
        
        count = Math.max(count , i - j + 1)
    }
    console.log(map)
    return count
}
console.log(atMostString("eceba" , 2))

// max substrin at exact substring
function longestSubstringWithKDistinct(str, k) {
    let map = new Map();
    let j = 0, maxLen = 0;

    for (let i = 0; i < str.length; i++) {
        map.set(str[i], (map.get(str[i]) || 0) + 1);

        while (map.size > k) {
            map.set(str[j], map.get(str[j]) - 1);
            if (map.get(str[j]) === 0) map.delete(str[j]);
            j++;
        }

        if (map.size === k) {
            maxLen = Math.max(maxLen, i - j + 1);
        }
    }
    return maxLen;
}
console.log(longestSubstringWithKDistinct("eceba" , 2))


// permutation need to track pending and leaved letters in map
function permutation(s , p){
    const map = new Map()
    
    for(const l of p){
        map.set(l , (map.get(l) || 0) + 1)
    }
    
    let left = 0 , matched = 0
    
    for(let right=0; right < s.length; right++){
        const rChar = s[right]
        
        if(map.has(rChar)){
              map.set(rChar , map.get(rChar) - 1)
              if(map.get(rChar) === 0) matched++
        }
        
        if(right >= p.length - 1){
            if(matched === map.size) return true
            
            const lChar = s[left]
            left++
            
            if(map.has(lChar)){
                if(map.get(lChar) === 0) matched--
                 map.set(lChar , map.get(lChar) + 1)
            }
        }
    }
    
    return false
}
console.log(permutation("prasath" , "ra"))


// two letters are anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const map = new Map();

    for (let ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }

    for (let ch of t) {
        if (!map.has(ch)) return false;
        map.set(ch, map.get(ch) - 1);
        if (map.get(ch) < 0) return false;
    }

    return true;
}


// min / max window
function minWindow(s , t){
    const map = new Map()
    let left = 0 , min = Infinity , matched = 0
    
    for(const chr of t){
        map.set(chr , (map.get(chr) || 0 ) + 1)
    }
    
    for(let right=0; right < s.length; right++){
        if(map.has(s[right])){
            map.set(s[right] , map.get(s[right]) - 1)
            if(map.get(s[right]) === 0) matched++
        }
        
        while(matched === t.length){
            if(right - left + 1 < min){
                min = right - left + 1
                start = left
            }
            const lChar = s[left]
            left++
            
            if(map.has(lChar)){
                if(map.get(s[right]) === 0) matched-- 
                map.set(s[right] , map.get(s[right]) + 1)
            }
        }
    }
    
    return min === Infinity ? "" : s.substring(start , start +min )
}
console.log(minWindow("ADOBECODEBANC" , "ABC"))

// happy number (cycle dedection)
function isHappy(n){
    function next(num){
        let sum = 0 
        while(num > 0){
            const d = num % 10
            sum+= d * d
            num = Math.floor(num / 10)
        }
        return sum
    }
    let slow = n
    let fast = next(n)
    
    while(fast !== 1 && slow !== fast){
        slow = next(slow)
        fast = next(next(fast))
    }
    return fast === 1
}
console.log(isHappy(19))


// palidrome check (reverse the second half and compare that with first half)
function reverse(head){
   let curr = head
   let prev = null
   
   while(!current){
       const next = curr.next
       curr.next = prev
       prev = curr
       curr = next
   }
   return prev
}
function checkPalidrome(head){
    let slow = head
    let fast = head.next
    
    while(fast !== null && fast.next !== null){
        slow = slow.next
        fast = fast.next.next
    }
    
    // reverse secode falf
    const second = reverse(slow)
    const first = head
    
    while(second !== null){
        if(fist.val !== second.val){
            return false
        }
        first = first.next
        second = second.next
    }
    return false
    
}

// length of the cycle detection
function cycleLength(node){
    let curr = node
    let count = 1
    
    while(curr !== node && curr.next){
        curr=curr.next
        count++
    }
    return count
}
function cycle(n){
    let slow = n
    let fast = n.next
    let count = 0
    
    while(fast !== null && fast.next !== null){
        slow = slow.next
        fast = fast.next.next
        count++
        
        if(fast === slow){
            return cycleLength(slow)
        }
    }
    return false;
}

console.log(cycle(LinkedList))

// valid paligram one character remove
function validPaligram(s){
    let l = 0 , r = s.length - 1
    
    while(l < r){
        if(s[l] !== s[r]){
            return isPal(l+1, r , s) || isPal(l , r-1 , s)
        }
        l++
        r--
    }
    return true
}

function isPal(i,j ,s){
    while(i < j){
        if(s[i] !== s[j]){
            return false
        }
        i++
        j--
    }
    return true
}
console.log(validPaligram("abca"))

// max window (monotonic queue) sliding window max
function monotonicQueue(arr , k){
  const deque = []
  const result = []

  for(let i=0; i < arr.length; i++){
    
    if(deque.length && deque[0] === k - i){
        deque.shift()
    }

    if(deque.length && arr[i] >= arr[deque[deque.length - 1]]){
        deque.pop()
    }

    deque.push(i)

    if(i >= k - 1){
        result.push(arr[deque[0]])
    }
  }
  return result
}

console.log(monotonicQueue([4, 2, 12, 3], 2));
