// quick sort (lomuto partition)
function quickSort(arr , left = 0 , right=arr.length-1){
  if(left < right){
    const part = partition(arr , left , right)
    dutchFlag(arr , left , part - 1)
    dutchFlag(arr , part + 1 , right)
  }
  return arr
}
function partition(arr , left , right){
    let i = left - 1 , pivot = arr[right]

    for(let j = left; j < right; j++){
        if(arr[j] < pivot){
            i++
            [arr[j] , arr[i]] = [arr[i] , arr[j]]
        }
    }
    [arr[i+1] , arr[right]] = [arr[right] , arr[i+1]]
    return i+1
}
console.log(dutchFlag([0,1,2,0,1,2]))