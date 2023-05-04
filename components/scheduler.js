import { View, Text, StyleSheet, FlatList } from "react-native"
import { setUpDates, generateYears, months } from "./utils/setUpDates"
import SelectDropdown from "react-native-select-dropdown"
import { useEffect, useState } from "react"

const Scheduler = ({ navigation }) => {

  const [weeksOfMonth, setWeeksOfMonth] = useState([])
  const [yearAndMonth, setYearAndMonth] = useState({
    year : new Date().getFullYear(),
    month: new Date().getMonth()
  })

  useEffect(() => {
      setWeeksOfMonth(setUpDates(yearAndMonth.year, yearAndMonth.month))
  }, [yearAndMonth])

  const handleYearChange = (year) => {
    setYearAndMonth({
      ...yearAndMonth,
      year: year
    })
  }

  const handleMonthChange = (month) => {
    setYearAndMonth({
      ...yearAndMonth,
      month: month - 1
    })
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingWrapper}>
        <Text style={styles.headingText}>Calendar</Text>
      </View>
      <View style={styles.optionsContainer}>
        <SelectDropdown 
          data={generateYears()}
          onSelect={(selectedItem) => handleYearChange(selectedItem)}
        />
        <SelectDropdown 
          data={months}
          onSelect={(selectedItem) => handleMonthChange(selectedItem)}
        />
      </View>
      <View style={styles.calenderWrapper}>
        <FlatList 
          data={weeksOfMonth}
          renderItem={eachWeek => <FlatList 
            data={eachWeek.item}
            renderItem={eachDay => <Text 
              style={styles.eachDay}
              onPress={() => navigation.navigate('tasksOfDay', {
                date: eachDay.item,
                yearAndMonth
              })}
              >
                {eachDay.item}
              </Text>}
            style={styles.mondays}
            numColumns={7}
          />}
        />        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer : {
    margin : 10
  },
  headingWrapper : {
    borderBottomWidth : 1,
    borderBottomColor : 'black',
    padding : 10
  },
  headingText : {
    textAlign : 'center',
    fontSize : 25
  },
  optionsContainer : {
    borderBottomColor : 'black',
    height : 60,
    borderBottomWidth : 1,
    flexDirection : 'row'
  },
  calenderWrapper : {
    marginLeft : 20,
    marginTop: 15
  },
  mondays : {
    margin : 5,
  },
  eachDay : {
    backgroundColor : 'orange',
    marginLeft : 5,
    width : 50,
    height : 50
  }
})

export default Scheduler
