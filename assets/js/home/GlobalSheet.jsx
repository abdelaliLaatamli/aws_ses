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

class GlobalSheet extends Component {

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
     


    getKeys = _ => Object.keys( this.props.quete[0] ).filter( e  => e != "Timestamp" ) 
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

     const data = {

        labels :  this.getFiltredData().map( elm => this.props.filterByDate == "all" ? elm.Timestamp.toString() : elm.Timestamp.toLocaleTimeString() ),
        datasets: [

          ...this.getKeys().map( ( cat , k ) => ({ 
            label: cat +" "+ this.props.filterByDate ,
            data:  this.getFiltredData().map( elm => elm[cat]) ,
            borderColor: this.getBorderColor(k), 
            backgroundColor: this.getBackgroundColor(k),
          }) )

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