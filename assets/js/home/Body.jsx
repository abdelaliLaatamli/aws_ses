class Body extends Component {


    state = {
        details : {}
    }



    httpRequest = async ( request , data) => {

        let urlencoded = new  FormData() ;
        urlencoded.append( 'request' , request );
        Object.keys( data ).map( item => urlencoded.append( item , data[item] ) )

        const rawResponse = await fetch( backend , {
            method: 'POST',
            body: urlencoded
        });

        const response = await rawResponse.json();
        return response;

    }



    render() {
        return (
            <div className="container">
                <FormAccountSection onGetDetails={ this.getDetails } />
                <DetailSection details={this.state.details} />

            </div>
        )
    }


    getDetails = async details => {
        const response = await this.httpRequest( 'get_details' , details );

        if( response.status == true ){
            toastr.notice({ title:  response.message  , message: response.message , duration : 7000 });
            // console.log( response.data )
            this.setState({ details : response.data })
        }else{
            toastr.error( { title:  response.message  , message: response.error , duration : 7000 });
        }

    }


}