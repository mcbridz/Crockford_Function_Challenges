function add(x, y) {
    return x + y
}
function sub(x, y) {
    return x - y
}
function mul(x, y) {
    return x * y
}
function identity(arg) {
    return arg
}
function identityf(arg) {
    return () => { return arg }
}
function addf(pass) {
    return (inner) => { return pass + inner }
}
function liftf(passf) {
    return (inner) => (second_inner) => passf(inner, second_inner)
}
function curry(passf, pass) {
    return (inner) => passf(pass, inner)
}
function twice(passf) {
    return (inner) => passf(inner, inner)
}
function reverse(passf) {
    return (first, second) => passf(second, first)
}
function composeu(func1, func2) {
    return (inner) => func2(func1(inner))
}
function composeb(func1, func2) {
    return (arg1, arg2, arg3) => func2(func1(arg1, arg2), arg3)
}
function limit(passf, limitInt) {
    var limiter = limitInt
    var tracker = 0
    return function (arg1, arg2) {
        if (tracker < limiter) {
            output = passf(arg1, arg2)
            tracker++
            return output
        }
        else undefined
    }
}
function from(intArg) {
    var myInt = intArg
    return function () {
        let output = myInt
        myInt++
        return output
    }
}
function to(rngF, intArg) {
    var limiter = intArg
    return function () {
        let output = rngF()
        if (output < limiter) {
            return output
        } else undefined
    }
}
function fromTo(argInt1, argInt2) {
    return to(from(argInt1), argInt2)
}
function element(argArr, frmtoF = from(0)) {
    return function () {
        return argArr[frmtoF()]
    }
}
function collect(frmtoF, argArr) {
    return function () {
        let temp = frmtoF()
        if (temp !== undefined) {
            argArr.push(temp)
        }
        return temp
    }
}
function filter(frmtoF, predicate) {
    return function () {
        let temp = frmtoF()
        return predicate(temp) ? temp : frmtoF()
    }
}
// function filter(gen, pred) {
//     return function () {
//         while (true) {
//             const x = gen()
//             if (pred(x) || x === undefined) {
//                 return x
//             }
//         }
//     }
// }
function concat(frmtoF1, frmtoF2) {
    return function () {
        let temp = frmtoF1()
        // if (temp !== undefined) {
        //     return temp
        // } else {
        //     return frmtoF2()
        // }
        return (temp !== undefined) ? temp : frmtoF2()
    }
}
function repeat(cllctF, argArr) {
    var temp = cllctF()
    while (temp !== undefined) {
        temp = cllctF()
    }
}
function gensymf(argChar) {
    let genfrm = from(1)
    return function () {
        return argChar + genfrm()
    }
}
function counter(argInt) {
    return {
        up() {
            return ++argInt
        },
        down() {
            return --argInt
        }
    }
}
function revocable(passf) {
    let flag = true
    return {
        revoke() {
            flag = false
        },
        invoke: (arg1, arg2) => flag ? passf(arg1, arg2) : undefined
    }
}
function m(obj, src) {
    return {
        "value": obj,
        "source": src ? src.toString() : obj.toString()
    }
}
function addm(obj1, obj2) {
    return {
        "value": obj1.value + obj2.value,
        "source": `(${obj1.source}+${obj2.source})`
    }
}
function liftm(binF, strArg) {
    var mathChecks = {
        '+': (x, y) => add(x, y),
        '-': (x, y) => sub(x, y),
        '*': (x, y) => mul(x, y),
    }
    return function (argM1, argM2) {
        return {
            "value": mathChecks[strArg](argM1.value, argM2.value),
            "source": `(${argM1.value}${strArg}${argM2.value})`
        }
    }
}