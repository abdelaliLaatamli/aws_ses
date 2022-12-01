const { Component } = React ;
const toastr = $.growl;
const $ = window.$ 
const backend = "/backend/services"
const backendAccounts = "/backend/accounts"

class App extends Component {

    state = {
        showWaiting : false ,
    }
    render() {
       return <React.Fragment>
            <NavBar/>
            <Body onWaitingChange={this.handleWaitingChange} />
            { this.state.showWaiting && <ShowWaiting/> }
        </React.Fragment>
    }

    handleWaitingChange = ( waiting ) => {
        this.setState({ showWaiting : waiting })
    } 


}