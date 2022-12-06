class DetailSection extends Component {


    state = {
        sheet : 0
    }

    render(){
        const checkClass=(param , current) => "nav-link" + ( param == current ) ? " active " : ""; 
        return (<div>
        
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button className={checkClass(0 , this.state.sheet)} onClick={ () => this.setState({sheet : 0}) } >Sheet 1</button>
                </li>
                <li class="nav-item">
                    <button className={checkClass(1 , this.state.sheet)} onClick={ () => this.setState({sheet : 1}) } >Sheet 2</button>
                </li>
                <li class="nav-item">
                    <button className={checkClass(2 , this.state.sheet)} onClick={ () => this.setState({sheet : 2}) } >Sheet 3</button>
                </li>
                <li class="nav-item">
                    <button className={checkClass(3 , this.state.sheet)}  onClick={ () => this.setState({sheet : 3}) }>Sheet 4</button>
                </li>
            </ul>

            {  
                
                [
                    <div>aaaaa</div>,
                    <div>bbbbb</div>,
                    <div>ccccc</div>,
                    <div>ddddd</div>
                ][this.state.sheet]
            }

        </div>)
    }

}