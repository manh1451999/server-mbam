let errors = {}

errors.NOT_ALLOW = {
    status: 500,
    success: false,
    message: 'Không được phép truy cập',
    note: 'Not allow',
    code: 1000,
};

errors.INVALID_METHOD = {
    status: 200,
    success: false,
    message: 'Không có dữ liệu hoặc không còn dữ liệu',
    code: 1001,
};

errors.UNKNOWN_ERROR = {
    status: 500,
    success: false,
    message: 'Lỗi không xác định',
    code: 1002,
};

errors.INVALID_PARAMETER = {
    status: 500,
    success: false,
    message: 'Parameter value is invalid',
    note: 'Giá trị của tham số không hợp lệ',
    code: 1003,
};
module.exports = errors