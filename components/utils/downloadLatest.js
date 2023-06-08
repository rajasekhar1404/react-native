import { Button, Linking, StyleSheet, View } from "react-native"
import { GITHUB_DOWNLOAD_LATEST } from "../apis/taskApis"

const DownloadLatest = () => {
    return (
        <View style={styles.updateButton}>
            <Button onPress={() => Linking.openURL(GITHUB_DOWNLOAD_LATEST)} title="Download latest version"/>
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