const saveuserDetails = (data)=>{
    localStorage.setItem('USER_DATA', data)    
}

const getUserData = ()=>{
    let data = localStorage.getItem('USER_DATA')
    let returningData = JSON.parse(data)
    return returningData;
}

export default {saveuserDetails, getUserData}