

class DetailSection extends Component {


    state = {
        sheet : 0 ,
        sheets : [
            "Global" ,
            "Bounces" ,
            "Complaints" ,
            "DeliveryAttempts",
            "Rejects"
        ]
    }

    componentDidUpdate(prevProps) {
        
        if(  Object.keys( this.props.details ).length == 0 ){
            // this.setState({sheet:0})
            this.setState({sheet:'Global'})
        }else{
         

            if( this.state.sheet == 0 && this.props.details.getSendStatistics.length > 0 ){
                this.setState({sheet:'Global'})
                // this.setState({sheet:1})
            }
            // if( this.props.details.getSendStatistics.length == 0 ){
            //     this.setState({sheet:0})
            // }
                
        }
        
    }

    render(){

        const checkClass=(param , current) => {
            let className = "nav-link" ;
            let toAdd =  ( param == current ) ? " active " : "";
            return className + toAdd ;
        } 


        const getSendDataPoints = _ => {
            const getSendStatistics = this.props.details.getSendStatistics || [];
            return getSendStatistics;
        }

        const getSendQuota = _ => {
            const getSendQuota = this.props.details.getSendQuota || undefined;
            const SendDataPoints = getSendQuota || {}
            return SendDataPoints;
        }

        // console.log( 
        //     getSendDataPoints()
        //         .map( sheet => ({ ...sheet , Timestamp : new Date( sheet.Timestamp ) })  )
        //         .sort((a, b) => a.Timestamp - b.Timestamp)
        //         .groupBy( elm => elm.Timestamp.toLocaleDateString())
        // );
        // getSendDataPoints();

        const filterData = criterias => getSendDataPoints()
                .map( sheet => { 
                    // console.log( criterias.split(',')  )

                    let data= {}; 

                    criterias.split(',').forEach(criteria => { data[criteria] = sheet[criteria];  });
                    // console.log( data )
                    // data[criteria] = sheet[criteria];

                    return {...data , Timestamp : new Date( sheet.Timestamp ) } })  
                .sort((a, b) => a.Timestamp - b.Timestamp)
                // .groupBy( elm => elm.Timestamp.toLocaleDateString())
         
        
        return (<div className="pt-4">

                { (Object.keys( getSendQuota() )).length > 0 && <div className="card mb-3" >
                    <div className="card-body">
                        <h4 className="card-title text-center"> Sending limits </h4>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="mb-1 h6" > Daily sending quota </p>
                                <p className="mb-1" > { getSendQuota().Max24HourSend } per 24-hours period</p>
                            </div>
                            <div className="col-md-6">
                                <p className="mb-1 h6" > Maximum send rate </p>
                                <p className="mb-1" > { getSendQuota().MaxSendRate }  emails per second</p>
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
                                <p className="mb-1" >  { getSendQuota().SentLast24Hours } </p>
                            </div>
                            <div className="col-md-4">
                                <p className="mb-1 h6" > Remaining sends </p>
                                <p className="mb-1" > { getSendQuota().Max24HourSend - getSendQuota().SentLast24Hours } </p>
                            </div>
                            <div className="col-md-4">
                                <p className="mb-1 h6" > Sending quota used </p>
                                <p className="mb-1" > { ( getSendQuota().SentLast24Hours / getSendQuota().Max24HourSend ) * 100 } % </p>
                            </div>
                        </div>

                    </div>
                </div>
            }
            
        
            <ul className="nav nav-tabs">   
                { 
                    this.state.sheets.map(
                        ( sheet ) => <li className="nav-item">
                            <button 
                                className={ checkClass( sheet , this.state.sheet)} 
                                onClick={ () => this.setState({sheet : sheet }) }> {sheet}
                            </button>
                    </li>) 

                }

            </ul>

            {
                {
                    "Nodata"     : <div>No Data available</div>,
                    "Global"           : <GlobalSheet keySheet={"Global"}  quete={ filterData("Bounces,Complaints,DeliveryAttempts,Rejects") }  /> ,
                    "Bounces"          : <Sheet keySheet={"Bounces"} quete={ 
                        getSendDataPoints()
                            .map( sheet => ({  Bounces : sheet.Bounces , Timestamp : new Date( sheet.Timestamp ) })  )
                            .sort((a, b) => a.Timestamp - b.Timestamp)
                            // .groupBy( elm => elm.Timestamp.toLocaleDateString())
                    }  /> , 
                    "Complaints"       : <Sheet keySheet={"Complaints"} quete={ filterData("Complaints") } /> , 
                    "DeliveryAttempts" : <Sheet keySheet={"DeliveryAttempts"} quete={ filterData("DeliveryAttempts") } /> ,
                    "Rejects"          : <Sheet keySheet={"Rejects"} quete={ filterData("Rejects") } />  
                }[ this.state.sheet ]
            }

        </div>)
    }

}