import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    const url = 'http://localhost:4700/product/allProducts'; 6

    const headers = {
        'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({});  

    const response = http.post(url, payload, { headers });

    if (response.status === 200) {
        console.log('Request successful');
    } else {
        console.error('Request failed');
    }

    sleep(1);  
}
