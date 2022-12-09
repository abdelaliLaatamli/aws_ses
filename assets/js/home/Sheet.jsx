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


    filterByDate = (event) => this.setState( { filter : event.target.value } ) 


    groupBy = _ =>  this.props.quete.groupBy( elm => elm.Timestamp.toLocaleDateString())
    getFiltredData = _ => this.state.filter == "all" ? this.props.quete  : this.groupBy()[this.state.filter];
    

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


      return ( <div className="row">
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
                              <select onChange={ this.filterByDate } class="form-select form-select-sm" required aria-label="Default select example">
                                <option selected value="all">Open this select menu</option>
                                { Object.keys(this.groupBy()).map( quete => <option value={quete}>{quete}</option> ) }
                              </select>
                              <Line options={options} data={data}/>
                            </div>
                </div>  );

    }
}