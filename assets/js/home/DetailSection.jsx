

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

        const getSendQuota = _ => {
            const getSendQuota = this.props.details.getSendQuota || undefined;
            const SendDataPoints = getSendQuota || {}
            return SendDataPoints;
        }

        
        return (<div className="pt-4">

                { (Object.keys( getSendQuota() )).length > 0 && <div className="card mb-3" >
                    <div className="card-body">
                        <h4 className="card-title text-center"> Sending limits </h4>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="mb-1 h6" > Daily sending quota </p>
                                <p className="mb-1" > { getSendQuota()[0].Max24HourSend } per 24-hours period</p>
                            </div>
                            <div className="col-md-6">
                                <p className="mb-1 h6" > Maximum send rate </p>
                                <p className="mb-1" > { getSendQuota()[0].MaxSendRate }  emails per second</p>
                            </div>
                        </div>

                    </div>
                </div>
            }

            { (Object.keys( getSendQuota() )).length > 0 &&  <div className="card mb-3" >
                    <div className="card-body">
                        <h4 className="card-title text-center"> Daily sending usage </h4>
                        <div className="row">
                            <div className="col-md-4">
                                <p className="mb-1 h6" > Emails sent </p>
                                <p className="mb-1" >  { getSendQuota()[0].SentLast24Hours } </p>
                            </div>
                            <div className="col-md-4">
                                <p className="mb-1 h6" > Remaining sends </p>
                                <p className="mb-1" > { getSendQuota()[0].Max24HourSend - getSendQuota()[0].SentLast24Hours } </p>
                            </div>
                            <div className="col-md-4">
                                <p className="mb-1 h6" > Sending quota used </p>
                                <p className="mb-1" > { ( getSendQuota()[0].SentLast24Hours / getSendQuota()[0].Max24HourSend ) * 100 } % </p>
                            </div>
                        </div>

                    </div>
                </div>
            }
            
        
            <ul className="nav nav-tabs">   
                { 
               
                    getSendDataPoints().map(
                        ( _ , key ) => <li className="nav-item">
                            <button 
                                className={ checkClass( key + 1 , this.state.sheet)} 
                                onClick={ () => this.setState({sheet : key + 1 }) } 
                                >Sheet {key}
                            </button>
                    </li>) 
                }

            </ul>

            {  
                
                [
                    <div>No Data available</div>,
                    ...getSendDataPoints().map(
                        (quete , key ) =>  <Sheet keySheet={key} quete={quete} keys={ Object.keys(quete) } /> ) 
                ][ this.state.sheet ]
            }

        </div>)
    }

}