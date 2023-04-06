const { shallowEqual } = require(".");
const err = require("../errors/index")
const errorCodeDefine = [];
for (const key in err) {
    errorCodeDefine.push(err[key].code);
}
module.exports.errorHandler = (res, error, data=null) => {
    console.log('error', error)
    let _error
    try {
        // _error = Object.values(err).find(x=>x.code == (error|| {}).code);
        _error = Object.values(err).find(x=>shallowEqual(x, error));
    if (!_error) {
        _error = error;
    }
        // if (!_error && error?.errors)
        //     _error = err[Object.values(error.errors || {})?.[0]?.message];
        // _error = _error || error;
        if (errorCodeDefine.includes(_error.code)) {
            return res.status(_error.status).json({
                success: _error.success,
                data: data || _error.data,
                message: _error.message,
                code: _error.code,
            })
        }
        throw new Error(error)
    } catch (error) {
        return res.status(err.UNKNOWN_ERROR.status).json({
            success: err.UNKNOWN_ERROR.success,
            data:  _error?.message ||  _error,
            message: err.UNKNOWN_ERROR.message,
            code: err.UNKNOWN_ERROR.code,
        })
    }

}
module.exports.successHandler = (res, data=null, meta=null, status = 200, message = "success") => {
    let payload = {
        success: true,
        data: data,
        message,
        code: 1000,
    }
    if(meta) payload.meta = meta
    return res.status(status).json(payload)
}
