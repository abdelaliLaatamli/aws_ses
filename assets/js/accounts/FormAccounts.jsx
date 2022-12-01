class FormAccounts extends Component {


    componentDidUpdate() {
        this.notifyUpdate(this.props.editableAccount) ;
    }

    notifyUpdate = (account) => {
        // console.log(account)
        if( Object.keys( account ).length != 0 ){
            Object.keys( account )
            this.id.current.value = account.id ;
            this.name.current.value = account.name ;
            this.accessKey.current.value = account.access_key ;
            this.privateKey.current.value = account.secret_key ;
            this.proxy.current.value = account.proxy
        }

    }

    constructor(props) {
        super(props);
        this.formR = React.createRef();
        this.id = React.createRef();
        this.name = React.createRef();
        this.accessKey = React.createRef();
        this.privateKey = React.createRef();
        this.proxy = React.createRef();
    }


    httpRequest = async ( request , data) => {

        let urlencoded = new  FormData() ;

        urlencoded.append( 'request' , request );

        Object.keys( data ).map( item => urlencoded.append( item , data[item] ? data[item].trim() : "" ) )

        const rawResponse = await fetch( backend , {
            method: 'POST',
            body: urlencoded
        });

        return await rawResponse.json();

    }

    


    render() {
        return (
            <div className="px-5 mt-4">
                <form ref={this.formR} className="row" onSubmit={this.submitData}>

                    <input type="hidden" ref={this.id} name="account_id" />

                    <div className="row col-auto">

                        <div className="col-auto">
                            <label for="staticEmail2" className="col-form-label">Name</label>
                        </div>
                        <div className="col-auto">
                            <input 
                                type="text"
                                ref={this.name} 
                                className="form-control form-control-sm" 
                                required 
                                name="account_name" 
                                id="staticEmail2" 
                                placeholder="Account Name" />
                        </div>

                    </div>

                    <div class="row col-auto">

                        <div className="col-auto">
                            <label for="access_key" className="col-form-label">Access Key</label>
                        </div>
                        <div className="col-auto">
                            <input 
                                type="text"
                                ref={this.accessKey}  
                                className="form-control form-control-sm" 
                                required name="access_key" id="access_key" 
                                placeholder="Access Key" />
                        </div>

                    </div>

                    <div className="row col-auto">
                        <div className="col-auto">
                            <label for="secrit_key" className="col-form-label">Secret Key</label>
                        </div>
                        <div className="col-auto">
                            <input 
                                type="text" 
                                ref={this.privateKey}  
                                className="form-control form-control-sm" 
                                required id="secret_key" 
                                name="secret_key" placeholder="Secrit Key" 
                                />
                        </div>
                    </div>

                    <div className="row col-auto">
                        <div className="col-auto">
                            <label for="proxy" className="col-form-label">Proxy</label>
                        </div>
                        <div class="col-auto">
                            <input 
                                type="text" 
                                ref={this.proxy}
                                className="form-control form-control-sm" 
                                id="proxy" name="proxy" placeholder="Proxy" />
                        </div>
                    </div>

                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary btn-sm mb-3 me-1" > 
                            <i className="bi bi-sd-card-fill text-white"></i> 
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-warning btn-sm mb-3" 
                            onClick={ this.clearForm } > Reset</button>
                    </div>
                </form>
            </div>)
    }

    submitData = async event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formValue = Object.fromEntries(data.entries());
        let request = "update_account";
        // set proxy to null 
        if( formValue["proxy"].trim() == "" ){
            formValue["proxy"] = null ; 
        }
        // check if update operation or add
        if( formValue["account_id"] == "" ){
            delete formValue.account_id; 
            request="add_account";
        }
        

        let response = await this.httpRequest( request , formValue );

        if( response.status == true ){
            // this.loadAccounts();
            await this.props.onAccountSaved();
            this.clearForm();
            toastr.notice({ title:  response.message  , message: response.message , duration : 7000 });
        } else {
            toastr.error( { title:  response.message  , message: response.error , duration : 7000 });
        }

        
    }


    clearForm = () => {
         this.id.current.value = "";
         this.formR.current.reset()
    }


}