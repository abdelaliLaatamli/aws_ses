class ListAccounts extends Component {

    state = {
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

    render() {

        // this.loadAccounts();

        return ( <div>aaaa</div> );
    }


    loadAccounts = async _ => {

        const accounts = await this.httpRequest( 'list_accounts' , {}); 
        this.setState({ accounts : accounts.data });
        // console.log( accounts ) 

    } 



}