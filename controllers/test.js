'use strict'

var TestController = () => { };

TestController.testPromise = (req, res) => {
    let params = req.body;

    let num = params.num;

    let array = [1, 2];

    promise(num, array)
        .then((result) => {
            console.log('num: ' + num);
            console.log('array: ' + array);
            return res.status(200).send({ message: result });
        }).catch((error) => {
            return res.status(500).send({ error });
        });
}

TestController.testPromiseAll = (req, res) => {
    Promise.all([promise1, promise2, promise3])
        .then((results) => {
            console.log("Results = ", results, "message = ", message);
            return res.status(200).send({ message });
        });
}

module.exports = TestController;

function promise(value, array) {
    var promise = new Promise(function (resolve, reject) {
        if (value < 11) reject('reprobado');

        if (value >= 11) {
            value = 999;
            array.push(10);
            array.push(99);
            resolve('aprobado');
        }
    });

    return promise;
}

/*************************************************************************************************************/

var message = "";

var printResult = (results) => { console.log("Results = ", results, "message = ", message) }

var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += "my";
        resolve(message);
    }, 2000)
})

var promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " first";
        resolve(message);
    }, 2000)
})

var promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " promise";
        resolve(message);
    }, 2000)
})