// find peak in 2D matrix first we need to pick the mid column in that we need to find the max element and compare with left and right
// Matrix where neighbors matter
function findPeekInMatrix(mat) {
    const row = mat.length
    const col = mat[0].length

    let low = 0, high = col - 1

    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        console.log(mid)

        // find max of mid row
        let maxRow = 0
        for (let i = 0; i < row; i++) {
            if (mat[i][mid] > mat[maxRow][mid]) {
                maxRow = i
            }
        }

        const midVal = mat[maxRow][mid]
        const leftVal = mid > 0 ? mat[maxRow][mid - 1] : -Infinity
        const rightVal = mid < col - 1 ? mat[maxRow][mid + 1] : -Infinity

        if (midVal >= leftVal && midVal >= rightVal) {
            return [maxRow, mid]
        }

        if (leftVal > midVal) {
            high = mid - 1
        }
        else {
            low = mid + 1
        }
    }
}

const matrix = [
    [1, 4, 7, 11],
    [2, 5, 8, 12],
    [3, 6, 9, 16],
    [10, 13, 14, 17]
]
console.log(findPeekInMatrix(matrix))


// BFS in matrix (same as a* start)
// find path pattern (from start)
function bfsMatrix(mat, start, target) {
    const queue = []
    const visited = Array.from({ length: mat.length }, () => new Array(mat[0].length)).fill(false)
    const direction = [[0, 1], [0, -1], [1, 0], [-1, 0]]

    // mark visited true
    for (const [r, c] of start) {
        queue.push([r, c, 0])
        visited[r][c] = true
    }

    while (queue.length) {
        const [r, c] = queue.shift()

        if (r === target[0] && c === target[1]) {
            return "Target Reached"
        }

        for (const [dr, dc] of direction) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < mat.length && nc >= 0 && nc < mat[0].length && !visited[nr][nc] && mat[nr][nc] === 0) {
                visited[nr][nc] = true
                queue.push([nr, nc])
            }
        }
    }
}

// multi BFS (like spread while + for (min or size) + dir loop) 
// visited not needed while spreading sum
function rottedOrange(mat) {
    const queue = []
    let fresh = 0
    let min = 0

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            if (mat[i][j] === 2) queue.push([i, j])
            if (mat[i][j] === 1) fresh++

        }
    }

    while (queue.length && fresh > 0) {
        const size = queue.length
        min++

        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift()
            for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
                const nr = r + dr, nc = c + dc
                if (nr >= 0 && nr < mat.length && nc >= 0 && nc < mat[0].length && mat[nr][nc] === 1) {
                    mat[nr][nc] = 2
                    fresh--
                    queue.push([nr, nc])

                }
            }
        }
    }

    return fresh === 0 ? min : -1
}


const a = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
]
console.log(rottedOrange(a))


// nearest zero 
function nearestZero(mat) {
    const dis = Array.from({ length: mat.length }, () => new Array(mat[0].length).fill(Infinity))
    const queue = []

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            if (mat[i][j] === 0) {
                queue.push([i, j])
                dis[i][j] = 0
            }
        }
    }

    while (queue.length) {
        const [r, c] = queue.shift()
        for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < mat.length && nc >= 0 && nc < mat[0].length && dis[nr][nc] > dis[r][c] + 1) {
                dis[nr][nc] = dis[r][c] + 1
                queue.push([nr, nc])
            }
        }
    }

    return dis
}
const n = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
]
console.log(nearestZero(n))


// count component sum we need to start with 0 ,0 and go one by one if they are connected we change that into 0 (if previously we check its was 1)
function countComponrnt(mat) {
    const row = mat.length; const col = mat[0].length;
    const queue = []
    let count = 0

    function bef(r, c) {
        queue.push([r, c])
        mat[r][c] = '0'

        while (queue.length) {
            const [x, y] = queue.shift()
            for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
                const nr = x + dr, nc = y + dc
                if (nr >= 0 && nr < row && nc >= 0 && nc < col && mat[nr][nc] === '1') {
                    mat[nr][nc] = '0'
                    queue.push([nr, nc])
                }
            }
        }
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (mat[i][j] === '1') {
                count++
                bef(i, j)
            }
        }
    }

    return count
}
const country = [
    ['1', '1', '0', '0'],
    ['1', '0', '0', '1'],
    ['0', '0', '1', '1'],
    ['1', '1', '0', '0']
]
console.log(countComponrnt(country))

// flood fill (like normal all direction spread)
function floodFillColor(mat, start, newColor) {
    const oldColor = mat[start[0]][start[1]]
    if (oldColor === newColor) return mat

    const queue = [start]
    mat[start[0]][start[1]] = newColor

    while (queue.length) {
        const [r, c] = queue.shift()
        for (let [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < mat.length && nc >= 0 && nc < mat[0].length && mat[nr][nc] === oldColor) {
                mat[nr][nc] = newColor
                queue.push([nr, nc])
            }
        }
    }
    return mat
}
let image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1]
];
console.log(floodFillColor(image, [0, 0], 2))

// Boundary Fill (like flood fill but we need to check the boundary and also condition)
function boundaryBFS(arr) {
    const queue = []
    const rows = arr.length
    const cols = arr[0].length

    // put all the O touches the boundries
    for (let i = 0; i < rows; i++) {
        if (arr[i][0] === '0') queue.push([i, 0])
        if (arr[i][cols - 1] === '0') queue.push([i, cols - 1])
    }

    for (let j = 0; j < cols; j++) {
        if (arr[0][j] === 'O') queue.push([0, j])
        if (arr[rows - 1][j] === 'O') queue.push([rows - 1, j])
    }
    while (queue.length) {
        const [r, c] = queue.shift()
        if (arr[r][c] !== 'O') continue;

        arr[r][c] = '#'

        for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < arr.length && nc >= 0 && nc < arr.length && arr[nr][nc] === 'O') {
                queue.push([nr, nc])
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 'O') arr[i][j] = 'X'
            if (arr[i][j] === '#') arr[i][j] = 'O'
        }
    }
    return arr
}

const Boundarymatrix = [
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'O', 'X'],
    ['X', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'X']
];

console.log(boundaryBFS(Boundarymatrix))
