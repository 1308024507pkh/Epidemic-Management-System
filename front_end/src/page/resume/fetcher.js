let axios = require('axios');

let getf = async function() {
    let url = "/ESS/getPopulationFlow";
    let res = await axios.get(url);
    console.log(res);
    return res;
};

let getdata = async function() {
    let url = "/ESS/getNews";
    let res = await axios.get(url);
    console.log(res);
    return res;
}

export{getf,getdata}

/*
exports.getf = async function() {
    let url = "http://127.0.0.1:8000/getPopulationFlow";
    let res = await axios.get(url);
    console.log(res);
    return res;
};

exports.getdata = async function() {
    let url = "http://127.0.0.1:8000/getNews";
    let res = await axios.get(url);
    console.log(res);
    return res;
};*/