import React, {useState, useEffect} from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {UserData, GetData, GetCandles} from '../Data'



const BarChart = ({chartData}) => {


  const [tickerPrices, setTickerPrices] = useState(null);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map((data) => data.userGain)
    }]
  });
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    console.log('Hello.')
    const getData = async () => {
      console.log('abc')
      try{
        await GetCandles();
        //const data = await GetData();
        // console.log('data', data);
        // const linePrices = {
        //   labels: data.map((price) => price.label),
        //   datasets: [{
        //     label: "Price",
        //     data: data.map((price) => price.price)
        //   }]
        // }
        // console.log(linePrices);
        //setTickerPrices(data);
        //setLineData(linePrices);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();

  }, [])

  return (
    <div 
    //style={{width: "50%"}}
    >
    {/* <Bar data={userData}/> */}
    {lineData && <Line data={lineData}/>}
    {/* {tickerPrices && tickerPrices.trades.map((price, index) => {
      return (<div key={index} >{price.price}</div>)
    })
    } */}
    </div>

  )
}

export default BarChart