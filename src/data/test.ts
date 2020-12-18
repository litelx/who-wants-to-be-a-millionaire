
// function aragram(strA: string, strB): boolean {
//     const keys = {};

//     if (strA.length !== strB.length) return false;

//     for (let i = 0; i < strA.length; i++) {
//         if (keys[strA[i]]) {
//             keys[strA[i]]++;
//         } else {
//             keys[strA[i]] = 1;
//         }
//     }
//     for (let i = 0; i < strB.length; i++) {
//         if (keys[strB[i]]) {
//             keys[strB[i]]--;
//         } else {
//             return false
//         }
//     }
//     let isArgram = true;
//     Object.keys(keys).forEach(key => {
//         if (keys[key] != 0) { 
//             isArgram = false;
//         }
//     })
//     return isArgram;
// }

// aragram('dddd', 'dddd')
// class SomeObj {
//     public all = {};
//     public q = {

//     }
//     public set(i, val) {
//         if (this.all!= null) this.all =null;
//         q[i] = val
//     }

//     public get(i){
//         if all return all
//         return q[i]
//     }

//     public setAll(val) {
//         all = val
//     }
// }

