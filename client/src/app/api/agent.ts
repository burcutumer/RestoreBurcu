import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5014/api/';
axios.defaults.withCredentials = true;   //cookie backend frontend karsilikli gonderiyor iki tarafin da allow with credentials demesi lazim

const responseBody = (response: AxiosResponse) => response.data;
// function responseBodyFn(response: AxiosResponse)
//   {  return response.data; }

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if(pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
},(error:AxiosError)=> {
    const{data,status}= error.response! as {data: any, status: number};   // from the response we need data status
    switch(status)
    {
        case 400:
            if(data.errors){
                const modelStateErrors:string[]=[];
                for(const key in data.errors){
                    if(data.errors[key]){
                       modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({ // history from index (../..)
                pathname:'/server-error'
            },{error: data});

            break;
        default:
            break;
    }
    return Promise.reject(error.response);   //reject ederek gonderiyorum ki hata olugunu anlasin
})

const requests ={
    get:(url:string, params?: URLSearchParams)=> axios.get(url, {params}).then(responseBody),  // {params: params ayni isim oldugu icin yazmaya gerek yok
    post:(url:string,body:{}) => axios.post(url,body).then(responseBody),
    put:(url:string,body:{}) => axios.put(url,body).then(responseBody),
    delete:(url:string) => axios.delete(url).then(responseBody),
}

const Catalog={  //catalog controllerin metodlari
    list: (params: URLSearchParams)=> requests.get('products',params),
    details:(id:number)=> requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const TestErrors = {
    get400Error:() => requests.get('buggy/bad-request'),
    get401Error:() => requests.get('buggy/unauthorized'),
    get404Error:() => requests.get('buggy/not-found'),
    get500Error:() => requests.get('buggy/server-error'),
    getValidationError:() => requests.get('buggy/validation-error'),
}

const Basket = { //BasketControllerin get post..metodlari
    get:() => requests.get('basket'), //   API//basket olarak alacak buyuk harf kucuk harf duyarli degil
    addItem:(productId:number, quantity=1)=> requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number, quantity=1)=> requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const Account ={
    login: (values: any) => requests.post('account/login',values),
    register: (values: any) => requests.post('account/register',values),
    cuurentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Orders = {
    list: ()=> requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const agent ={
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders
}

export default agent;