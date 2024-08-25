import axios from "axios";

let token = localStorage.getItem("reachinbox-auth");
token = token ? JSON.parse(token) : "";


export const getMailList = (token) => {
    return (axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then((res) => res.data.data)
        .catch(err => console.log(err)))
};


export const getMailMasseges = (id) => {
    return (axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then((res) => res.data.data)
        .catch(err => console.log(err)))
};

export const postMailMasseges = (id, messages) => {
    return axios.post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${id}`, messages, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            console.log("Posted:", res.data);
            return res.data;
        })
        .catch(err => {
            console.error("Error:", err);
            throw err;
        });
};


export const deleteMailResponse = (id) => {
    return (axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res)
        return res
    })
        .catch(err => console.log(err)))
};

