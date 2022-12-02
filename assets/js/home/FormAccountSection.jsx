class FormAccountSection extends Component {

    state = {
        accounts : [] , 
        regions : {
             "us-east-1"  : "1 _ US East (N. Virginia)" ,
             "us-east-2"  : "2 _ US East (Ohio)" ,
             "us-west-1"  : "3 _ US West (N. California)",
             "us-west-2"  : "4 _ US West (Oregon)",
             "ap-south-1" : "5 _ Asia Pacific (Mumbai)" ,
             "ap-northeast-2" : "6 _ Asia Pacific (Seoul)" ,
             "ap-southeast-1" : "7 _ Asia Pacific (Singapore)" ,
             "ap-southeast-2" : "8 _ Asia Pacific (Sydney)" ,
             "ap-northeast-1" : "9 _ Asia Pacific (Tokyo)" ,
             "ca-central-1"   : "10_ Canada (Central)" ,
             "eu-central-1"   : "11_ EU (Frankfurt)" ,
             "eu-west-1"      : "12_ EU (Ireland)"  ,
             "eu-west-2"      : "13_ EU (-London)" ,
             "eu-west-3"      : "14_ EU (Paris)"  ,
             "eu-north-1"     : "15_ EU (Stockholm)" ,
             "sa-east-1"      : "16_ South America (São Paulo)" 
        }
    }


     componentDidMount() {
        this.loadAccounts();
    }

    httpRequest = async ( request , data , back = "def") => {

        let urlencoded = new  FormData() ;
        urlencoded.append( 'request' , request );
        Object.keys( data ).map( item => urlencoded.append( item , data[item] ) )

        const rawResponse = await fetch( back =="def" ? backend : backendAccounts  , {
            method: 'POST',
            body: urlencoded
        });

        const response = await rawResponse.json();
        return response;

    }

    loadAccounts = async _ => {
        const response = await this.httpRequest( 'list_accounts' , {} , "accounts"); 
        this.setState({ accounts : response.data });
        if( response.status != true ){
            toastr.error( { title:  response.message  , message: response.error , duration : 7000 });
        }
    } 

    render(){

        return ( <div className="px-5 mt-5">
        <form className="row" onSubmit={ this.submitForm } >

        
            <div className="row col-auto" >

                <div className="col-auto">
                    <label for="staticEmail2" className="col-form-label">Account</label>
                </div>
                <div className="col-auto">

                    <select class="form-select form-select-sm" required name="account_id" aria-label="Default select example">
                        <option selected value="">Open this select menu</option>
                        { this.state.accounts.map( accounts => <option value={accounts.id}>{accounts.name}</option> ) }
                    </select>
                </div>

            </div>

            <div class="row col-auto">

                <div className="col-auto">
                    <label for="access_key" className="col-form-label">Region</label>
                </div>
                <div className="col-auto">
                    <select class="form-select form-select-sm" required name="region" aria-label="Default select example">
                        <option selected value="">Open this select menu</option>
                        { Object.keys(this.state.regions).map( 
                                region => <option 
                                    value={region}>{ this.state.regions[region] }</option> ) }
                    </select>

                </div>

            </div>

           
            <div className="col-auto">
                <button type="submit" className="btn btn-primary btn-sm mb-3 me-1" > 
                    Get details
                </button>
            </div>
        </form>
    </div> )
    }


    submitForm = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formValue = Object.fromEntries(data.entries());
        this.props.onGetDetails( formValue  )
    }

}