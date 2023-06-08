import { Button, Linking, StyleSheet, View } from "react-native"
import { GITHUB_APPLICATION_VERSION, GITHUB_DOWNLOAD_LATEST } from "../apis/taskApis"
import { useEffect, useState } from "react"
import base64 from 'base-64'
import PackageJson from '../../package.json'

const DownloadLatest = () => {

    const [isLatest, setLatest] = useState(true)

    useEffect(() => {
        checkLatestVersion()
    }, [])

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

    return (
        <View style={styles.updateButton}>
            {!isLatest && <Button onPress={() => Linking.openURL(GITHUB_DOWNLOAD_LATEST)} title="Download latest version"/>}
        </View>
    )
}

const styles = StyleSheet.create({
    updateButton: {
        display: 'flex',
        alignItems: 'center',
        top: 200
      }
})

export default DownloadLatest