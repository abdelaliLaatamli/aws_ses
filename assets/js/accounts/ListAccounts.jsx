class ListAccounts extends Component {

    state = {
        accounts : []
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

    render() {
        // class="container-fluid"
        return ( <div className="mx-5" >

            

            <table className="table table-warning table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Access key</th>
                        <th scope="col">Secret key</th>
                        <th scope="col">Proxy</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {  this.props.accounts.map( account => (<tr>
                        <td>{ account.name }</td>
                        <td>{ account.access_key }</td>
                        <td>{ account.secret_key }</td>
                        <td>{ account.proxy ? account.proxy : <i className="bi bi-x-circle-fill text-danger"></i>   }</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-1" onClick={ () => this.editAccount(account) } > <i class="bi bi-pencil-square text-light"></i> </button>
                            <button className="btn btn-sm btn-danger me-1" onClick={ () => this.deleteAccount(account.id) }  > <i className="fa fa-solid fa-trash"></i> </button>
                        </td>
                    </tr>) ) }
                </tbody>
                </table>
        
        </div> );
    }


    deleteAccount = async accountId => {

        const response = await this.httpRequest( 'delete_account' , { accountId });
        if( response.status == true ){
            this.props.onAccountSaved();
            toastr.notice({ title:  response.message  , message: response.message , duration : 7000 });
        } else {
            toastr.error( { title:  response.message  , message: response.error , duration : 7000 });
        }

    }
    
    editAccount = account => {
        this.props.onAccountEdit( account )
    } 


}