const baseURL="https://v6.exchangerate-api.com/v6/09582d3439de50657adc9ae6/latest";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
let i=0;

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD") {
            newOption.selected="selected";
        }
        if (select.name==="to" && currCode==="INR") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

const getData=async()=>{
    let amount=document.querySelector(".amount input").value;
    let from=fromCurr.value;
    let to=toCurr.value;
    const URL=`${baseURL}/${from}`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.conversion_rates[to];
    console.log(amount);
    msg.innerText=`1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
    let intAmount = parseInt(amount);
    let result=intAmount*rate;
    msg.innerText=`${amount} ${fromCurr.value} = ${result} ${toCurr.value}`;

}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    // if (amount==="" || amount<1) {
    //     amount="1";
    //     amount.value="1";
    // }
    getData();    
});