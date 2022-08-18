
let TAG = 'CHAT-UTIL';

const CreateIdentifier = (arrValues)=>{
    try{
        let mArray = [];
        arrValues.forEach(element => {
            mArray.push(element._id) // extracting out all user id in separate array
        });
        return  mArray.sort().join();
    }catch(e){
        console.error(TAG +": "+e.message)
        return e.message;
        
    }
}

const CreateIndentifierFromUserIdesOnly = (arrValues) => {
    try{
        return  arrValues.sort().join();
    }catch(e){
        console.error(TAG +": "+e.message)
        return e.message;
    }
}

export default {CreateIdentifier, CreateIndentifierFromUserIdesOnly}