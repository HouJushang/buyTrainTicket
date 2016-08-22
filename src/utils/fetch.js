/**
 * Created by hfcb on 16/8/17.
 */
import 'whatwg-fetch'
import {openloading,closeloading} from '../actions/loading'

export default function (e) {
    return dispatch => {
        if (e.font) {
            dispatch(openloading(e.font));
        }

        var parm = e.data || {};

        fetch('http://app.donggaofuwu.com:8081/mobile.service/' + e.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZGdmd3RvbWNhdDEyMzQ6TjVQVzNPU0RDNjBYSDdLRTg0MUI='
            },
            body: JSON.stringify(parm)
        }).then(function (response) {
            dispatch(closeloading());
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (response) {
            return response.json()
        }).then(function (response) {
            if (response.status == 'ok') {
                e.success(response.data)
            } else {
                alert(response.msg);
            }
        });
    }
}

