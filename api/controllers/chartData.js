exports.chart_data = (req, res, next) => {
    res.status(200).json( {
        one: randomFunction(),
        two: randomFunction(),
        three: randomFunction(),
        four: randomFunction(),
        five: randomFunction()
    }
    )
}

let randomFunction = () => {
    return Math.floor(Math.random() * 10)
}