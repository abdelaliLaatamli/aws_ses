

class DetailSection extends Component {


    state = {
        sheet : 0 ,
        filterByDate : "all" ,
        sheets : [
            "Global" ,
            "Bounces" ,
            "Complaints" ,
            "DeliveryAttempts",
            "Rejects"
        ]
    }

    componentDidUpdate(prevProps) {
        
        if(  Object.keys( this.props.details.ses ).length == 0 ){
            this.setState({sheet:'Global'})
        }else{
         
            if( this.state.sheet == 0 && this.props.details.ses.getSendStatistics.length > 0 ){
                this.setState({sheet:'Global'})
            }
  
        }
        
    }

    filterChange = ( filterByDate ) => this.setState({ filterByDate });


    render(){

        const checkClass=(param , current) => {
            let className = "nav-link" ;
            let toAdd =  ( param == current ) ? " active " : "";
            let p = Object.keys(this.props.details).length == 0 ? " disabled " : ""; 
            return className + toAdd + p ;
        } 


        const getSendDataPoints = _ => {
            let getSendStatistics = this.props.details.ses || undefined;
            getSendStatistics = getSendStatistics ? getSendStatistics.getSendStatistics : [];
            return getSendStatistics;
        }

        const getSendQuota = _ => {
           
            let getSendQuota = this.props.details.ses || undefined;
            const SendDataPoints = getSendQuota ? getSendQuota.getSendQuota : {};
            return SendDataPoints;
        }

        const filterData = criterias => getSendDataPoints()
                .map( sheet => { 

                    let data= {}; 
                    criterias.split(',').forEach(criteria => { data[criteria] = sheet[criteria];  });
                    return {...data , Timestamp : new Date( sheet.Timestamp ) } })  
                .sort((a, b) => a.Timestamp - b.Timestamp)

         
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
                        ( sheet , k ) => <li key={k} className="nav-item" >
                            <button 
                                className={ checkClass( sheet , this.state.sheet)} 
                                onClick={ () => this.setState({sheet : sheet }) }> {sheet}
                            </button>
                    </li>) 

                }

            </ul>
    
            {
                {
                    "Nodata"           : <div>No Data available</div>,
                    "Global"           : <GlobalSheet 
                                            keySheet={"Global"} filterByDate={this.state.filterByDate} 
                                            quete={ filterData("Bounces,Complaints,DeliveryAttempts,Rejects") } 
                                            maxSend={getSendQuota().Max24HourSend}
                                            onFilterByDateChange={ this.filterChange }/> ,
                    "Bounces"          : <Sheet 
                                            keySheet={"Bounces"} filterByDate={this.state.filterByDate} 
                                            quete={  filterData("Bounces")  } maxSend={getSendQuota().Max24HourSend}
                                            onFilterByDateChange={ this.filterChange } /> , 
                    "Complaints"       : <Sheet 
                                            keySheet={"Complaints"} filterByDate={this.state.filterByDate} 
                                            quete={ filterData("Complaints") } maxSend={getSendQuota().Max24HourSend}
                                            onFilterByDateChange={ this.filterChange } /> , 
                    "DeliveryAttempts" : <Sheet 
                                            keySheet={"DeliveryAttempts"} filterByDate={this.state.filterByDate} 
                                            quete={ filterData("DeliveryAttempts") } maxSend={getSendQuota().Max24HourSend}
                                            onFilterByDateChange={ this.filterChange } /> ,
                    "Rejects"          : <Sheet 
                                            keySheet={"Rejects"} filterByDate={this.state.filterByDate} 
                                            quete={ filterData("Rejects") } maxSend={getSendQuota().Max24HourSend}
                                            onFilterByDateChange={ this.filterChange }
                                            />  
                }[ getSendDataPoints().length > 0 ? this.state.sheet : "Nodata" ]
            }


        </div>)
    }

}