const { Line } = ReactChartjs2 ;


const  {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} = Chart ;

class Sheet extends Component {

    constructor(props) {
      super(props);
    }
  



    render() {
  
      return ( <React.Fragment>
                  <div className="row pt-3"> 
                      <div className="col-md-12"> 
                          <h4 className="text-center" > Data For Sheet {this.props.keySheet}</h4>    
                      </div>
                  </div> 
                  <div className="row pt-3">
                        <div className="col-md-6">
                         { this.props.graph && <GrapthSheet keySheet={this.props.keySheet} data={this.props.graph} /> } 
                        </div>
                        
                        <div className="col-md-6">
                            <GrapthSheet2 keySheet={this.props.keySheet} quete={this.props.quete}/>
                        </div>
                  </div>  
                </React.Fragment>
                );

    }
}