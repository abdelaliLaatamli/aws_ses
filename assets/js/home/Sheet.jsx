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

    state = {
        filter : "all"
    }
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  

    componentDidMount() {
        const dates =  Object.keys(this.groupBy());
        this.myRef.current.value = dates[ dates.length - 1 ] ;
        this.setState( { filter : dates[ dates.length - 1 ] } ) 
    }

    filterByDate = (event) => this.setState( { filter : event.target.value } ) 


    groupBy = _ =>  this.props.quete.groupBy( elm => elm.Timestamp.toLocaleDateString())
    getFiltredData = _ => this.state.filter == "all" ? this.props.quete  : this.groupBy()[this.state.filter];
    
    checkDay = ( ky , days ) =>  {
      const isChecked = ky == days.length - 1 ;
      return isChecked;
    }

    render() {

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top as const' ,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

     const data = {

        labels :  this.getFiltredData().map( elm => this.state.filter == "all" ? elm.Timestamp.toString() : elm.Timestamp.toLocaleTimeString() ),
        datasets: [
          {
            label: this.props.keySheet +" "+ this.state.filter ,
            data:  this.getFiltredData().map( elm =>  parseInt( elm[this.props.keySheet]?? '-1' ) )  ,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
      

      return ( <div className="row pt-3">
                      <div className="col-md-6">

                              <p> data For Sheet {this.props.keySheet}</p>

                                {/* <p> data For Sheet {this.props.keySheet}</p>
                                <p> Bounces : {this.props.quete.Bounces}</p>
                                <p> Complaints :  {this.props.quete.Complaints}</p>
                                <p> DeliveryAttempts : {this.props.quete.DeliveryAttempts}</p>
                                <p> Rejects : {this.props.quete.Rejects}</p>
                                <p> Timestamp : {this.props.quete.Timestamp}</p> */}
                            </div>
                            <div className="col-md-6">
                              <select onChange={ this.filterByDate } ref={this.myRef} class="form-select form-select-sm" required aria-label="Default select example">
                                <option selected value="all">Open this select menu</option>
                                { Object.keys(this.groupBy()).map( ( day ) => <option value={day}>{day}</option> ) }
                              </select>
                              <Line options={options} data={data}/>
                            </div>
                </div>  );

    }
}