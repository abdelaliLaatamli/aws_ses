class  FormAccounts extends Component {


    saveData = async ( request , data) => {

        let urlencoded = new  FormData() ;
        urlencoded.append( 'request' , request )
        Object.keys( data ).map( item => urlencoded.append( item , data[item] ) )

        const rawResponse = await fetch('/backend', {
            method: 'POST',
            body: urlencoded
        });
        const content = await rawResponse.json();

        console.log( content );

    }


    render() {
        return (
            <div class="px-5 mt-4">
        <form class="row" onSubmit={ this.submitData }>
            <div class="row col-auto">

                <div class="col-auto">
                    <label for="staticEmail2" class="col-form-label">Name</label>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control form-control-sm" required name="account_name" id="staticEmail2" placeholder="Account Name" />
                </div>

            </div>

            <div class="row col-auto">

                <div class="col-auto">
                    <label for="access_key" class="col-form-label">Access Key</label>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control form-control-sm" required name="access_key" id="access_key" placeholder="Access Key"/>
                </div>

            </div>

            <div class="row col-auto">
                <div class="col-auto">
                    <label for="secrit_key" class="col-form-label">Secret Key</label>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control form-control-sm" required id="secret_key" name="secret_key" placeholder="Secrit Key"/>
                </div>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary btn-sm mb-3">save Account</button>
            </div>
      </form>
        </div>)
    }

    submitData = async event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formValue = Object.fromEntries(data.entries());

        // this.props.onAccountSubmited(formValue);
        await this.saveData( 'save_account' , formValue);
         this.saveData(formValue) 
    }

   
}