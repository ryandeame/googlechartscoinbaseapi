import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
import { GetCandles } from "./Data";

const Waterfall = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try{
            const candleSet = await GetCandles();
            setUserData(candleSet);
          } catch (err) {
            console.log(err.message);
          }
        };
    
        getData();
    
      }, [])

    const options = {
        legend: "none",
        title: "BTC-USD",
        bar: { groupWidth: "100%" }, // Remove space between bars.
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
          risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
        },
      };

  return (
    <>
    {userData && <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={userData}
      options={options}
    />}
    </>
  );
}

export default Waterfall;