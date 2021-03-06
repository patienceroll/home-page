declare namespace FetchType {
    /** 通用响应数据类型 */
    type BaseResponse<T> = {
        code: 0;
        data: T;
        msg: string;
    };

    /** get请求 */
    type Get = <T = any>(path: string, params?: Record<string, any>) => Promise<BaseResponse<T>>;

    /** post请求 */
    type Post = <T = any>(path: string, params?: Record<string, any>) => Promise<BaseResponse<T>>;

    /** postFormData请求 */
    type PostFormdata = <T = any>(path: string, formData: FormData) => Promise<BaseResponse<T>>;
}

export = FetchType;
