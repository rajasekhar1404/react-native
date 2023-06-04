import { View, Text, StyleSheet, FlatList, Button, Linking } from "react-native"
import { setUpDates, generateYears, months } from "../utils/setUpDates"
import SelectDropdown from "react-native-select-dropdown"
import { useEffect, useState } from "react"
import Logout from "../authentication/logout"
import PackageJson from '../../package.json'
import base64 from 'base-64'
import { GITHUB_APPLICATION_VERSION, GITHUB_DOWNLOAD_LATEST } from "../apis/taskApis"

const Scheduler = ({ navigation }) => {

  const [weeksOfMonth, setWeeksOfMonth] = useState([])
  const [yearAndMonth, setYearAndMonth] = useState({
    year : new Date().getFullYear(),
    month: new Date().getMonth()
  })
  const [isLatest, setLatest] = useState(true)

  useEffect(() => {
      checkLatestVersion()
      setWeeksOfMonth(setUpDates(yearAndMonth.year, yearAndMonth.month))
      navigation.setOptions({
        headerRight: () => (
          <Logout />
        )
      })
    }, [yearAndMonth])
    
  const checkLatestVersion = async () => {
    const response = await fetch(GITHUB_APPLICATION_VERSION)
    const data = await response.json()
    const latestVersion = JSON.parse(base64.decode(data.content)).version
    if(latestVersion === PackageJson.version) {
      setLatest(true)
    } else {
      setLatest(false)
    }
  }

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
      <View style={styles.updateButton}>
        { !isLatest && <Button onPress={() => Linking.openURL(GITHUB_DOWNLOAD_LATEST)} title="Download latest version"/> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer : {
    margin : 10
  },
  updateButton: {
    // position: 'absolute',
    // bottom: -240,
    // justifyContent: 'center'
    display: 'flex',
    alignItems: 'center',
    top: 200
  },
  headingWrapper : {
    borderBottomWidth : 1,
    borderBottomColor : 'black',
    padding : 10,
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
  calenderWrapper : {
    marginLeft : 20,
    marginTop: 15
  },
  mondays : {
    margin : 5,
  },
  eachDay : {
    backgroundColor : '#5D6D7E',
    marginLeft : 5,
    width : 50,
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
    width : 50,
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
