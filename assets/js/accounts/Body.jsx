class Body extends Component {


    state = {
        accounts : []
    }

    render() {
        return (
            <div>
                <h3 class="text-center mt-5"> Accounts Management </h3>
                <FormAccounts onAccountSubmited={this.submitAccounts} />
                <ListAccounts accounts={ this.state.accounts } />
            </div>
        )
    }


    // submitAccounts = (data) => {
    //     console.log( data )
    // }

}