export function setUpDates(year, month) {

    const preparedDays = [[], [], [], [], [], []];

    let incrementalDay = 1;
    
    let currentDay = new Date();

    let firstDay = new Date(year, month, 1);
  
    let lastDay = new Date(year, month + 1, 0);
  
    let aggregateDay = new Date(year, month, incrementalDay);
  
    let week = 0;
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      if (aggregateDay.getDay() === 0) {
        preparedDays[week].push({ Sun: aggregateDay.getDate() });
      } else if (aggregateDay.getDay() === 1) {
        if (week === 0 && aggregateDay.getDate() === 1) {
          preparedDays[week].push({ Sun: ''})
        }
        preparedDays[week].push({ Mon: aggregateDay.getDate() });
      } else if (aggregateDay.getDay() === 2) {
        if (week === 0 && aggregateDay.getDate() === 1) {
          preparedDays[week].push({ Sun: ''})
          preparedDays[week].push({ Mon: ''})
        }
        preparedDays[week].push({ Tue: aggregateDay.getDate() });
      } else if (aggregateDay.getDay() === 3) {
        if (week === 0 && aggregateDay.getDate() === 1) {
          preparedDays[week].push({ Sun: ''})
          preparedDays[week].push({ Mon: ''})
          preparedDays[week].push({ Tue: ''})
        }
        preparedDays[week].push({ Wed: aggregateDay.getDate() });
      } else if (aggregateDay.getDay() === 4) {
        if (week === 0 && aggregateDay.getDate() === 1) {
          preparedDays[week].push({ Sun: ''})
          preparedDays[week].push({ Mon: ''})
          preparedDays[week].push({ Tue: ''})
          preparedDays[week].push({ Wed: ''})
        }
        preparedDays[week].push({ Thu: aggregateDay.getDate() });
      } else if (aggregateDay.getDay() === 5) {
        if (week === 0 && aggregateDay.getDate() === 1) {
          preparedDays[week].push({ Sun: ''})
          preparedDays[week].push({ Mon: ''})
          preparedDays[week].push({ Tue: ''})
          preparedDays[week].push({ Wed: ''})
          preparedDays[week].push({ Thu: ''})
        }
        preparedDays[week].push({ Fri: aggregateDay.getDate() });
      } else if (aggregateDay.getDay() === 6) {
        if (week === 0 && aggregateDay.getDate() === 1) {
          preparedDays[week].push({ Sun: ''})
          preparedDays[week].push({ Mon: ''})
          preparedDays[week].push({ Tue: ''})
          preparedDays[week].push({ Wed: ''})
          preparedDays[week].push({ Thu: ''})
          preparedDays[week].push({ Fri: ''})
        }
        preparedDays[week].push({ Sat: aggregateDay.getDate() });
        week++;
      }
  
      aggregateDay = new Date(year, month, ++incrementalDay);
    }

    const sundays = ['Sun'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Sun !== undefined).map(eachMon => eachMon.Sun)))
    const mondays = ['Mon'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Mon !== undefined).map(eachMon => eachMon.Mon)))
    const tuesdays = ['Tue'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Tue !== undefined).map(eachMon => eachMon.Tue)))
    const wednesdays = ['Wed'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Wed !== undefined).map(eachMon => eachMon.Wed)))
    const thursdays = ['Thu'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Thu !== undefined).map(eachMon => eachMon.Thu)))
    const fridays = ['Fri'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Fri !== undefined).map(eachMon => eachMon.Fri)))
    const saturdays = ['Sat'].concat(...preparedDays.map(eachWeek => eachWeek.filter(eachDay => eachDay.Sat !== undefined).map(eachMon => eachMon.Sat)))
  
    return [sundays, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays]
  }

export function generateYears() {
    
    let years = []
    
    for (let i = new Date().getFullYear()-10; i <= new Date().getFullYear() + 10; i++) {
      years.push(i)
    }

    return years;
  }

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]