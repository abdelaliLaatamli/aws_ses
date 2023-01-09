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

class GrapthSheet extends Component {

    state = {
        selectedDate : "all"
    }

    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  

    componentDidMount() {
        const dates =  Object.keys(this.groupBy());
        this.myRef.current.value = dates.length > 0 ? dates[ dates.length - 1 ] : "all" ;
        this.setState({ selectedDate : dates.length > 0 ? dates[ dates.length - 1 ] : "all" })
    }

    filterByDate = (event) => this.setState({ selectedDate : event.target.value });


    groupBy = _ =>  this.props.data.groupBy( elm => elm.Timestamp.toLocaleDateString())
    getFiltredData = _ => this.state.selectedDate == "all" ? this.props.data  : this.groupBy()[this.state.selectedDate];
    
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

        labels :  this.getFiltredData().map( elm => this.state.selectedDate == "all" ? elm.Timestamp.toLocaleString() : elm.Timestamp.toLocaleTimeString() ),
        datasets: [
          {
            label: this.props.keySheet + " " + this.state.selectedDate,
            data: this.getFiltredData().map( elm => parseFloat( elm.Average.toFixed(2) ?? '-1' )) ,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ],
      };

      console.log(this.getFiltredData())
      return ( <React.Fragment>
    

                  <div className="row pt-3"> 
                      <div className="col-md-4 offset-4"> 
                        <select onChange={ this.filterByDate } ref={this.myRef} className="form-select form-select-sm" required aria-label="Default select example">
                                <option defaultValue={"all"} value="all">Open this select menu</option>
                                    { Object.keys(this.groupBy()).map( ( day , k ) => <option value={day} key={k}>{day}</option> ) }
                            </select>  
                      </div>
                  </div> 
                  <div className="row pt-3">
            
                        <div className="col-md-12">
                            <Line options={options} data={data}/>
                        </div>

                  </div>  
                </React.Fragment>
                );

    }
}