class Body extends Component {


    state = {
        editableAccount : {},
        accounts : []
    }

    componentDidMount() {
        this.loadAccounts();
    }

    httpRequest = async ( request , data) => {

        let urlencoded = new  FormData() ;

        urlencoded.append( 'request' , request );

        Object.keys( data ).map( item => urlencoded.append( item , data[item] ) )

        const rawResponse = await fetch('/backend', {
            method: 'POST',
            body: urlencoded
        });

        const response = await rawResponse.json();

        return response;

    }

    loadAccounts = async _ => {
        const response = await this.httpRequest( 'list_accounts' , {}); 
        this.setState({ accounts : response.data });
        if( response.status != true ){
            toastr.error( { title:  response.message  , message: response.error , duration : 7000 });
        }
    } 

    render() {
        return (
            <div>
                <h3 class="text-center mt-5"> Accounts Management </h3>
                <FormAccounts editableAccount={ this.state.editableAccount } onAccountSaved={ this.loadAccounts } />
                <ListAccounts accounts={this.state.accounts} onAccountEdit={ this.accountEdit }/>
            </div>
        )
    }

    accountEdit = editableAccount => this.setState({ editableAccount  }) 
    // submitAccounts = (data) => {
    //     console.log( data )
    // }

}