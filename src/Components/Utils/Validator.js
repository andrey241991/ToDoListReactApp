class Validator{

    static validate(title){
        let trimTitle = title.trim();
        if(trimTitle.length === 0){
            return false;
        }else{
            return true;
        }
    }
}

export default Validator;

