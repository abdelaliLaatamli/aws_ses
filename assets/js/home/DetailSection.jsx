class DetailSection extends Component {


    state = {
        sheet : 0
    }

    componentDidUpdate(prevProps) {
        
        if(  Object.keys( this.props.details ).length == 0 ){
            this.setState({sheet:0})
        }else{
            if( this.state.sheet == 0 )
                this.setState({sheet:1})
        }
        
    }

    render(){

        const checkClass=(param , current) => {
            let className = "nav-link" ;
            let toAdd =  ( param == current ) ? " active " : "";
            return className + toAdd ;
        } 


        const getSendDataPoints = _ => {
            const getSendStatistics = this.props.details.getSendStatistics || undefined;
            const SendDataPoints = (getSendStatistics && getSendStatistics.SendDataPoints ) || []
            return SendDataPoints;
        }


        return (<div className="pt-4">

                <div className="card mb-3" >
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
        
            <ul className="nav nav-tabs">   
                { 
               
                    getSendDataPoints().map(
                        ( _ , key ) => <li className="nav-item">
                            <button 
                                className={ checkClass( key + 1 , this.state.sheet)} 
                                onClick={ () => this.setState({sheet : key + 1 }) } 
                                >Sheet {key}</button>
                    </li>) 
                }

            </ul>

            {  
                
                [
                    <div>No Data available</div>,
                    ...getSendDataPoints().map(
                        (quete , key ) => <div>

                            <p>aaaaa {key}</p>
                            <p>{quete.Bounces}</p>
                            <p>{quete.Complaints}</p>
                            <p>{quete.DeliveryAttempts}</p>
                            <p>{quete.Rejects}</p>
                            <p>{quete.Timestamp}</p>

                            </div> )
                ][ this.state.sheet ]
            }

        </div>)
    }

}