import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
        top: "30%"
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: "5%",
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    formContainer: {
        width: "75%",
        marginHorizontal: "13%",
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#52006A',
        borderWidth: 1,
        borderRadius: 10,
    },
    inputContainer: {
        borderColor: '#aaa',
        borderWidth: 1,
        height: "15%",
        width: "100%",
        paddingLeft: 10,
        borderRadius: 7,
        marginBottom: 10
    },
    forgotInputContainer: {
        borderColor: '#aaa',
        borderWidth: 1,
        height: "25%",
        width: "100%",
        paddingLeft: 10,
        borderRadius: 7,
        marginBottom: 10
    },
    registerInputContainer: {
        borderColor: '#aaa',
        borderWidth: 1,
        height: "12%",
        width: "100%",
        paddingLeft: 10,
        borderRadius: 7,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: "auto",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        gap: 20
    },
    loginToRegister: {
        marginTop: 10,
        textAlign: 'center'
    },
    regInLogin: {
        color: 'blue',
        fontSize: 17,
        textDecorationLine: 'underline'
    }
})