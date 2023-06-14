import { View, Text, StyleSheet, FlatList } from "react-native"
import { setUpDates, generateYears, months } from "../utils/setUpDates"
import SelectDropdown from "react-native-select-dropdown"
import { useEffect, useState } from "react"
import Logout from "../authentication/logout"
import DownloadLatest from "../utils/downloadLatest"

const Scheduler = ({ navigation }) => {

  const [weeksOfMonth, setWeeksOfMonth] = useState([])
  const [yearAndMonth, setYearAndMonth] = useState({
    year : new Date().getFullYear(),
    month: new Date().getMonth()
  })

  useEffect(() => {
      setWeeksOfMonth(setUpDates(yearAndMonth.year, yearAndMonth.month))
      navigation.setOptions({
        headerRight: () => (
          <Logout />
        )
      })
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
          search={true}
          searchPlaceHolder="Enter year"
          defaultButtonText={yearAndMonth.year}
          data={generateYears()}
          onSelect={(selectedItem) => handleYearChange(selectedItem)}
        />
        <SelectDropdown 
          defaultButtonText={yearAndMonth.month+1}
          search={true}
          searchPlaceHolder="Enter month"
          data={months}
          onSelect={(selectedItem) => handleMonthChange(selectedItem)}
        />
      </View>
      <View style={styles.calenderWrapper}>
        <FlatList 
          data={weeksOfMonth}
          renderItem={eachWeek => <FlatList 
            data={eachWeek.item}
            renderItem={eachDay => new Date(yearAndMonth.year, yearAndMonth.month, eachDay.item).getFullYear() +"-"+ new Date(yearAndMonth.year, yearAndMonth.month, eachDay.item).getMonth() +"-"+ new Date(yearAndMonth.year, yearAndMonth.month, eachDay.item).getDate() === new Date().getFullYear() +"-"+ new Date().getMonth() + "-"+new Date().getDate() ? <Text 
              style={styles.currentDay}
              onPress={() => navigation.navigate('tasksOfDay', {
                date: eachDay.item,
                yearAndMonth
              })}
              >
                {eachDay.item}
              </Text> : <Text 
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
      <DownloadLatest />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer : {
    marginTop : "2%"
  },
  headingWrapper : {
    borderBottomWidth : 1,
    borderBottomColor : 'black',
    padding : "3%",
  },
  headingText : {
    textAlign : 'center',
    fontSize : 25,
    fontWeight: 'bold'
  },
  optionsContainer : {
    borderBottomColor : 'black',
    height : 60,
    borderBottomWidth : 1,
    flexDirection : 'row'
  },
  calenderWrapper: {
    width: "90%",
    marginLeft: 20,
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
  },
  mondays : {
    margin : 5,
  },
  eachDay : {
    backgroundColor : '#5D6D7E',
    marginLeft : 5,
    width : "13%",
    aspectRatio: 1,
    height : 50,
    borderRadius: 6,
    borderWidth: 1,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20
  },
  currentDay : {
    backgroundColor : '#E74C3C',
    marginLeft : 5,
    width : "13%",
    aspectRatio: 1,
    height : 50,
    borderRadius: 6,
    borderWidth: 1,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20
  }
})

export default Scheduler
