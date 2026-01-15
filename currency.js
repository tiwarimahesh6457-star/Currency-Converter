import https from "https";
import chalk from "chalk";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config({
    path:new URL(".env", import.meta.url)
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const apiKey = process.env.API_KEY;
const base_url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const convertCurrency = (amount , rate) => {
    return (amount * rate).toFixed(2)
}


https.get(base_url, (response) =>{
    let data = ""; //getting Api data and storing it
    response.on('data', (chunk) =>{
        data += chunk  // storing the data that we get from the api
    });
    response.on('end', () =>{
        const rates = JSON.parse(data).conversion_rates;

        // amount = 90
        // currency = inr
          
        rl.question('Enter the Amount in USD: ', (amount) =>{
            rl.question('Enter the target currency (e.g, INR, EUR ,NPR):', (currency) =>{
                const numericAmount = parseFloat(amount);

if(isNaN(numericAmount) || numericAmount<=0){
    console.log(chalk.red("Please Enter a Valid Input In Amount(USD)"))
    rl.close();
    return;
}

                const rate = rates[currency.toUpperCase()];  // in case if we dont know what currecy does the user input
                if(rate){
                    console.log(`${amount} USD is approximately ${convertCurrency(numericAmount , rate)} ${currency}`)
                }
                else{
                    console.log(`Invalid Currency Code`)
                }
                rl.close();
            } )
        })
    })
    
})


