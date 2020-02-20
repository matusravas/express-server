const sendResponse = (res, return_code, response_params) => {
    // const { code, message, data, error } = response_params;
    res.status(return_code).json(response_params);
    return;
}

module.exports = sendResponse;

// code,message,data,error