import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
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
})

export default styles;