function dynamicArray(n, queries) {
    // Write your code here
    const result = []
    const list = Array.from({length:n} , ()=>[])
    let lastAnswer = 0
    
    for(var [type , x , y] of queries){
        const idx = (x ^ lastAnswer) % n
        
        if(type === 1){
            list[idx].push(y)
        }
        if (type === 2){
            lastAnswer = list[idx][y % list[idx].length]
            result.push(lastAnswer)
        }
        
    }
    
    return result

}

function getQueen(n){
    const board = Array.from({length:n} , ()=> Array(n).fill('.'))
    const result = []
    
    function isSafe(row , col){
        // check horizontally
        for(let i=0; i < n; i++){
            if(board[i][col] === 'Q') return false
        }
        // check left diaglonal
        for(let i=row - 1 , j = col-1; i >=0 && j >=0 ; i-- , j--){
            if(board[i][col] === 'Q') return false
        }
        // check rihgt
        for(let i= row - 1 , j=col+1; i >=0 && j < n; i-- , j++){
             if(board[i][col] === 'Q') return false
        }
        return true
        
    }
    
    function place(row){
        if(row === n){
            result.push(board.map(r => r.join('')))
            return
        }
        for(let col=0; col < n; col++){
            if(isSafe(row , col)){
                board[row][col] = 'Q'
                place(row + 1)
            }
        }
    }
    place(0)
    return result
}
console.log(getQueen(4))

// island


/**
 * hourglass
 * mex
 * lastanswer
 * oxox game
 * 4 queens
 */

function numOfIsland(grid){
    const rows = grid.length
    const cols = grid[0].length
    let count = 0
    const direction = [[0,1],[0,-1],[1,0],[-1,0]]

    
    function def(row , col){
        if(row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === "0") return
        
        grid[row][col] = "0"
        
        def(row , col+1)
        def(row , col - 1)
        def(row+1 , col)
        def(row - 1 , col)
    }
    
    function bfs(r , c){
        const queue = [[r , c]]
        grid[r][c] = '0'
        
        while(queue.length){
            const [cr , cc] = queue.shift()
            for(const [dr , dc] of direction){
                const nr = cr + dr , nc = cc + dc
                if(nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === '1'){
                    grid[nr][nc] = '0'
                    queue.push([nr , nc])
                }
            }
        }
    }
    
    for(let r=0; r < rows; r++){
        for(let c=0; c < cols; c++){
            if(grid[r][c] === '1'){
                count++
                bfs(r , c)
            }
        }
    }
    return count
}

console.log(numOfIsland([
['1','1','0','0'],
['1','0','0','1'],
['0','0','1','1'],
]))



// total === sum
function Nsum(arr, target, N, start) {
    let result = []

    if (N < 2 || arr.length - N < start) return result

    if (N === 2) {
        let left = 0, right = arr.length - 1
        while (left < right) {
            const sum = arr[left] + arr[right]
            if (sum === target) {
                result.push([arr[left], arr[right]])
                left++
                right--
                while (left < right && arr[left] === arr[left - 1]) left++
                while (left < right && arr[right] === arr[right + 1]) right--
            }
            else if (sum < target) {
                left++
            }
            else {
                right--
            }
        }
    }

    for (let i = start; i < arr.length - N + 1; i++) {
        if (i > 0 && arr[i - 1] === arr[i]) continue

        const sum = Nsum(arr, target - arr[i], N - 1, i + 1)
        for (const a of sum) {
            result.push([arr[i], ...a])
        }
    }

    return result
}

console.log(Nsum([1, 4, 45, 6, 10, 8], 13, 3, 0))

// closets to target
function NcloseSum(arr, target, N, start) {

    if (N < 2 || arr.length - N < start) return closedSet

    if (N === 2) {
            let closedSet = Infinity

        let left = start, right = arr.length - 1
        while (left < right) {
            const sum = arr[left] + arr[right]
            if (Math.abs(sum - target) < Math.abs(closedSet - target)) {
                closedSet = sum
            }
            if (sum < target) {
                left++
            }
            else {
                right--
            }
        }
            return closedSet

    }

    let closedSet = Infinity
    
    for(let i=start; i <= arr.length - N; i++){
        const sum = NcloseSum(arr , target - arr[i] , N - 1, i+1)
        const total = arr[i] + sum

       if (Math.abs(total - target) < Math.abs(closedSet - target)) closedSet = total;

    }
    return closedSet
}

const ar = [10, 30, 20, 5]
console.log(NcloseSum(ar.sort((a,b)=> a -b), 25, 2, 0))


// less to sum
function nLess(arr, target, N, start) {
    if (N < 2 || arr.length - start < N) return []

    if (N === 2) {
        let res = []
        let left = start, right = arr.length - 1
        while (left < right) {
            const sum = arr[left] + arr[right]
            if (sum < target) {
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
console.log(nLess(arr.sort((a, b) => a - b), 13, 3 , 0));

// trapping water
function trapWater(arr){
let i = 0 , j =arr.length - 1 , lMax = 0, rMax = 0 , res = 0

while(i < j){
    if(arr[i] < arr[j]){
        if(arr[i] >= lMax){
            lMax = arr[i]
        }
        else{
            res+= lMax - arr[i]
        }
        i++
    }
    else{
        if(arr[j] >= rMax){
            rMax = arr[j]
        }
        else{
            res+= rMax - arr[j]
        }
        j--
    }
}
return res
}

console.log(trapWater([4,2,0,3,2,5]));

// container with water
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
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49

// rever array
function reverseVowel(str){
    const vowal = new Set(['a' , 'e' , 'i' , 'o' , 'u' , 'A' , 'E' , 'I', 'O', 'U'])
    const s = str.split('')
    let l = 0 , r = s.length

    while(l < r){
        if(!vowal.has(str[l])) l++
        else if(!vowal.has(str[r])) r--
        else{
            [s[l] , s[r]] = [s[r] , s[l]]
            l++ , r--
        }
    }
    return s.join('')
}
console.log(reverseVowel('programming'))

