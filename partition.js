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
