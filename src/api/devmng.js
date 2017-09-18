import axios from 'axios'

export function rtscan(company, timeout) {
    var url = 'http://127.0.0.1/rtscan/' + company + "/" + timeout;
    return axios.get(url);
}
