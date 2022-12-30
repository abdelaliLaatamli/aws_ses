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
  
class GrapthSheet2 extends Component {

    state = {
      selectedDate : "all"
   }
  
      constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
    
  
      componentDidMount() {
          const dates =  Object.keys(this.groupBy());
          this.myRef.current.value = dates[ dates.length - 1 ] ;
          this.setState({ selectedDate : dates[ dates.length - 1 ] })
          // this.props.onFilterByDateChange( dates[ dates.length - 1 ] )
      }
  
      // filterByDate = (event) => this.props.onFilterByDateChange( event.target.value );
      filterByDate = (event) => this.setState({ selectedDate : event.target.value });
  
      groupBy = _ =>  this.props.quete.groupBy( elm => elm.Timestamp.toLocaleDateString())
      getFiltredData = _ => this.state.selectedDate == "all" ? this.props.quete  : this.groupBy()[this.state.selectedDate];
      
      checkDay = ( ky , days ) =>  {
        const isChecked = ky == days.length - 1 ;
        return isChecked;
      }
  
  
      getBackgroundColor = ( k ) => {
        return [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ][k];
      }
  
  
      getBorderColor = ( k ) => {
        return [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ][k];
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
              label: this.props.keySheet +" "+ this.state.selectedDate ,
              data:  this.getFiltredData().map( elm =>  parseInt( elm[this.props.keySheet]?? '-1' ) )  ,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ],
        };
  
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