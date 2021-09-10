
function reverseString(str){
    return str.split('').reverse().join('')
}

function checkPalindrome(str){
    if(str===reverseString(str)){
        return true;

    }
    return false;
}



function useDate(date){
    return newDate={
        day:(date.day<10)? `0${date.day}`: date.day.toString(),
        month:(date.month<10)?`0${date.month}`:date.month.toString(),
        year:date.year.toString()
    }
}

function getDateFormats(date){
    const ddmmyyyy=date.day + date.month+date.year;
    const mmddyyyy=date.month+date.day+date.year;
    const yyyymmdd=date.year+date.month+date.day;
    const ddmmyy=date.day+date.month+date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yymmdd=date.year.slice(-2)+date.month+date.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeAllDates(date){
    const listOfDates=getDateFormats(date);

    const isListPalindrome=listOfDates.map(date=>{
        return checkPalindrome(date);
    })
    
    return isListPalindrome;
}

function isLeapYear(date){
    if (date.year % 400 === 0) return true;
    if (date.year % 100 === 0) return false;
    if (date.year % 4 === 0) return true;

    return false;
}

function getNextDate(date){
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day=date.day+1,
        month=date.month,
        year=date.year;

    if(month===2){
        if(isLeapYear(date)){
            if(day>29){
                day=1;
                month=3;
            }
        }else{
            if(day>28){
                day=1;
                month=3;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month>12){
        day=1;
        month=1;
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    }
}

function nextPalindrome(date){
    
    let nextDate=getNextDate(date);
    let count=0;

    while(1){
        count++;
        let palindromeResultList = checkPalindromeAllDates(useDate(nextDate));
        for(let i=0;i<palindromeResultList.length;i++){
            if(palindromeResultList[i]){
                return [count,nextDate]
            }
        }
        nextDate=getNextDate(nextDate);        
    }
    
}


const birthdate=document.querySelector('#birthdate');
const checkButton=document.querySelector('#check-btn')
const output=document.querySelector('.output-area')

checkButton.addEventListener('click',()=>{
    output.innerHTML = "";
    if (birthdate.value) {
      output.innerHTML = "";
      let dateArr = birthdate.value.split("-");
      let flag = 0;

      const date = {
        day: Number(dateArr[2]),
        month: Number(dateArr[1]),
        year: Number(dateArr[0]),
      };

      const resultList = checkPalindromeAllDates(useDate(date));
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          output.innerHTML = "Yay your birthday is a palindrome!😎😎";
          flag = 1;
        }
      }

      if (!flag) {
        let newPalindrome = nextPalindrome(date);
        let dateStr = `${newPalindrome[1].day}-${newPalindrome[1].month}-${newPalindrome[1].year}`;
        output.innerHTML = `Next palindrome date is ${dateStr}, you missed by ${newPalindrome[0]} days.`;
      }
    }
    })

