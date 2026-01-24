///////  ------------------- Fibonacci series
// iteration
function IterateFibonaci(n) {
    const series = [0, 1]
    for (var i = 2; i <= n; i++) {
        series.push(series[i - 1] + series[i - 2])
    }
    return series
}
console.log(IterateFibonaci(19))


function recursiveFibnoci(n, a, b, result) {
    if (n < 0) return result
    result.push(a)
    return recursiveFibnoci(n - 1, b, a + b, result)
}

console.log(recursiveFibnoci(19, 0, 1, []))


// Linked Lists 
class Node {
    constructor(data) {
        this.data = data;
        this.previous = null;
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0
    }
    addItemFirst(data) {
        const newNode = new Node(data)
        if (!this.head) return this.head = newNode
        newNode.next = this.head
        this.head = newNode
    }
    addLast(data) {
        const newNode = new Node(data)
        if (!this.head) {
            return this.head = newNode
        }
        let current = this.head
        let previous = null
        while (current.next) {
            previous = current
            current = current.next
        }
        current.next = newNode
        newNode.previous = current

    }
    addAtSpeificIndex(index, data) {
        const newNode = new Node(data)
        if (!index || index < 0) return Error("Give a valid index")
        if (index === 0) return this.addItemFirst(data)

        let current = this.head;
        let previous;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current.next;
            count++
        }
        newNode.next = current;
        newNode.previous = previous;
        previous.next = newNode;
    }
    getItems() {
        let current = this.head
        while (current) {
            // console.log(current.previous)
            current = current.next
        }
    }
}

const liked = new LinkedList()
liked.addItemFirst(1)
liked.addLast(0)
liked.addLast(2)
liked.addAtSpeificIndex(1, 2)

// 
liked.getItems()


// stack
class Stack {
    constructor() {
        this.stack = []
    }
    addItem(data) {
        this.stack.push(data)
    }
    removeItem(index) {
        if (!index) return this.stack.pop()
        return this.stack.splice(index, 1)

    }
    getItems() {
        return this.stack
    }

}
const play = new Stack()
play.addItem(1)
play.addItem(2)
play.addItem(3)
console.log(play.removeItem())
console.log(play.getItems())
console.log(play.removeItem())
console.log(play.getItems())
console.log(play.removeItem())
console.log(play.getItems())

// queue
class CircularQueue {
    constructor() {
        this.size = 4
        this.data = new Array(this.size)
        this.front = -1
        this.rear = -1
    }
    isFull() {
        return (this.front === 0 && this.rear === this.size - 1) || this.rear + 1 === this.front
    }
    resize() {
        const newSize = this.size * 2;
        const newData = new Array(newSize);

        let i = 0;
        let j = this.front;

        while (true) {
            newData[i] = this.data[j];
            if (j === this.rear) break;
            j = (j + 1) % this.size;
            i++;
        }

        this.data = newData
        this.size = newSize
        this.front = 0
        this.rear = i
    }
    enQueue(item) {
        if (this.isFull()) this.resize()
        if (this.front === -1) this.front = 0
        this.rear = (this.rear + 1) % this.size
        this.data[this.rear] = item

    }
    deQueue() {
        if (this.front === -1) return 'Empty'
        const item = this.data[this.front]
        if (this.front === this.rear) {
            this.front = this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }
        return item
    }
}
// prioritize queue
class PrioritizeQueue {
    constructor() {
        this.data = []
    }
    enQueue(element, priority) {
        const newItem = { element, priority }
        let added = false
        for (var i = 0; i < this.data.length; i++) {
            if (newItem.priority < this.data[i].priority) {
                this.data.splice(i, 0, newItem)
                added = true
                break;
            }
        }
        if (!added) {
            this.data.push(newItem)
        }
    }
}
//  ------------------------ X ----------------------------
// HashMap
class HashTable {
    constructor() {
        this.size = 4
        this.data = Array.from({ length: this.size }, () => [])
        this.count = 0
    }
    hash(key) {
        let hash = 0
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % this.size

    }
    resize() {
        let oldData = this.data
        this.size = this.size * 2
        this.data = Array.from({ length: this.size }, () => [])
        for (let bucket of oldData) {
            for (let [key, value] of bucket) {
                const index = this.hash(key)
                this.data[index].push([key, value])

            }
        }
    }
    enQueue(key, value) {
        if (this.count / this.size > 0.75) this.resize()
        const index = this.hash(key)
        console.log(index)
        this.data[index].push([key, value])
        this.count++
    }
    deQueue(key) {
        if (this.count === 0) return 'Empty'
        const hash = this.hash(key)
        const bucket = this.data[hash]
        const index = bucket.findIndex(a => a.key === key)
        if (index === -1) return "Not Found"
        bucket.splice(index, 1)
        this.count--
    }
}
// ------------------------- Tree -------------------------
class HashTree {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}
const t = new HashTree(10)
t.left = new HashTree(5)
// ----------------------- Graph ---------------------------
const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B", "F"],
    F: ["C", "E"]
}

function bef(start) {
    let queue = [start]
    let visited = new Set()
    let result = []

    while (queue.length) {
        const node = queue.shift()
        if (!visited.has(node)) {
            visited.add(node)
            result.push(node)
            queue.push(...queue[node])

        }
    }
    return result
}

function def(node, visited = new Set()) {
    if (!visited.has(node)) {
        visited.add(node)
        console.log(node)
        for (let neighbor of queue[node]) {
            def(neighbor, visited)
        }
    }
}

def('A')

// -------------- Searching algorithm -----------------------------
// Linear Search normal for loop
// Binear Search
function binarySearch(arr, find) {
    let left = 0
    let right = arr.length - 1

    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === find) {
            return mid
        }
        else if (arr[mid] < find) {
            left = mid + 1
        }
        else if (arr[mid] > find) {
            right = mid - 1
        }
        else {
            return 'None'
        }
    }
}
// 2D Array search
function search2D(arr, target) {
    let rows = arr.length, cols = arr[0].length
    let row = 0, col = cols - 1

    while (row < rows && cols >= 0) {
        if (arr[row][col] === target) {
            return [row, col]
        }
        else if (arr[row][col] > target) {
            col--
        }
        else if (arr[row][col] < target) {
            row++
        }
        else {
            return [-1, -1]
        }
    }

}
let matrix = [
    [10, 20, 30],
    [15, 25, 35],
    [27, 29, 37]
];
// terniary search
function terinary(arr, target, left = 0, right = arr.length - 1) {
    while (left <= right) {
        const mid1 = left + Math.floor((right - left) / 3)
        const mid2 = right - Math.floor((right - left) / 3)

        if (arr[mid1] === target) return mid1
        else if (arr[mid2] === target) return mid2
        else if (arr[mid1] > target) right = mid1 - 1
        else if (arr[mid2] < target) left = mid2 + 1
        else {
            left = mid1 + 1
            right = mid2 - 1
        }
    }
    return 'None'
}

// ------------------- sorting algotithm ----------------------
// bubble sort (put a max at last)
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
// selection sort  (put a minmum as first)
function selectionSort(arr) {
    const n = arr.length

    for (i = 0; i < n - 1; i++) {
        let minIndex = i
        for (j = i + 1; j < n; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }

        if (minIndex !== i) {
            const temp = arr[minIndex]
            arr[minIndex] = arr[i]
            arr[i] = temp
        }
    }
    return arr
}
// insertion sort (check previous value is greater than current one if its swap the value)
function insertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        const key = arr[i]
        let j = i - 1

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }

        arr[j + 1] = key
    }
    return arr
}
// merge sort (divide and concore)
function mergeSort(arr) {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    let i = 0; j = 0
    const result = []
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i])
            i++
        }
        else {
            result.push(right[j])
            j++
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j))
}

function QuickSort(arr) {
    if (arr.length <= 1) return arr

    const left = []
    const right = []
    const pivot = arr[arr.length - 1]

    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        }
        else {
            right.push(arr[i])
        }
    }
    return [...QuickSort(left), pivot, ...QuickSort(right)]
}

// heap sort (insert O(log n) , Deletion O(log n) , Get O(1) , )
class HeapSort {
    constructor() {
        this.heap = []
    }

    insert(item) {
        this.heap.push(item)
        this.bubbleUP()
    }

    bubbleUP() {
        let index = this.heap.length - 1

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2)
            if (this.heap[parentIndex] < this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
            index = parentIndex
        }

    }

    extractMin() {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()

        const min = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.bubbleDown()
        return min
    }

    bubbleDown() {
        const length = this.heap.length
        let index = 0

        while (true) {
            let smallest = index;
            const left = 2 * index + 1
            const right = 2 * index + 2

            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left
            }
            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]

            index = smallest;

        }
    }
}

const c = new HeapSort()
c.insert(30)
c.insert(4)
c.insert(10)
c.insert(20)
c.insert(15)
console.log(c)
c.extractMin()
console.log(c)


// knapsnak
/**
 * values = [60, 100, 120]
 * weights = [10, 20, 30]
 * W = 50
 * 
 * ------------------------------------------------
 * Start: kn(W = 50, n = 3)
 * Item3 (value=120, weight=30)
 * 
 * 120 + kn(W = 20, n = 2)    ← include item 3
 * kn(W = 50, n = 2)          ← exclude item 3
 * 
 * ------------------------------------------------
 * kn(W = 20, n = 2)
 * Item2 (value=100, weight=20)
 * 
 *    include: 100 + kn(W = 0, n = 1)
 *    exclude: kn(W = 20, n = 1)
 * 
 *        kn(W = 0, n = 1)
 *        -> capacity 0 → return 0
 * 
 *        kn(W = 20, n = 1)
 *        Item1 (value=60, weight=10)
 *            include: 60 + kn(W = 10, n = 0)
 *            exclude: kn(W = 20, n = 0)
 * 
 *                kn(W = 10, n = 0) → 0
 *                kn(W = 20, n = 0) → 0
 * 
 *            max(60, 0) = 60
 * 
 *    max(100, 60) = 100
 * 
 * So kn(W = 20, n = 2) = 100
 * 
 * ------------------------------------------------
 * kn(W = 50, n = 2)
 * Item2 (value=100, weight=20)
 * 
 *    include: 100 + kn(W = 30, n = 1)
 *    exclude: kn(W = 50, n = 1)
 * 
 *        kn(W = 30, n = 1)
 *        Item1 (value=60, weight=10)
 *            include: 60 + kn(W = 20, n = 0)
 *            exclude: kn(W = 30, n = 0)
 * 
 *                kn(W = 20, n = 0) → 0
 *                kn(W = 30, n = 0) → 0
 * 
 *            max(60, 0) = 60
 * 
 *        kn(W = 50, n = 1)
 *        Item1 (value=60, weight=10)
 *            include: 60 + kn(W = 40, n = 0)
 *            exclude: kn(W = 50, n = 0)
 * 
 *                kn(W = 40, n = 0) → 0
 *                kn(W = 50, n = 0) → 0
 * 
 *            max(60, 0) = 60
 * 
 *    max(100 + 60, 60) = 160
 * 
 * So kn(W = 50, n = 2) = 160
 * 
 * ------------------------------------------------
 * Back to top:
 * 
 * include (item3): 120 + 100 = 220
 * exclude (item3): 160
 * 
 * max(220, 160) = 220 ✅
 * 
 * ------------------------------------------------
 * Final Answer: 220
 */

function knapsack(we, val, W, n = val.length) {
    if (n === 0 || W === 0) return 0

    if (we[n - 1] > W) return knapsack(we, val, W, n - 1)

    const includes = val[n - 1] + knapsack(we, val, W - we[n - 1], n - 1)
    const exclude = knapsack(we, val, W, n - 1)
    return Math.max(includes, exclude)
}

let values = [60, 100, 120];
let weights = [10, 20, 30];
let W = 50;

console.log(knapsack(weights, values, W))

// find stortest path algorithum
const graph1 = {
    A: { B: 2, C: 5 },
    B: { A: 2, C: 1, D: -4 },
    C: { A: 5, B: 1, D: 1 },
    D: { B: 4, C: 1 }
};

function bfsFindShortestPath(graph , start){
    const queue = [start]
    const visited = new Set([start])
    const distance = {}
    const parent = {}

    distance[start] = 0
    parent[start] = null

    while(queue.length){
        const current = queue.shift()

        for(const node of graph[current]){
            if(!visited.has(node)){
                distance[node] = distance[current] + 1
                visited.add(node)
                parent[node] = current
                queue.push(node)
            }
        }
    }
    return {
        distance ,
        parent
    }
}

const graph = {
    A:['B' , 'C'],
    B:['A' , 'D' , 'E'],
    C:['A' , 'F'],
    D:['B'],
    E:['B' , 'F'],
    F:['C', 'E'] 
}



console.log(bfsFindShortestPath(graph , 'A'))

function dijkstra(gr, start) {
    const distances = {}
    const visited = new Set()

    for (let node in gr) {
        distances[node] = Infinity
    }
    distances[start] = 0

    console.log(distances)

    while (visited.size < Object.keys(graph).length) {
        let smallest = Infinity
        let currentNode = null

        for (let node in gr) {
            if (!visited.has(node) && distances[node] < smallest) {
                smallest = distances[node]
                currentNode = node
            }
        }

        if (currentNode === null) break


        for (let neighbor in gr[currentNode]) {
            if (visited.has(ne)) continue
            const sum = distances[currentNode] + gr[currentNode][neighbor]
            if (sum < distances[neighbor]) {
                distances[neighbor] = sum
            }
        }


        visited.add(currentNode)
    }

    return distances

}

function bellmanFord(gr, start) {
    const distances = {}
    const edges = []

    for (var node in gr) {
        distances[node] = Infinity

        for (var neighbor in gr[node]) {
            edges.push([node, neighbor, gr[node][neighbor]])
        }
    }
    distances[start] = 0


    for (var i = 0; i < Object.keys(gr).length - 1; i++) {
        for (var [u, v, w] of edges) {
            if (distances[u] + w < distances[v]) {
                distances[v] = distances[u] + w
            }
        }
    }

    for (var [u, v, w] of edges) {
        if (distances[u] + w < distances[v]) {
            return
        }
    }

    return distances


}

const grid = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];

const start = [0, 0];
const end = [2, 4];

function heuristic(current, end) {
    return Math.abs(current[0] - end[0]) + Math.abs(current[1] - end[1])
}

function getPath(cameFrom, end) {
    const path = [end]
    let key = `${end[0]},${end[1]}`

    while (cameFrom[key]) {
        const [r, c] = cameFrom[key]
        path.unshift([r, c])
        key = `${r},${c}`
    }
    return path

}

function findShortestPath(grid, start, end) {
    const openSet = [{ pos: start, g: 0, f: heuristic(start, end) }]
    const closedSet = new Set()
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const cameFrom = {}

    while (openSet.length) {
        openSet.sort((a, b) => a.f - b.f)
        const current = openSet.shift()
        const [r, c] = current.pos

        if (end[0] === r && end[1] === c) {
            return getPath(cameFrom, end)
        }

        closedSet.add(`${r},${c}`)

        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc

            if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length || grid[nr][nc] === 1 || closedSet.has(`${nr},${nc}`)) continue

            const g = current.g + 1
            const h = heuristic([nr, nc], end)
            const f = g + h

            if (!openSet.some((c) => c.pos[0] === nr && c.pos[1] === nc)) {
                openSet.push({ pos: [nr, nc], f, g })
                cameFrom[`${nr},${nc}`] = [r, c]
            }

        }
    }

}

// get max value in hour glasses
const a = [
    [1, 0, 1, 2, 0, 2],
    [1, 0, 1, 2, 0, 2],
    [1, 0, 1, 2, 0, 2],
    [1, 0, 1, 2, 0, 2],
];

function maxHourglassSum(arr) {
    let maxSum = -Infinity;

    for (let i = 0; i <= arr.length - 3; i++) {
        for (let j = 0; j <= arr[0].length - 3; j++) {
            let sum =
                arr[i][j] + arr[i][j + 1] + arr[i][j + 2] +
                arr[i + 1][j + 1] +
                arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];

            console.log(`Hourglass at (${i}, ${j}) = ${sum}`);
            maxSum = Math.max(maxSum, sum);
        }
    }

    return maxSum;
}

// XOXO game
const tick = [[0, 0, 1], [0, 1, 0], [0, 0, 1]]
function checkWinner(board) {
    const size = board.length

    for (var i = 0; i < size; i++) {
        if (board[i].every((cell) => cell === board[i][0])) return board[i][0]
        if (board.every((row) => board[0][i] === row[i])) return board[0][i]
    }

    if (board.every((row, i) => board[0][0] === row[i])) return board[0][0]
    if (board.every((row, i) => board[0][size - 1] === row[size - 1 - i])) return board[0][size - 1]

    return 'no Winner'
}


// prims
const INF = Infinity
const adj = [
    // A  B  C  D    E
    [0, 2, 3, INF, INF], // A
    [2, 0, INF, 4, 1],   // B
    [3, INF, 0, INF, 5], // C
    [INF, 4, INF, 0, 2], // D
    [INF, 1, 5, 2, 0],   // E
];

function getPath(grid) {
    const size = grid.length
    const tree = new Array(size).fill(false)
    const parent = new Array(size).fill(-1)
    const cost = new Array(size).fill(Infinity)
    const result = []
    cost[0] = 0

    for (var i = 0; i < size; i++) {
        let minCost = Infinity, currentNode = null

        for (var n = 0; n < size; n++) {
            if (!tree[n] && cost[n] < minCost) {
                currentNode = n
                minCost = cost[n]
            }
        }

        tree[currentNode] = true

        if (parent[currentNode] !== -1) {
            result.push({ from: parent[currentNode], to: currentNode, we: grid[parent[currentNode]][currentNode] })
        }

        console.log(currentNode)

        for (var j = 0; j < size; j++) {
            if (!tree[j] && grid[currentNode][j] < cost[j]) {
                cost[j] = grid[currentNode][j]
                parent[j] = currentNode
            }
        }

    }

    return result.reduce((re, cu) => re + cu.we, 0)

}

// kruskal
const edges = [
    ["A", "B", 2],
    ["A", "C", 3],
    ["B", "D", 4],
    ["B", "E", 1],
    ["C", "E", 5],
    ["D", "E", 2]
];

const parent = {}

function findParent(x) {
    if (!parent[x]) parent[x] = x
    if (parent[x] !== x) parent[x] = findParent(parent[x])
    return parent[x]
}

function union(a, b) {
    const x = findParent(a)
    const y = findParent(b)

    if (x === y) return false
    parent[y] = x
    return true

}

function kruskal(edges) {
    edges.sort((a, b) => a[2] - b[2])
    const route = []
    let totalCost = 0

    for (const [u, v, cost] of edges) {
        if (union(u, v)) {
            route.push(u, v)
            totalCost += cost
        }
    }

    return totalCost
}

// binary search tree
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }
    insert(value) {
        const newNode = new Node(value)

        if (this.root === null) return this.root = newNode

        let current = this.root
        while (true) {
            if (value === current.value) {
                return
            }
            if (value > current.value) {
                if (current.right === null) {
                    return current.right = newNode
                }
                current = current.right
            }
            if (value < current.value) {
                if (current.left === null) {
                    return current.left = newNode
                }
                current = current.left
            }
        }
    }
    removeRoot(value) {
        this.root = this.remove(this.root, value)
    }
    remove(node, value) {
        if (node === null) return null

        if (value < node.value) {
            node.left = this.remove(node.left, value)

        }
        else if (node.value > value) {
            node.right = this.remove(node.right, value)
        }
        else {
            if (node.left === null && node.right === null) return null
            if (node.left === null) return node.right
            if (node.right === null) return node.left

            const smallest = this.findSmallest(node.right)

            node.value = smallest.value

            node.right = this.remove(node.right, smallest.value)

            return node
        }

    }
    mimium(nodes) {
        let current = nodes
        while (current && !current.right) {
            current = current.right
        }
        return current
    }
    search(value) {
        let current = this.root

        while (current) {
            if (current.value === value) return `${current.value} finded`

            if (current.value > value) current = current.left

            if (current?.value < value) current = current?.right
        }
        return 'No finded'
    }
    inorder(node = this.root, result = []) {
        if (node === null) return result
        this.inorder(node.left, result)
        result.push(node.value)
        this.inorder(node.right, result)
        return result
    }
    preorder(node = this.root, result = []) {
        if (node === null) return result
        result.push(node.value)
        this.inorder(node.left, result)
        this.inorder(node.right, result)
        return result
    }
    postorder(node = this.root, result = []) {
        if (node === null) return result
        this.inorder(node.left, result)
        this.inorder(node.right, result)
        result.push(node.value)
        return result
    }
}

const b = new BinarySearchTree()
b.insert(10)
b.insert(2)
b.insert(20)
b.insert(6)

console.log(b.search(11))
console.log(b.inorder())
console.log(b.preorder())
console.log(b.postorder())


class AVLNode {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        this.height = 1
    }
}
class AVLTree {
    constructor() {
        this.root = null
    }
    calculateHeigth(node) {
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right))
    }
    height(node) {
        return node ? node.height : 0
    }
    rightRotation(node) {
        const left = node.left
        const innerNode = left.right

        node.left = innerNode
        left.right = node

        this.calculateHeigth(node)
        this.calculateHeigth(left)

        return left
    }
    leftRotation(node) {
        const right = node.right
        const innerNode = right.left

        node.right = innerNode
        right.left = node

        this.calculateHeigth(node)
        this.calculateHeigth(right)

        return right
    }
    insert(node, value) {
        if (node === null) return new AVLNode(value)

        if (node.value > value) node.left = this.insert(node.left, value)
        else if (node.value < value) node.right = this.insert(node.right, value)
        else return node

        this.calculateHeigth(node)

        const diff = node ? (this.height(node.left) - this.height(node.right)) : 0

        if (diff > 1 && value < node.left.value) {
            return this.rightRotation(node)
        }

        if (diff < -1 && value > node.right.value) {
            return this.leftRotation(node)
        }

        if (diff > 1 && value > node.left.value) {
            node.left = this.leftRotation(node.left)
            return this.rightRotation(node)
        }

        if (diff < -1 && value < node.right.value) {
            node.right = this.rightRotation(node.right)
            return this.leftRotation(node)
        }

        return node

    }
    insertRoot(value) {
        this.root = this.insert(this.root, value)
        return this
    }
}

const n = new AVLTree()

// n.insertRoot(30)
// n.insertRoot(20)
// n.insertRoot(10)

// n.insertRoot(10)
// n.insertRoot(20)
// n.insertRoot(30)

n.insertRoot(30)
n.insertRoot(10)
n.insertRoot(20)

console.log(n.root)

// B-Tree
class BNode {
    constructor(t, leaf) {
        this.t = t
        this.leaf = leaf
        this.children = []
        this.keys = []
    }
    insertNode(key) {
        let i = this.keys.length - 1
        while (i >= 0 && key < this.keys[i]) {
            i--
        }
        if (this.leaf) {
            this.keys.splice(i + 1, 0, key)
        }
        else {
            i++
            if (this.children[i].keys.length === 2 * this.t - 1) {
                this.split(i)
                if (key > this.keys[i]) i++
            }
            this.children[i].insertNode(key)
        }
    }
    split(i) {
        const currentNode = this.children[i]
        const newNode = new BNode(currentNode.t, currentNode.leaf)

        newNode.keys = currentNode.keys.splice(this.t)
        const middle = currentNode.keys.pop()

        if (!currentNode.leaf) {
            newNode.children = currentNode.children.splice(this.t)
        }

        this.keys.splice(i, 0, middle)
        this.children.splice(i + 1, 0, newNode)

    }
    search(key) {
        let i = 0
        while (i < this.keys.length && this.keys[i] < key) {
            i++
        }
        if (i < this.keys.length && this.keys[i] === key) {
            return this
        }
        if (this.leaf) return

        return this.children[i].search(key)
    }
    getProcesseder(i) {
        let current = this.children[i]
        while (!current.leaf) {
            current = current.children[current.children.length - 1]
        }
        return current.keys[current.keys.length - 1]
    }
    getSuccssor(i) {
        let current = this.children[i + 1]
        while (!current.leaf) {
            current = current.children[0]
        }
        return current.keys[0]
    }
    merge(i) {
        const children = this.children[i]
        const sibling = this.children[i + 1]

        children.keys.push(this.keys[i])
        children.keys = children.keys.concat(sibling.keys)

        if (!children.leaf) {
            children.children = children.children.concat(sibling.children)
        }

        this.keys.splice(i, 1)
        this.children.splice(i + 1, 1)
    }
    deleteInnerNode(i) {
        const key = this.keys[i]
        const left = this.children[i]
        const right = this.children[i + 1]

        if (left.keys.length >= this.t) {
            const pre = this.getProcesseder(i)
            this.keys[i] = pre
            left.delete(pre)
        }
        else if (right.keys.length >= this.t) {
            const suc = this.getSuccssor(i)
            this.keys[i] = suc
            right.delete(suc)
        }
        else {
            this.merge(i)
            this.children[i].delete(key);
        }
    }
    borrowPre(idx) {
        const child = this.children[idx]
        const sibling = this.children[idx - 1]

        child.keys.unshift(this.keys[idx - 1])
        this.keys[idx - 1] = sibling.keys.pop()

        if (!child.leaf) {
            child.children.unshift(sibling.children.pop())
        }
    }
    borrowNext(i) {
        const children = this.children[i]
        const sibling = this.children[i + 1]

        children.keys.push(this.keys[i + 1])
        this.keys[i + 1] = sibling.keys.shift()

        if (!children.leaf) {
            children.children.push(sibling.children.shift())
        }
    }
    fill(i) {
        if (i > 0 && this.children[i - 1].keys.length >= this.t) {
            this.borrowPre(i)
        }
        else if (i < this.children.length - 1 && this.children[i + 1].keys.length >= this.t) {
            this.borrowNext(i)
        }
        else {
            if (i === this.keys.length) {
                this.merge(i - 1)
            }
            else {
                this.merge(i)
            }
        }
    }
    delete(key) {
        let idx = this.keys.findIndex(k => k >= key);
        if (idx === -1) idx = this.keys.length

        if (idx < this.keys.length && this.keys[idx] === key) {
            if (this.leaf) {
                this.keys.splice(idx, 1)
            }
            else {
                this.deleteInnerNode(idx)
            }
        }
        else {
            if (this.leaf) return

            const children = this.children[idx]

            if (children.keys.length < this.t) {
                this.fill(idx)
            }

            if (idx > this.keys.length) {
                this.children[idx - 1].delete(key)
            }
            else {
                this.children[idx].delete(key)
            }

        }

    }
}
class BTree {
    constructor(t) {
        this.t = t
        this.root = new BNode(t, true)
    }
    insert(key) {
        let root = this.root
        if (root.keys.length === 2 * this.t - 1) {
            const newRoot = new BNode(this.t, false)
            newRoot.children.push(root)
            newRoot.split(0)
            this.root = newRoot
            this.root.insertNode(key)
        }
        else {
            root.insertNode(key)
        }
    }
    delete(key) {
        if (!this.root) return

        this.root.delete(key)
        if (this.root.keys.length === 0 && !this.root.leaf) {
            this.root = this.root.children[0]
        }
    }
    search(key) {
        return this.root.search(key)
    }
}


// trie
class TrieNode {
    constructor() {
        this.children = {}
        this.end = false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }
    insert(word) {
        let node = this.root
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode()
            }
            node = node.children[char]
        }
        node.end = true;
    }
    search(word) {
        let node = this.root
        for (const char of word) {
            if (!node.children[char]) return false
            node = node.children[char]
        }
        return node.end

    }
}


const trie = new Trie()
trie.insert("apple")
trie.insert("app")
console.log(trie.root)
console.log(trie.search("apps"))

// segment tree
class segementTree {
    constructor(arr) {
        this.n = arr.length
        this.tree = new Array(this.n * 4).fill(0)
        this.build(arr, 0, 0, this.n - 1)
    }
    build(arr, index, left, right) {
        if (left === right) {
            return this.tree[index] = arr[left]
        }
        const mid = Math.floor((left + right) / 2)
        this.build(arr, 2 * index + 1, left, mid)
        this.build(arr, 2 * index + 2, mid + 1, right)

        this.tree[index] = this.tree[2 * index + 1] + this.tree[2 * index + 2]
    }
    query(index, left, rigth, L, R) {
        if (L > rigth || R < left) return 0
        if (L <= left && R >= rigth) return this.tree[index]

        const mid = Math.floor((left + rigth) / 2)
        const sumLeft = this.query(2 * index + 1, left, mid, L, R)
        const sumRight = this.query(2 * index + 2, mid + 1, rigth, L, R)

        return sumLeft + sumRight

    }
    update(index, left, right, pos, newValue) {
        if (left === right) {
            return this.tree[index] = newValue
        }
        const mid = Math.floor((left + right) / 2)
        if (pos <= mid) {
            this.update(2 * index + 1, left, mid, pos, newValue)
        }
        else {
            this.update(2 * index + 2, left, mid, pos, newValue)
        }
        this.tree[index] = this.tree[2 * index + 1] + this.tree[2 * index + 2]
    }
}
const seg = new segementTree([2, 3, 4, 5])
console.log(seg.update(0, 0, 3, 3, 6))
console.log(seg.tree)

// finwick / bit
class Fenwick {
    constructor(arr) {
        this.n = arr.length
        this.tree = new Array(this.n + 1).fill(0)
        this.build(arr)
    }
    lowbit(i) {
        return i & -i
    }
    query(pos) {
        let sum = 0
        while (pos > 0) {
            sum += this.tree[pos]
            pos -= this.lowbit(pos)
        }
        return sum
    }
    rangeQuery(L, R) {
        return this.query(R) - this.query(L - 1)
    }
    build(arr) {
        for (var i = 1; i <= this.n; i++) {
            let pos = i, value = arr[i - 1]
            while (pos <= this.n) {
                this.tree[pos] += value
                pos += this.lowbit(i)
            }
        }
    }
    update(pos, newValue) {
        let idx = pos
        let delta = newValue - this.arr[pos - 1] // compute difference
        this.arr[pos - 1] = newValue             // update original array

        while (idx <= this.n) {
            this.root[idx] += delta
            idx += this.lowbit(idx)
        }
    }
}

const f = new Fenwick([1, 2, 3, 4, 5])
console.log(f.rangeQuery(2, 4))

// disjoint 

class Disjointset {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i)
        this.rank = new Array(n + 1).fill(0)
    }
    findParent(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.findParent(this.parent[node])
        }
        return this.parent[node]
    }
    union(x, y) {
        const a = this.findParent(x)
        const b = this.findParent(y)

        if (a === b) return false

        if (this.rank[a] < this.rank[b]) {
            this.parent[b] = a
        }
        else if (this.rank[b] < this.rank[a]) {
            this.parent[a] = b
        }
        else {
            this.parent[b] = a
            this.rank[a] += 1
        }
    }
    connect(x, y) {
        return this.findParent[x] === this.findParent[y]
    }
}

// suffix tree (uncompressed trie)
class SuffixNode {
    constructor() {
        this.children = {}
        this.end = false
    }
}
class SuffixTree {
    constructor(word) {
        this.root = new SuffixNode()
        this.build(word)
    }
    build(word) {
        for (let i = 0; i < word.length; i++) {
            let node = this.root
            for (let j = i; j < word.length; j++) {
                const char = word[j]
                if (!node.children[char]) {
                    node.children[char] = new SuffixNode()
                }
                node = node.children[char]
            }
            node.end = true
        }
    }
    search(word) {
        let node = this.root
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (!node.children[char]) {
                return false
            }
            node = node.children[char]
        }
        return true
    }
}
const s = new SuffixTree("banana")
console.log(s.root)

// suffix array

function buildSuffixArray(text) {
    const suffixArray = []
    for (let i = 0; i < text.length; i++) {
        suffixArray.push({ suffix: text.slice(i), index: i })
    }
    suffixArray.sort((a, b) => a.suffix < b.suffix ? -1 : b.suffix < a.suffix ? 1 : 0)

    return suffixArray.map((x) => x.index)
}

function suffixSerch(text, pattern) {
    let i = 0; j = text.length - 1
    const sa = buildSuffixArray(text)

    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        const suffix = text.slice(sa[mid])
        console.log(suffix)
        const cmp = suffix.localeCompare(pattern)
        if (cmp === 0 || suffix.startsWith(pattern)) {
            return sa[mid]
        }

        if (cmp < 0) {
            i = mid + 1
        }
        else {
            j = mid - 1
        }
    }
    return 'NO'
}

console.log(suffixSerch('bannana', 'na'))

// suffix compressed tree

class SuffixTrie {
    constructor(word) {
        this.root = {};
        this.build(word);
    }

    findCommonPrefix(a, b) {
        let i = 0;
        while (i < a.length && i < b.length && a[i] === b[i]) i++;
        return a.substring(0, i);
    }

    insertSuffix(suffix, node = this.root) {
        if (!suffix.length) return; // ❗ Never insert empty string

        for (let edge in node) {
            const common = this.findCommonPrefix(edge, suffix);

            if (common.length === 0) continue;

            const edgeRemainder = edge.substring(common.length);
            const suffixRemainder = suffix.substring(common.length);

            // Case 1: Partial match -> need to split edge
            if (edgeRemainder.length > 0) {
                node[common] = {};
                node[common][edgeRemainder] = node[edge]; // move old branch
                delete node[edge];
                node = node[common]; // go deeper
            } else {
                // Full edge consumed
                node = node[edge];
            }

            // Case 2: Suffix is done – stop
            if (!suffixRemainder.length) {
                return;
            }

            // Continue inserting
            return this.insertSuffix(suffixRemainder, node);
        }

        // No common prefix with any edge → add new edge
        node[suffix] = {};
    }

    build(word) {
        for (let i = 0; i < word.length; i++) {
            this.insertSuffix(word.substring(i));
        }
    }
}

const sa = new SuffixTrie("bannana");
console.log(sa.root);

// B+ Tree
class BPlusNode {
    constructor(leaf) {
        this.leaf = leaf
        this.next = null
        this.keys = []
        this.children = []
    }
}
class BPlusTree {
    constructor(t) {
        this.t = t
        this.root = new BPlusNode(true)
    }
    insertNode(node, key) {
        let i = node.keys.length - 1
        while (i >= 0 && key < node.keys[i]) {
            i--
        }
        if (node.leaf) {
            node.keys.splice(i + 1, 0, key)
        }
        else {
            i++
            if (node.children[i].keys.length === 2 * this.t - 1) {
                this.split(node, i)
                if (key > node.keys[i]) i++
            }
            this.insertNode(node.children[i], key)
        }
    }
    split(node, i) {
        const current = node.children[i]
        const newNode = new BPlusNode(current.leaf)

        newNode.keys = current.keys.splice(this.t)
        const mid = this.t - 1
        const promotion = current.keys[mid]

        if (!current.leaf) {
            newNode.children = current.children.splice(this.t)
            node.keys.splice(i, 0, promotion)
        }
        else {
            newNode.next = current.next
            current.next = newNode
            node.keys.splice(i, 0, newNode.keys[0])
        }

        node.children.splice(i + 1, 0, newNode)
    }
    insert(key) {
        let node = this.root
        if (node.keys.length === 2 * this.t - 1) {
            const newRoot = new BPlusNode(false)
            newRoot.children.push(node)
            this.split(newRoot, 0)
            this.root = newRoot
        }
        this.insertNode(this.root, key)
    }
    merge(node, i) {
        const left = node.children[i]
        const right = node.children[i + 1]

        left.keys = left.keys.concat(right.keys)

        if (!left.leaf) {
            left.children = left.children.concat(right.children)
        }

        if (left.leaf) {
            left.next = right.next
        }
        node.keys.splice(i, 1)
        node.children.splice(i + 1, 1)
    }
    fix(node, i) {
        const left = i > 0 ? node.children[i - 1] : null
        const right = i < node.children.length - 1 ? node.children[i + 1] : null
        const currentNode = node.children[i]
        if (left && left.keys.length >= this.t) {
            currentNode.keys.unshift(left.keys.pop())
            node.keys[i - 1] = currentNode.keys[0]
            return
        }
        else if (right && right.keys.length >= this.t) {
            currentNode.keys.push(right.keys.shift())
            node.keys[i] = right.keys[0]
            return
        }
        else {
            if (left) {
                this.merge(node, i - 1)
            }
            else {
                this.merge(node, i)
            }
        }
    }
    deleteNode(node, key) {
        if (node.leaf) {
            const i = node.keys.indexOf(key)
            if (i !== -1) node.keys.splice(i, 1)
            return
        }
        let idx = 0
        while (idx < node.keys.length && key >= node.keys[idx]) idx++
        const children = node.children[idx]

        if (children.keys.length === this.t - 1) {
            this.fix(node, idx)
        }

        this.deleteNode(children, key)

        this.updateSeparator(node, idx);
    }
    delete(key) {
        this.deleteNode(this.root, key)
        if (this.root.keys.length === 0 && !this.root.leaf) {
            this.root = this.root.children[0]
        }
    }
    updateSeparator(parent, i) {
        if (!parent.leaf && parent.children[i + 1]) {
            parent.keys[i] = parent.children[i + 1].keys[0];
        }
    }
    search(key) {
        let node = this.root
        while (!node.leaf) {
            let i = 0
            while (i < node.keys.length && key >= node.keys[i]) i++;
            node = node.children[i]
        }
        return node.keys.includes(key)
    }
}
const B = new BPlusTree(2)
B.insert(10)
B.insert(20)
B.insert(30)
B.insert(40)
B.insert(50)
B.insert(60)
B.insert(70)
B.insert(80)
B.insert(90)


B.delete(30)
console.log(B.search(30))

// skpied list
class Node {
    constructor(value, lvl) {
        this.value = value
        this.next = new Array(lvl + 1).fill(null)
    }
}
class skipedList {
    constructor(lvl) {
        this.maxLvl = lvl
        this.level = 0
        this.head = new Node(-Infinity, lvl)
    }
    random() {
        let l = 0
        while (Math.random() < 0.5 && l < this.maxLvl) {
            l++
        }
        return l
    }
    insert(value) {
        const update = new Array(this.maxLvl + 1)
        let node = this.head

        for (let i = this.level; i >= 0; i--) {
            while (node.next[i] && node.next[i].value < value) {
                node = node.next[i]
            }
            update[i] = node
        }
        const lvl = this.random()
        if (lvl > this.level) {
            for (let i = this.level + 1; i <= lvl; i++) {
                update[i] = this.head
            }
        }
        const newNode = new Node(value, this.maxLvl)
        for (let i = 0; i <= this.level; i++) {
            newNode.next[i] = update[i].next[i]
            update[i].next[i] = newNode
        }
    }
    search(value) {
        let node = this.head
        for (let i = this.level; i >= 0; i--) {
            while (node.next[i] && node.next[i].value < value) {
                node = node.next[i]
            }
        }
        node = node.next[0]
        return node && node.value === value
    }
    delete(value) {
        const update = new Array(this.maxLvl + 1)
        let node = this.head

        for (let i = this.level; i >= 0; i--) {
            while (node.next[i] && node.next[i].value < value) {
                node = node.next[i]
            }
            update[i] = node
        }
        node = node.next[0]

        if (!node && node.value !== value) return false

        for (let i = 0; i <= this.level; i++) {
            if (update[i].next[i] !== node) break;
            update[i].next[i] = node.next[i]
        }
        if (this.level > 0 && this.head.next[this.level] === null) {
            this.level--
        }
        return true

    }
    update(oldValue, newValue) {
        if (this.delete(oldValue)) {
            this.insert(newValue)
        }
    }

}
const sk = new skipedList(4)
sk.insert(1)
sk.insert(2)
sk.insert(3)
sk.insert(4)
sk.delete(3)
console.log(sk.search(3))

// ISAM 
class ISAM {
    constructor() {
        this.maxSize = 4
        this.index = []
        this.blocks = {}
    }
    findBlock(value) {
        for (let i = this.index.length - 1; i >= 0; i--) {
            if (value >= this.index[i]) return this.index[i]
        }
        return null
    }
    insert(value) {
        if (this.index.length === 0) {
            this.index.push(value)
            this.blocks[value] = [value]
            return
        }

        let blockKey = this.findBlock(value)

        if (blockKey === null) {
            blockKey = value
            this.index.push(value)
            this.index.sort((a, b) => a - b)
            if (!this.blocks[blockKey]) this.blocks[blockKey] = []
        }

        const page = this.blocks[blockKey]
        page.push(value)
        page.sort((a, b) => a - b);

        if (page.length > this.maxSize) {
            const mid = Math.floor(page.length / 2)
            const right = page.slice(mid)
            const newKey = right[0]

            this.index.push(newKey)
            this.index.sort((a, b) => a - b)
            this.blocks[newKey] = right
        }
    }
    search(value) {
        let blockKey = this.findBlock(value)
        if (blockKey === null) return false
        return this.blocks[blockKey].find((x) => x === value)
    }
    delete(value) {
        const pageKey = this.findBlock(value)
        if (pageKey === null) return false

        const idx = this.blocks[pageKey].indexOf(value)

        if (idx > -1) {
            this.blocks[pageKey].splice(idx, 1)
            return true
        }

        if (this.blocks[pageKey].length === 0) {
            delete this.blocks[pageKey]
            this.index = this.index.filter((x) => x !== pageKey)
        }
    }
    update(oldValue, value) {
        if (this.delete(oldValue)) {
            this.insert(value)
        }
    }
}
const i = new ISAM()
i.insert(10)
i.insert(1)
i.insert(2)
i.insert(3)
i.delete(2)
i.update(3, 4)

// brute force

// backtracking - Queens problem


function quickselect(arr, k) {
    return selection(arr, 0, arr.length - 1, k - 1)
}
function partition(arr, left, right, k) {
    const pivot = arr[right]
    let i = 0
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[j], arr[i]] = [arr[i], arr[j]]
            i++
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]]
    return i
}
function selection(arr, left, right, k) {
    if (left === right) return arr[left]
    const part = partition(arr, left, right, k)

    if (part === k) return arr[part]
    else if (k < part) {
        return selection(arr, left, part - 1, k)
    }
    else {
        return selection(arr, part + 1, right, k)
    }
}

console.log(quickselect([7, 3, 9, 1, 5], 2))
// two heap
class Heap {
    constructor(compare) {
        this.data = []
        this.compare = compare
    }
    insert(value) {
        this.data.push(value)
        this.data.sort(this.compare)
    }
    peek() {
        return this.data[0]
    }
    pop() {
        return this.data.shift()
    }
    size() {
        return this.data.length
    }
}

class TwoHeap {
    constructor() {
        this.maxHeap = new Heap((a, b) => b - a)
        this.minHeap = new Heap((a, b) => a - b)
    }
    insert(value) {
        if (!this.maxHeap.size() || value <= this.maxHeap.peek()) {
            this.maxHeap.insert(value)
        }
        else {
            this.minHeap.insert(value)
        }

        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.insert(this.maxHeap.pop())
        }
        else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.insert(this.minHeap.pop())
        }
    }
    mid() {
        if (this.maxHeap.size() > this.minHeap.size()) return this.maxHeap.peek()
        return (this.minHeap.peek() + this.maxHeap.peek()) / 2
    }
}

const t = new TwoHeap()
t.insert(3)
t.insert(2)
t.insert(1)
console.log(t.mid())

// merge
function merge(intervals) {
    if (intervals.length === 0) return [];

    // Step 1: Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    let result = [];
    let prev = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];

        if (curr[0] <= prev[1]) {
            // Overlapping → merge
            prev[1] = Math.max(prev[1], curr[1]);
        } else {
            // No overlap
            result.push(prev);
            prev = curr;
        }
    }

    result.push(prev);
    return result;
}
