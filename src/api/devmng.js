import axios from 'axios'

var BaseURL = 'http://127.0.0.1';
export function rtscan(company, timeout) {
    var url = BaseURL+'/rtscan/' + company + "/" + timeout;
    return axios.get(url);
}

export function getGroup(page_index,page_size) {
    var url = BaseURL+'/group/list/' + page_index + "/" + page_size;
    return axios.get(url);
}

export function addGroupReq(obj) {
    var url = BaseURL + '/group/create';
    return axios({
        method:"POST",
        url:url,
        data:obj
    });
}
