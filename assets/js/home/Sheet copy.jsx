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
      this.myRef = React.createRef();
    }
  

    componentDidMount() {
        const dates =  Object.keys(this.groupBy());
        this.myRef.current.value = dates[ dates.length - 1 ] ;
        this.props.onFilterByDateChange( dates[ dates.length - 1 ] )
    }

    filterByDate = (event) => this.props.onFilterByDateChange( event.target.value );


    groupBy = _ =>  this.props.quete.groupBy( elm => elm.Timestamp.toLocaleDateString())
    getFiltredData = _ => this.props.filterByDate == "all" ? this.props.quete  : this.groupBy()[this.props.filterByDate];
    
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

      const optionsPercent = JSON.parse( JSON.stringify(options) )
      optionsPercent["scales"] = { yAxes: [  { ticks: { beginAtZero: true,  callback: value => value + "%" }}] } ;


     const data = {

        labels :  this.getFiltredData().map( elm => this.props.filterByDate == "all" ? elm.Timestamp.toLocaleString() : elm.Timestamp.toLocaleTimeString() ),
        datasets: [
          {
            label: this.props.keySheet +" "+ this.props.filterByDate ,
            data:  this.getFiltredData().map( elm =>  parseInt( elm[this.props.keySheet]?? '-1' ) )  ,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ],
      };


      // const dataPercent = {

      //   labels :  this.getFiltredData().map( elm => this.props.filterByDate == "all" ? elm.Timestamp.toLocaleString() : elm.Timestamp.toLocaleTimeString() ),
      //   datasets: [
      //     {
      //       label: this.props.keySheet +" "+ this.props.filterByDate ,
      //       data:  this.getFiltredData().map( elm =>  {
      //         let percent = (parseInt( elm[this.props.keySheet] ) / this.props.maxSend ) * 100;
      //         return parseFloat( percent.toFixed(2) );
      //       }) ,
      //       borderColor: 'rgb(255, 99, 132)',
      //       backgroundColor: 'rgba(255, 99, 132, 0.5)'
      //     }
      //   ],
      // };
      
  
      return ( <React.Fragment>
                  <div className="row pt-3"> 
                      <div className="col-md-12"> 
                          <h4 className="text-center" > Data For Sheet {this.props.keySheet}</h4>    
                      </div>
                  </div> 

                  <div className="row pt-3"> 
                      <div className="col-md-4 offset-4"> 
                        <select onChange={ this.filterByDate } ref={this.myRef} className="form-select form-select-sm" required aria-label="Default select example">
                                <option defaultValue={"all"} value="all">Open this select menu</option>
                                    { Object.keys(this.groupBy()).map( ( day , k ) => <option value={day} key={k}>{day}</option> ) }
                            </select>  
                      </div>
                  </div> 
                  <div className="row pt-3">
                        <div className="col-md-6">
                                
                            {/* <Line options={optionsPercent} data={dataPercent}/> */}
                                  {/* <p> data For Sheet {this.props.keySheet}</p>
                                  <p> Bounces : {this.props.quete.Bounces}</p>
                                  <p> Complaints :  {this.props.quete.Complaints}</p>
                                  <p> DeliveryAttempts : {this.props.quete.DeliveryAttempts}</p>
                                  <p> Rejects : {this.props.quete.Rejects}</p>
                                  <p> Timestamp : {this.props.quete.Timestamp}</p> */}
                        </div>
                        
                        <div className="col-md-6">
                            <Line options={options} data={data}/>
                        </div>
                  </div>  
                </React.Fragment>
                );

    }
}