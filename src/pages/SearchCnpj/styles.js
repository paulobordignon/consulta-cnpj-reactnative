import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    header: {
        padding: 40,
        backgroundColor: '#103A75',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topBarText: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 20,
        color: '#fafafa',
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#FFF',
        fontSize: 18,
        lineHeight: 25,
        maxWidth: 260,
        marginVertical: 20,
    },
    barCode: {
        marginTop: 10,
        padding: 150,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    lastContainer: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 30,
    },
    submitButton: {
        backgroundColor: '#103A75',
        width: '90%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 7,
    },
    submitButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 17,
        color: '#fafafa',
    },
    text: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 17,
        color: '#444444',
    },
    textTitle: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 20,
        color: '#444444',
    },
})

export default styles;