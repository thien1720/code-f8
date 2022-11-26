function Validator(formSeclector ){
    let _this = this
    let formRules = {}


    function getParent(element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }
    
   

    let ValidatorRules= {
        required: function(value){
            return value ? undefined :'Vui lòng nhập trường này'
        },
        email: function(value){
            let regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined :'Vui lòng nhập đúng email'
        },
        min:function (min){
            return function(value){
                return value.length>=min ? undefined :`Vui lòng nhập tối thiểu ${min} kí tự`
            }
        }
    }

    //lấy ra form chứa toàn bộ thẻ input
    let formElement = document.querySelector(formSeclector)
    if(formElement){
        //lấy ra tất cả thể input
        let inputs = formElement.querySelectorAll('[name][rule]')
        
        //lặp qua từng thể input
        for(let input of inputs){
            //tách tưng rule ra để lấy (requeyred,email...)
            let rules = input.getAttribute('rule').split('|')

            //lặp qua tưng key có 2 rule (requyred và email)
            for(let rule of rules){
                let ruleInfo;

                //tách các rule có dấu : để lặp 
                let isRuleHardValue=rule.includes(':')
                if(isRuleHardValue){
                    //đây là tách rule con ra  vì có dấu :  
                    ruleInfo =  rule.split(':')
                    // gán lại số 6 cho rule 
                    rule= (ruleInfo[0])
                }

                let ruleFunc =ValidatorRules[rule]
                console.log(rule)

                //gán lại  ruleFunc và truyền số 6 vào để chạy funcion 
                if(isRuleHardValue){
                    ruleFunc = ruleFunc(ruleInfo[1])
                   
                }

                // nếu là aray thì push nó vào 
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc)
                }
                //nếu nó không phải aray thì gán cho nó là cái mảng
                else{
                    formRules[input.name]=[ruleFunc]
                }
            }
            input.onblur=handleValidate
            input.oninput=handleClearError
            
        }
        //hàm thực hiện validate 

        function handleValidate(event) {
            let rules =formRules[event.target.name]
           
            let eroorMessage 

            for(let rule of rules) {
                eroorMessage = rule(event.target.value)
                if(eroorMessage) break;
            }

            // dùng find 
            // rules.find(function(rule){
            //     eroorMessage = rule(event.target.value)
            //     return eroorMessage
            // })
            

            //nếu có lỗi thì hiển thị message ra ngoài web
            if(eroorMessage){
                let formGroup = getParent(event.target, '.form-group')
                
                if(formGroup){
                    formGroup.classList.add('invalid')  
                    let formMessage = formGroup.querySelector('.form-message')
                    
                    if(formMessage){
                        formMessage.innerText = eroorMessage;
                        
                    }
                }
            }
            return !eroorMessage
        }

        //hàm clear mesage lỗi khi nhập vào ô input 
        function handleClearError(event){
          
            let formGroup = getParent(event.target, '.form-group')
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid')
                let formMessage = formGroup.querySelector('.form-message')
                if(formMessage){
                    formMessage.innerText = "";
                    
                }
            }


        }
    }

    // console.log(this.onSubmit)

    //Xử lý khi submit form
    formElement.onsubmit = function(event){
        event.preventDefault()

        console.log(_this)

        let inputs = formElement.querySelectorAll('[name][rule]')
        let isValid = true

        //lặp qua từng thể input
        for(let input of inputs){
           
            if(!handleValidate({target:input})){
                isValid = false
            }
        }
   

        //khi không có lỗi thì submit form 
        if(isValid){
            if(typeof _this.onSubmit == 'function'){
                let enableInput = formElement.querySelectorAll("[name]")
                let formValues = Array.from(enableInput).reduce(function(values ,input) {
                    switch(input.type){
                        case 'radio':
                            values[input.name]=formElement.querySelector('input[name="' + input.name + '"]:checked ').value;
                            break;
                        case 'checkbox':   
                            if(!input.mathches(":checked")){
                                values[input.name] =""
                                return values;
                            } 
                            if(!Array.isArray(values[input.name])){
                                values[input.name] =[];

                            }
                            values[input.name].push()
                            break;
                        case 'file': 
                            values[input.name] =input.files;
                            break;
                            
                        default:
                            values[input.name] =input.value;
                    }

                    values[input.name] =input.value;
                    return values
                } ,{})
                _this.onSubmit(formValues)
            
            }else{
                formElement.Submit()

            }
        }
    }
}