function safety(arr) {
    for(var i = 0; i<= arr.length; i++){
        if(!arr[i]){ arr[i] = NULL;}
    }
    return arr;
}