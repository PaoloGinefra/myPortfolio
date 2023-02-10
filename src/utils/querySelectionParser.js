function hex2bin(hex){
    return (parseInt(hex, 16)).toString(2)
} 

function bin2hex(bin){
    return (parseInt(bin, 2)).toString(16)
}

export function arrayFromHex(hex, len){
    const bin = hex2bin(hex);
    const arr = [...bin].map((c) => c === '1');
    const paddedArray =  len - arr.length > 0 ? Array(len - arr.length).fill(false).concat(arr) : arr;
    return paddedArray;
}

export function HexFromArray(arr){
    let bin = ''
    arr.forEach(element => {
        bin += element ? '1' : '0'
    });
    return bin2hex(bin);
}