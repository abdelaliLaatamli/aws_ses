
const { Pie } = ReactChartjs2 ;

class Sheet extends Component {


    render() {
        const keys = [ ...this.props.keys.filter( k => k != "Timestamp" ) ]

        const data = {
            
            labels: keys,
            datasets: [
              {
                label: '# of Votes',
                data: keys.map( el => this.props.quete[el] ),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

        return ( <div className="row">
                            <div className="col-md-6">
                                <p> data For Sheet {this.props.keySheet}</p>
                                <p> Bounces : {this.props.quete.Bounces}</p>
                                <p> Complaints :  {this.props.quete.Complaints}</p>
                                <p> DeliveryAttempts : {this.props.quete.DeliveryAttempts}</p>
                                <p> Rejects : {this.props.quete.Rejects}</p>
                                <p> Timestamp : {this.props.quete.Timestamp}</p>
                            </div>
                            <div className="col-md-6">
                            <Pie data={data}/>
                                {/* <canvas id="myChart" style={{ width:'600px', maxWidth : '600px' }}></canvas> */}
                            </div>
                </div>  );

    }
}