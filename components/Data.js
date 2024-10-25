export const GetCandles = () => {
    return new Promise (async (res, rej) => {
        try {
            const response = await fetch('http://localhost:3005/cb');
            const cb = await response.json(response);
            const candles = cb.map((candle) => {
                const arr = [];
                const timestamp = new Date(candle[0] * 1000);
                const hours = timestamp.getHours();
                const preMinutes = timestamp.getMinutes().toString();
                let minutes;
                preMinutes.length === 1 ? minutes = "0" + preMinutes : minutes = preMinutes;
                const seconds = "0" + timestamp.getSeconds();
                const formattedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);
                arr.push(formattedTime);
                parseFloat(candle[3]) >= parseFloat(candle[4]) ? arr.push(candle[2]) : arr.push(candle[1]);
                arr.push(candle[3]);
                arr.push(candle[4]);
                parseFloat(candle[3]) >= parseFloat(candle[4]) ? arr.push(candle[1]) : arr.push(candle[2]);
                return arr;
            });
            const candleSet = candles.slice(0, 10);
            candleSet.reverse();
            candleSet.unshift(["Time", "", "", "", ""]);

            // [
            //     time: 1680541260, Mon Apr 03 2023 12:01:00 GMT-0500 (Colombia Standard Time)
            //     Low: 27920.22,
            //     High: 27952.7,
            //     Open: 27922.37,
            //     Close: 27944.72,
            //     21.71821773
            // ]
            // [
            //     1680541200, 	Mon Apr 03 2023 12:00:00 GMT-0500 (Colombia Standard Time)
            //     Low: 27893.93,
            //     High: 27945.87,
            //     Open: 27945.87,
            //     Close: 27920.19,
            //     37.17758832
            // ]
          
            res(candleSet);
        } catch (err) {
            console.log(err.message)
            rej(err);
        }
    })
}
